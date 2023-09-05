import type { SdkConfiguration, ICachingStrategy, AccessToken } from "../types.js";
import AccessTokenHelpers from "./AccessTokenHelpers.js";
import IAuthStrategy from "./IAuthStrategy.js";

export default class ClientCredentialsStrategy implements IAuthStrategy {

    private static readonly cacheKey = "spotify-sdk:ClientCredentialsStrategy:token";
    private configuration: SdkConfiguration | null = null;
    private get cache(): ICachingStrategy { return this.configuration!.cachingStrategy; }

    constructor(
        private clientId: string,
        private clientSecret: string,
        private scopes: string[] = []
    ) {
    }

    public setConfiguration(configuration: SdkConfiguration): void {
        this.configuration = configuration;
    }

    public async getOrCreateAccessToken(): Promise<AccessToken> {
        const token = await this.cache.getOrCreate<AccessToken>(
            ClientCredentialsStrategy.cacheKey,
            async () => {
                const token = await this.getTokenFromApi();
                return AccessTokenHelpers.toCachable(token);
            },
            async (_) => {
                const refreshed = await this.getTokenFromApi();
                return AccessTokenHelpers.toCachable(refreshed);
            }
        );

        return token;
    }

    public async getAccessToken(): Promise<AccessToken | null> {
        const token = await this.cache.get<AccessToken>(ClientCredentialsStrategy.cacheKey);
        return token;
    }

    public removeAccessToken(): void {
        this.cache.remove(ClientCredentialsStrategy.cacheKey);
    }

    private async getTokenFromApi(): Promise<AccessToken> {
        const options = {
            grant_type: 'client_credentials',
            scope: this.scopes.join(' ')
        } as any;

        const bodyAsString = Object.keys(options).map(key => key + '=' + options[key]).join('&');
        const hasBuffer = typeof Buffer !== 'undefined';
        const credentials = `${this.clientId}:${this.clientSecret}`;

        const basicAuth = hasBuffer
            ? Buffer.from(credentials).toString('base64')
            : btoa(credentials);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${basicAuth}`
            },
            body: bodyAsString
        });

        if (result.status !== 200) {
            throw new Error("Failed to get access token.");
        }

        const json = await result.json();
        return json;
    }
}
