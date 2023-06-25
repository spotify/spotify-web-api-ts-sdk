import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validEpisode } from "../test/data/validEpisode";

describe("Integration: Episodes Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getEpisode can return information", async () => {
        const valid = validEpisode();
        const result = await sut.episodes.get(valid.id, "GB");

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/episodes/${valid.id}?market=GB`);

        // replace inconsistent properties
        if (result.show) {
            result.show.total_episodes = valid.show.total_episodes;
        }

        expect(result).toStrictEqual(valid);
    });

    it("getEpisodes can return multiple items at once", async () => {
        const valid = validEpisode();
        const result = await sut.episodes.get([valid.id, valid.id], "GB");

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/episodes?ids=${valid.id}%2C${valid.id}&market=GB`);
        expect(result[0].id).toBe(valid.id);
        expect(result[1].id).toBe(valid.id);
    });
});
