import { beforeEach, describe, expect, it } from "vitest";
import { SpotifyApi } from "./SpotifyApi";
import { buildUnitTestSdkInstance } from "./test/SpotifyApiBuilder";
import { FakeAuthStrategy } from "./test/FakeAuthStrategy";
import { FetchApiMock } from "./test/FetchApiMock";
import { validAlbumResult } from "./test/data/validAlbumResult";
import AuthorizationCodeWithPKCEStrategy from "./auth/AuthorizationCodeWithPKCEStrategy";
import ClientCredentialsStrategy from "./auth/ClientCredentialsStrategy";
import ImplicitGrantStrategy from "./auth/ImplicitGrantStrategy";
import ProvidedAccessTokenStrategy from "./auth/ProvidedAccessTokenStrategy";
import { AccessToken, SdkOptions } from "./types";
import InMemoryCachingStrategy from "./caching/InMemoryCachingStrategy";

describe("SpotifyAPI Instance", () => {
    let sut: SpotifyApi;
    let fetchMock: FetchApiMock;
    beforeEach(() => {
        [sut, fetchMock] = buildUnitTestSdkInstance();
    });

    describe("uses provided authenticate strategy", () => {
        it("makes API requests with API token returned form auth strategy", async () => {
            fetchMock.queueResponseBody(200, validAlbumResult());

            await sut.albums.get("album-id-here");

            const [headers, bodyString] = fetchMock.issuedRequestHeadersAndBody(0);
            expect((headers as any).Authorization).toBe(`Bearer ${FakeAuthStrategy.FAKE_AUTH_TOKEN}`)
        });
    });

    describe("has default handling or error codes", () => {
        it("401 errors throw bad or expired token Error", async () => {
            fetchMock.queueResponseBody(401, {});

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("Bad or expired token");
        });

        it("403 errors throw oAuth Error", async () => {
            fetchMock.queueResponseBody(403, {});

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("Bad OAuth request");
        });

        it("429 errors throw rate limit Error", async () => {
            fetchMock.queueResponseBody(429, {});

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("The app has exceeded its rate limits.");
        });

        it("204 returns null for no-content responses", async () => {
            fetchMock.queueResponseBody(204, null);

            const result = await sut.albums.get("album-id-here");

            expect(result).toBeNull();
        });

        it("other Non-200 other response codes throws unrecognised response code error", async () => {
            fetchMock.queueResponseBody(123, null);

            await expect(async () => {
                await sut.albums.get("album-id-here");
            }).rejects.toThrowError("Unrecognised response code: 123");
        });

        it("can create an instance with the authorization code strategy configured", async () => {
            const sut = SpotifyApi.withUserAuthorization("client-id", "https://localhost:3000", ["scope1", "scope2"]);
            expect(sut["authenticationStrategy"].constructor.name).toBe(AuthorizationCodeWithPKCEStrategy.name);
        });

        it("can create an instance with the client credentials strategy configured", async () => {
            const sut = SpotifyApi.withClientCredentials("client-id", "secret", ["scope1", "scope2"]);
            expect(sut["authenticationStrategy"].constructor.name).toBe(ClientCredentialsStrategy.name);
        });

        it("can create an instance with the implicit grant strategy configured", async () => {
            const sut = SpotifyApi.withImplicitGrant("client-id", "secret", ["scope1", "scope2"]);
            expect(sut["authenticationStrategy"].constructor.name).toBe(ImplicitGrantStrategy.name);
        });

        it("can create an instance with the provided access token strategy configured", async () => {
            const sut = SpotifyApi.withAccessToken("client-id", {} as AccessToken);
            expect(sut["authenticationStrategy"].constructor.name).toBe(ProvidedAccessTokenStrategy.name);
        });

        it("when access token provided, it is accurately retrieved taking precedence over any existing cached token.", async () => {
            const config: SdkOptions = { cachingStrategy: new InMemoryCachingStrategy() };
            config.cachingStrategy?.setCacheItem("spotify-sdk:ProvidedAccessTokenStrategy:token", { access_token: "some-old-token" });

            const sut = SpotifyApi.withAccessToken("client-id", { access_token: "some-new-token" } as AccessToken, config);
            const token = await sut.getAccessToken();

            expect(token?.access_token).toBe("some-new-token");
        });

    });

    describe("can authenticate and log out", () => {
        it("null access token initially", async () => {
            const accessToken = await sut.getAccessToken();
            expect(accessToken).toBe(null);
        });

        it("authenticates successfully", async () => {
            const response = await sut.authenticate();
            expect(response.accessToken.access_token).toBe(FakeAuthStrategy.FAKE_AUTH_TOKEN);
            expect(response.authenticated).toBe(true);

            const accessToken2 = await sut.getAccessToken();
            expect(accessToken2?.access_token).toBe(FakeAuthStrategy.FAKE_AUTH_TOKEN);
        });

        it("null access token after logging out", async () => {
            sut.logOut();

            const accessToken = await sut.getAccessToken();
            expect(accessToken).toBe(null);
        });
    });
});
