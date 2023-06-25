import { AccessToken, ICachingStrategy, SdkConfiguration } from "../types.js";
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

    private static readonly cacheKey = "spotify-sdk:ProvidedAccessTokenStrategy:token";
    private configuration: SdkConfiguration | null = null;
    protected get cache(): ICachingStrategy { return this.configuration!.cachingStrategy; }

    constructor(
        protected clientId: string,
        protected accessToken: AccessToken
    ) {
    }

    public setConfiguration(configuration: SdkConfiguration): void {
        this.configuration = configuration;
    }

    public async getAccessToken(): Promise<AccessToken> {

        this.accessToken = await this.cache.getOrCreate<AccessToken>(ProvidedAccessTokenStrategy.cacheKey, async () => {
            const cachableToken = AccessTokenHelpers.toCachable(this.accessToken);
            return Promise.resolve(cachableToken);
        }, async (expiring) => {
            return AccessTokenHelpers.refreshCachedAccessToken(this.clientId, expiring);
        });

        return this.accessToken;
    }

    public async needsAuthentication(): Promise<boolean> {
        const token = await this.cache.get<AccessToken>(ProvidedAccessTokenStrategy.cacheKey);
        return token === null;
    }
}
