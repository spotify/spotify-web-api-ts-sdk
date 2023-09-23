import { AccessToken, SdkConfiguration } from "../types.js";
import AccessTokenHelpers from "./AccessTokenHelpers.js";
import IAuthStrategy from "./IAuthStrategy.js";

/**
 * This strategy is used when you already have an access token and want to use it.
 * The authentication strategy will automatically renew the token when it expires.
 * Designed to allow a browser-based-app to post the access token to the server and use it from there.
 * @constructor
 * @param {string} clientId - Spotify application client id.
 * @param {string} accessToken - The access token returned from a client side Authorization Code with PKCE flow.
 */
export default class ProvidedAccessTokenStrategy implements IAuthStrategy {
    private refreshTokenAction: (clientId: string, token: AccessToken) => Promise<AccessToken>;

    constructor(
        protected clientId: string,
        protected accessToken: AccessToken,
        refreshTokenAction?: (clientId: string, token: AccessToken) => Promise<AccessToken>
    ) {
        this.refreshTokenAction = refreshTokenAction || AccessTokenHelpers.refreshCachedAccessToken;

        // If the raw token from the jwt response is provided here
        // Calculate an absolute `expiry` value.
        // Caveat: If this token isn't fresh, this value will be off.
        // It's the responsibility of the calling code to either set a valid
        // expires property, or ensure expires_in accounts for any lag between
        // issuing and passing here.

        if (!this.accessToken.expires) {
            this.accessToken.expires = AccessTokenHelpers.calculateExpiry(this.accessToken);
        }
    }

    public setConfiguration(_: SdkConfiguration): void {
    }

    public async getOrCreateAccessToken(): Promise<AccessToken> {
        if (this.accessToken.expires && this.accessToken.expires <= Date.now()) {
            const refreshed = await this.refreshTokenAction(this.clientId, this.accessToken);
            this.accessToken = refreshed;
        }

        return this.accessToken;
    }

    public async getAccessToken(): Promise<AccessToken | null> {
        return this.accessToken;
    }

    public removeAccessToken(): void {
        this.accessToken = {
            access_token: "",
            token_type: "",
            expires_in: 0,
            refresh_token: "",
            expires: 0
        };
    }
}
