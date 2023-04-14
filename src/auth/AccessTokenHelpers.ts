export default class AccessTokenHelpers {
    public static async refreshCachedAccessToken(clientId: string, item: AccessToken) {
        const updated = await AccessTokenHelpers.refreshToken(clientId, item.refresh_token);
        return AccessTokenHelpers.toCachable(updated);
    }

    public static toCachable(item: AccessToken): ICachable & AccessToken {
        return { ...item, expires: Date.now() + (item.expires_in * 1000) };
    }

    private static async refreshToken(clientId: string, refreshToken: string): Promise<AccessToken> {
        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("grant_type", "refresh_token");
        params.append("refresh_token", refreshToken);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const text = await result.text();

        if (!result.ok) {
            throw new Error(`Failed to refresh token: ${result.statusText}, ${text}`);
        }

        const json: AccessToken = JSON.parse(text);
        return json;
    }

    public static generateCodeVerifier(length: number) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    public static async generateCodeChallenge(codeVerifier: string) {
        const data = new TextEncoder().encode(codeVerifier);

        if (!window.crypto || !window.crypto.subtle) {
            try {
                const { Crypto } = require("@peculiar/webcrypto");
                const crypto = new Crypto();
                window.crypto = crypto;
            } catch(e) {
                throw e;
            }
        }

        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }
}
