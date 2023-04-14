import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validMarkets } from "../test/data/validMarkets";

describe("Integration: Episodes Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getAvailableMarkets can return information", async () => {
        const valid = validMarkets();
        const result = await sut.markets.getAvailableMarkets();

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/markets`);
        expect(result).toStrictEqual(valid);
    });
});