import type { SdkConfiguration, AccessToken, ICachingStrategy } from "../types";
import AccessTokenHelpers from "./AccessTokenHelpers";
import IAuthStrategy from "./IAuthStrategy";

export default class ImplicitGrantStrategy implements IAuthStrategy {
    private configuration: SdkConfiguration | null = null;
    private static emptyAccessToken: AccessToken = { access_token: "", token_type: "", expires_in: 0, refresh_token: "" };
    private get cache(): ICachingStrategy { return this.configuration!.cachingStrategy; }

    constructor(
        private clientId: string,
        private redirectUri: string,
        private scopes: string[]
    ) {
    }

    public setConfiguration(configuration: SdkConfiguration): void {
        this.configuration = configuration;
    }

    public async getAccessToken(): Promise<string | null> {
        const cacheKey = "spotify-sdk:ImplicitGrantStrategy:token";

        const token = await this.cache.getOrCreate<AccessToken>(cacheKey, async () => {
            const token = await this.redirectOrVerifyToken();
            return AccessTokenHelpers.toCachable(token);
        }, async (expiring) => {
            return AccessTokenHelpers.refreshCachedAccessToken(this.clientId, expiring);
        });

        return token?.access_token;
    }

    private async redirectOrVerifyToken(): Promise<AccessToken> {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");

        if (accessToken) {
            return Promise.resolve({
                access_token: accessToken,
                token_type: hashParams.get("token_type") ?? "",
                expires_in: parseInt(hashParams.get("expires_in") ?? "0"),
                refresh_token: hashParams.get("refresh_token") ?? ""
            });
        }

        const scopes = this.scopes ?? [];
        var scope = scopes.join(' ');

        const params = new URLSearchParams();
        params.append("client_id", this.clientId);
        params.append("response_type", "token");
        params.append("redirect_uri", this.redirectUri);
        params.append("scope", scope);

        const authUrl = 'https://accounts.spotify.com/authorize?' + params.toString();

        this.configuration!.redirectionStrategy.redirect(authUrl);
        return ImplicitGrantStrategy.emptyAccessToken;
    }
}
