import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validPlaylist } from "../test/data/validPlaylist";
import { validUser } from "../test/data/validUser";

describe("Integration: Playlists Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getPlaylist can return information", async () => {
        const valid = validPlaylist();
        const result = await sut.playlists.getPlaylist(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/playlists/${valid.id}`);
        expect(result.tracks.items.length).toBeGreaterThan(0);
    });

    it("getPlaylist can return information with additional_types", async () => {
        const valid = validPlaylist();
        const result = await sut.playlists.getPlaylist(valid.id, undefined, undefined, ['episode']);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/playlists/${valid.id}?additional_types=episode`);
        expect(result.tracks.items.length).toBeGreaterThan(0);
    });

    it("getPlaylistItems can return information", async () => {
        const valid = validPlaylist();
        const result = await sut.playlists.getPlaylistItems(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/playlists/${valid.id}/tracks`);
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("getPlaylistItems can return information with additional_types", async () => {
        const valid = validPlaylist();
        const result = await sut.playlists.getPlaylistItems(valid.id, undefined, undefined, 1, 0, ['episode']);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/playlists/${valid.id}/tracks?additional_types=episode`);
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("getUsersPlaylists can return information", async () => {
        const valid = validUser();
        const result = await sut.playlists.getUsersPlaylists(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/users/${valid.id}/playlists`);
        expect(result.items.length).toBeGreaterThan(0);
    });
    
    it("getPlaylistCoverImage returns image info", async () => {
        const playlistId = "37i9dQZF1DWXIcbzpLauPS";
        const result = await sut.playlists.getPlaylistCoverImage(playlistId);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/playlists/${playlistId}/images`);
        expect(result[0].url.length).toBeGreaterThan(0);
    });
});
