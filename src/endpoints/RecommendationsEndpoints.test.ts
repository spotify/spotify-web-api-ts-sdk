import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validGenres } from "../test/data/validGenres";

describe("Integration: Episodes Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getGenres can return information", async () => {
        const valid = validGenres();
        const result = await sut.recommendations.genreSeeds();

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/recommendations/available-genre-seeds`);
        expect(result).toStrictEqual(valid);
    });

    it("get can return recommendations", async () => {
        const result = await sut.recommendations.get({
            seed_artists: ["0oSGxfWSnnOXhD2fKuz2Gy"],
            seed_genres: ["rock"],
            seed_tracks: ["0c6xIDDpzE81m2q797ordA"]
        });

        expect(result.tracks.length).toBeGreaterThan(0);
    })
});
