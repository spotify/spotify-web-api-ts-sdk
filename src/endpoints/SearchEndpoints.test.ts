import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";

describe("Integration: Search Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getTrack can return information", async () => {
        const q = "Katatonia"
        const result = await sut.search(q, ["artist"]);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/search?q=${q}&type=artist`);
        expect(result.artists.items[0].name).toBe("Katatonia");
    });
});