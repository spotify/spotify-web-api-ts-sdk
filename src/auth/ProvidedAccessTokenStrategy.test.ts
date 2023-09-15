import { describe, expect, it } from "vitest";
import ProvidedAccessTokenStrategy from "./ProvidedAccessTokenStrategy";

describe('ProvidedAccessTokenStrategy', () => {

    it("getAccesToken, no expires property provided, generates one", async () => {
        const sut = new ProvidedAccessTokenStrategy("some-client-id", tokenWithoutExpiresProperty());
        const token = await sut.getAccessToken();

        expect(token!.expires).toBeDefined();
    });

    it("getAccesToken, no expires property provided, expires property is calculated using expires_in value", async () => {
        const now = Date.now();
        const providedToken = tokenWithoutExpiresProperty();

        const sut = new ProvidedAccessTokenStrategy("some-client-id", providedToken);
        const token = await sut.getAccessToken();

        expect(token!.expires).toBeGreaterThan(now + providedToken.expires_in);
    });

    it("getOrCreateAccessToken, expiry in the future, returns token stored in instance", async () => {
        const providedToken = validToken("original", 60 * 1000);

        const sut = new ProvidedAccessTokenStrategy("some-client-id", providedToken);
        const token = await sut.getOrCreateAccessToken();

        expect(token!.access_token).toBe("original");
    });

    it("getOrCreateAccessToken, expiry in the past, requests refreshed token", async () => {
        const refreshedTokenValue = "refreshed";
        const providedToken = expiredAccessToken();

        const sut = new ProvidedAccessTokenStrategy("some-client-id", providedToken, () => {
            return Promise.resolve(validToken(refreshedTokenValue));
        });

        const token = await sut.getOrCreateAccessToken();

        expect(token!.access_token).toBe(refreshedTokenValue);
    });
});

const validToken = (value: string, expiresIn: number = 1000) => ({
    access_token: value,
    token_type: "",
    expires_in: expiresIn,
    refresh_token: "",
    expires: Date.now() + expiresIn
});

const tokenWithoutExpiresProperty = (value: string = "") => ({
    access_token: value,
    token_type: "",
    expires_in: 1000,
    refresh_token: "",
});

const expiredAccessToken = () => ({
    access_token: "expired",
    token_type: "",
    expires_in: 0,
    refresh_token: "",
    expires: Date.now() - 1,
});