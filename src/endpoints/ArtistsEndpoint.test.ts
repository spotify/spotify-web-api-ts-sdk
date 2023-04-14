import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { validArtist } from "../test/data/validArtist";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";

describe("Integration: Artists Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getArtist can return information", async () => {
        const valid = validArtist();
        const result = await sut.artists.get(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/artists/${valid.id}`);
        expect(result.name).toBe(valid.name);
    });

    it("getArtists can return multiple items", async () => {
        const valid = validArtist();
        const result = await sut.artists.get([valid.id, valid.id]);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/artists?ids=${valid.id}%2C${valid.id}`);
        expect(result.length).toBe(2);
        expect(result[0].name).toBe(valid.name);
        expect(result[1].name).toBe(valid.name);
    });

    it("getArtistAlbums can return information", async () => {
        const valid = validArtist();
        const result = await sut.artists.albums(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/artists/${valid.id}/albums`);
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("getArtistTopTracks can return information", async () => {
        const valid = validArtist();
        const result = await sut.artists.topTracks(valid.id, "GB");

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/artists/${valid.id}/top-tracks?market=GB`);
        expect(result.tracks.length).toBeGreaterThan(0);
    });

    it("getArtistRelatedArtists can return information", async () => {
        const valid = validArtist();
        const result = await sut.artists.relatedArtists(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/artists/${valid.id}/related-artists`);
        expect(result.artists.length).toBeGreaterThan(0);
    });

});
