import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validCategory } from "../test/data/validCategory";

describe("Integration: Browse Categories Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getCategories can return information", async () => {
        const result = await sut.browse.getCategories();

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/browse/categories`);
        expect(result.categories.items.length).toBeGreaterThan(0);
    });

    it("getCategory can return information", async () => {
        const valid = validCategory();

        const result = await sut.browse.getCategory(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/browse/categories/${valid.id}`);
        expect(result).toStrictEqual(valid);
    });

    it("getCategorysPlaylists returns playlists", async () => {
        // Seems broken?

        const valid = validCategory();
        const result = await sut.browse.getPlaylistsForCategory(valid.id);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/browse/categories/${valid.id}/playlists`);
        expect(result.playlists.items.length).toBeGreaterThan(0);
    });

    it("getNewReleases returns some new releases", async () => {
        const result = await sut.browse.getNewReleases();
        expect(result.albums.items.length).toBeGreaterThan(0);
    });
});