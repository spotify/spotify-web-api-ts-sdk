import type { ICachable, SdkConfiguration, AccessToken, ICachingStrategy } from "../types.js";
import AccessTokenHelpers from "./AccessTokenHelpers.js";
import IAuthStrategy, { emptyAccessToken } from "./IAuthStrategy.js";

interface CachedVerifier extends ICachable {
    verifier: string;
    expiresOnAccess: boolean;
}

export default class AuthorizationCodeWithPKCEStrategy implements IAuthStrategy {

    private static readonly cacheKey = "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token";
    private configuration: SdkConfiguration | null = null;
    protected get cache(): ICachingStrategy { return this.configuration!.cachingStrategy; }

    constructor(
        protected clientId: string,
        protected redirectUri: string,
        protected scopes: string[]
    ) {
    }

    public setConfiguration(configuration: SdkConfiguration): void {
        this.configuration = configuration;
    }

    public async getOrCreateAccessToken(): Promise<AccessToken> {
        const token = await this.cache.getOrCreate<AccessToken>(
            AuthorizationCodeWithPKCEStrategy.cacheKey,
            async () => {
                const token = await this.redirectOrVerifyToken();
                return AccessTokenHelpers.toCachable(token);
            }, async (expiring) => {
                return AccessTokenHelpers.refreshCachedAccessToken(this.clientId, expiring);
            },
        );

        return token;
    }

    public async getAccessToken(): Promise<AccessToken | null> {
        const token = await this.cache.get<AccessToken>(AuthorizationCodeWithPKCEStrategy.cacheKey);
        return token;
    }

    public removeAccessToken(): void {
        this.cache.remove(AuthorizationCodeWithPKCEStrategy.cacheKey);
    }

    private async redirectOrVerifyToken(): Promise<AccessToken> {
        const hashParams = new URLSearchParams(window.location.search);
        const code = hashParams.get("code");

        if (code) {
            const token = await this.verifyAndExchangeCode(code);
            this.removeCodeFromUrl();
            return token;
        }

        this.redirectToSpotify();
        return emptyAccessToken; // Redirected away at this point, just make TypeScript happy :)         
    }

    private async redirectToSpotify() {
        const verifier = AccessTokenHelpers.generateCodeVerifier(128);
        const challenge = await AccessTokenHelpers.generateCodeChallenge(verifier);

        const singleUseVerifier: CachedVerifier = { verifier, expiresOnAccess: true };
        this.cache.setCacheItem("spotify-sdk:verifier", singleUseVerifier);

        const redirectTarget = await this.generateRedirectUrlForUser(this.scopes, challenge);
        await this.configuration!.redirectionStrategy.redirect(redirectTarget);
    }

    private async verifyAndExchangeCode(code: string) {
        const cachedItem = await this.cache.get<CachedVerifier>("spotify-sdk:verifier");
        const verifier = cachedItem?.verifier;

        if (!verifier) {
            throw new Error("No verifier found in cache - can't validate query string callback parameters.");
        }

        await this.configuration!.redirectionStrategy.onReturnFromRedirect();
        return await this.exchangeCodeForToken(code, verifier!);
    }

    private removeCodeFromUrl() {
        const url = new URL(window.location.href);
        url.searchParams.delete("code");

        const newUrl = url.search ? url.href : url.href.replace('?', '');
        window.history.replaceState({}, document.title, newUrl);
    }

    protected async generateRedirectUrlForUser(scopes: string[], challenge: string) {
        const scope = scopes.join(' ');

        const params = new URLSearchParams();
        params.append("client_id", this.clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", this.redirectUri);
        params.append("scope", scope);
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        return `https://accounts.spotify.com/authorize?${params.toString()}`;
    }

    protected async exchangeCodeForToken(code: string, verifier: string): Promise<AccessToken> {
        const params = new URLSearchParams();
        params.append("client_id", this.clientId);
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", this.redirectUri);
        params.append("code_verifier", verifier!);

        const result = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const text = await result.text();

        if (!result.ok) {
            throw new Error(`Failed to exchange code for token: ${result.statusText}, ${text}`);
        }

        const json: AccessToken = JSON.parse(text);
        return json;
    }

}

