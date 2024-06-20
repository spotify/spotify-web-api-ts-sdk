import IAuthStrategy from "../auth/IAuthStrategy";
import InMemoryCachingStrategy from "../caching/InMemoryCachingStrategy";
import type { AccessToken, ICachingStrategy, SdkConfiguration } from "../types";

export class FakeAuthStrategy implements IAuthStrategy {

    public static readonly FAKE_AUTH_TOKEN = "fake-auth-token";
    private static readonly cacheKey = "spotify-sdk:FakeAuthStrategy:token";
    protected cache: ICachingStrategy;

    constructor(
        protected accessToken: string = FakeAuthStrategy.FAKE_AUTH_TOKEN,
        protected refreshToken: string = FakeAuthStrategy.FAKE_AUTH_TOKEN,
    ) {
        this.cache = new InMemoryCachingStrategy();
    }

    public setConfiguration(_: SdkConfiguration): void {
    }

    public async getOrCreateAccessToken(): Promise<AccessToken> {
        const token = await this.cache.getOrCreate<AccessToken>(
            FakeAuthStrategy.cacheKey,
            async () => {
                return {
                    access_token: this.accessToken,
                    expires: Date.now() + 3600 * 1000,
                    token_type: "Bearer",
                    refresh_token: this.refreshToken,
                    expires_in: 3600,
                } satisfies AccessToken;
            },
        );

        return token;
    }

    public async getAccessToken(): Promise<AccessToken | null> {
        const token = await this.cache.get<AccessToken>(FakeAuthStrategy.cacheKey);
        return token;
    }

    public removeAccessToken(): void {
        this.cache.remove(FakeAuthStrategy.cacheKey);
    }
}
