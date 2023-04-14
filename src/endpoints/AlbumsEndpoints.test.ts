import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { validAlbumTracksResult } from "../test/data/validAlbumTracksResult";
import { validAlbumResult } from "../test/data/validAlbumResult";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";

describe("Integration: Albums Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getAlbum can return information for valid album", async () => {
        const item = validAlbumResult();
        const result = await sut.albums.get(item.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/albums/${item.id}`);
        expect(result.name).toBe(item.name);
    });

    it("getAlbums can return multiple items at once", async () => {
        const item = validAlbumResult();
        const result = await sut.albums.get([item.id, item.id]);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/albums?ids=${item.id}%2C${item.id}`);
        expect(result.length).toBe(2);
        expect(result[0].id).toBe(item.id);
        expect(result[1].id).toBe(item.id);
    });

    it("getAlbumTracks returns correct tracks for valid album", async () => {
        const item = validAlbumResult();
        const result = await sut.albums.tracks(item.id);

        expect(result.items.length).toBe(validAlbumTracksResult().items.length);
    });
});
