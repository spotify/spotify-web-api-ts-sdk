import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validShow } from "../test/data/validShow";

describe("Integration: Shows Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getShow can return information", async () => {
        const valid = validShow();
        const result = await sut.shows.get(valid.id, "GB");

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/shows/${valid.id}?market=GB`);
        expect(result.id).toBe(valid.id);
    });

    it("getShows can return information", async () => {
        const valid = validShow();
        const result = await sut.shows.get([valid.id, valid.id], "GB");

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/shows?ids=${valid.id}%2C${valid.id}&market=GB`);
        expect(result[0].id).toBe(valid.id);
        expect(result[1].id).toBe(valid.id);
    });

    it("getShowEpisodes can return information", async () => {
        const valid = validShow();
        const result = await sut.shows.episodes(valid.id, "GB");

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/shows/${valid.id}/episodes?market=GB`);
        expect(result.items.length).toBeGreaterThan(0);
    });
});
