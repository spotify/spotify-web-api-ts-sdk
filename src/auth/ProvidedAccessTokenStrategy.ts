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
    constructor(
        protected clientId: string,
        protected accessToken: AccessToken
    ) {
    }

    public setConfiguration(configuration: SdkConfiguration): void {
    }

    public async getOrCreateAccessToken(): Promise<AccessToken> {
        if (this.accessToken.expires <= Date.now()) {
            const refreshed = await AccessTokenHelpers.refreshCachedAccessToken(this.clientId, this.accessToken);
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
