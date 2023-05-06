import { beforeAll, describe, expect, it } from "vitest";
import { buildIntegrationTestUserSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validArtist } from "../test/data/validArtist";
import { validAlbumResult } from "../test/data/validAlbumResult";
import fs from "fs";

describe("Integration: Users Endpoints (logged in user)", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeAll(() => {
        [sut, fetchSpy] = buildIntegrationTestUserSdkInstance();
    });

    it("getCurrentUsersProfile returns a real user", async () => {
        const result = await sut.currentUser.profile();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me");
        expect(result.id.length).toBeGreaterThan(0);
    });

    it("getUsersTopItems returns items", async () => {
        const result = await sut.currentUser.topItems("artists");

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/top/artists");
        expect(result.limit).toBeGreaterThan(0);
    });

    it("getFollowedArtists returns artists", async () => {
        const result = await sut.currentUser.followedArtists();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/following?type=artist");
        expect(result.artists.items.length).toBeGreaterThan(0);
    });

    it("un/followArtistsOrUsersforCurrentUser can add and remove follows for artists", async () => {
        await sut.currentUser.followArtistsOrUsers(["0qJpY7K8p7g6sacvaGNt6i"], "artist");
        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/following?type=artist");

        const result = await sut.currentUser.followedArtists();
        expect(result.artists.items.find((a) => a.id === '0qJpY7K8p7g6sacvaGNt6i')).toBeTruthy();

        await sut.currentUser.unfollowArtistsOrUsers(["0qJpY7K8p7g6sacvaGNt6i"], "artist");
        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/following?type=artist");

        const result2 = await sut.currentUser.followedArtists();
        expect(result2.artists.items.find((a) => a.id === '0qJpY7K8p7g6sacvaGNt6i')).toBeFalsy();
    });

    it("checkUserFollowsArtistsOrUsers correctly identifies followed artist", async () => {
        const valid = validArtist();
        const followed = await sut.currentUser.followedArtists();
        const knownFollowedArtist = followed.artists.items.find((a) => a.id === valid.id)!;

        const result = await sut.currentUser.followsArtistsOrUsers([knownFollowedArtist.id], "artist");

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/following/contains?ids=${valid.id}&type=artist`);
        expect(result[0]).toBeTruthy();
    });

    it("getUsersSavedAlbums returns items", async () => {
        const result = await sut.currentUser.albums.savedAlbums();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/albums");
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("checkCurrentUsersSavedAlbums returns true for saved known album", async () => {
        const valid = validAlbumResult();
        const result = await sut.currentUser.albums.hasSavedAlbums([valid.id]);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/albums/contains?ids=${valid.id}`);
        expect(result[0]).toBe(true);
    });

    it("create and modify playlists for a user works", async () => {
        const valid = validAlbumResult();
        const validTrack = valid.tracks.items[0];

        const me = await sut.currentUser.profile();

        const result = await sut.playlists.createPlaylist(me.id, {
            name: "test playlist name!",
            description: "test playlist description!"
        });

        
        const file = fs.readFileSync("./src/test/valid-image.jpg", { encoding: "base64" });

        await sut.playlists.addCustomPlaylistCoverImage(result.id, file);
        await sut.playlists.addItemsToPlaylist(result.id, [validTrack.uri, validTrack.uri, validTrack.uri, "spotify:track:0ZEigpVOtVunIcimL7dJuh"]);

        const snapshotUpdated = await sut.playlists.movePlaylistItems(result.id, 3, 1, 0); // Move last track to start

        let playlist = await sut.playlists.getPlaylist(result.id);
        expect(playlist.tracks.items.length).toBe(4);
        expect(playlist.tracks.items[1].track.id).toBe(validTrack.id);

        await sut.playlists.removeItemsFromPlaylist(result.id, {
            snapshot_id: snapshotUpdated.snapshot_id,
            tracks: [{ uri: validTrack.uri }]
        });

        const playlistWithoutTracks = await sut.playlists.getPlaylist(result.id);
        expect(playlistWithoutTracks.tracks.items.length).toBe(1);

        await sut.playlists.changePlaylistDetails(result.id, {
            name: "test playlist name 2",
            description: "test playlist description 2"
        });

        const playlist2 = await sut.playlists.getPlaylist(result.id);
        expect(playlist2.name).toBe("test playlist name 2");
    });

    it("can set valid image form file (node.js)", async () => {
        const me = await sut.currentUser.profile();

        const result = await sut.playlists.createPlaylist(me.id, {
            name: "test playlist name!",
            description: "test playlist description!"
        });

        const file = fs.readFileSync("./src/test/valid-image.jpg", { encoding: "base64" });

        await sut.playlists.addCustomPlaylistCoverImage(result.id, file);
    });

    it("getCurrentUsersPlaylists returns playlists", async () => {
        const result = await sut.currentUser.playlists.playlists();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/playlists");
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("can save and remove album for user", async () => {
        const album = "6yWMN087PgSimbcVmHLEwG"; // Aenema by Tool

        await sut.currentUser.albums.saveAlbums([album]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/albums`);

        const result = await sut.currentUser.albums.savedAlbums();
        expect(result.items.find((a) => a.album.id === album)).toBeTruthy();

        await sut.currentUser.albums.removeSavedAlbums([album]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/albums`);

        const result2 = await sut.currentUser.albums.savedAlbums();
        expect(result2.items.find((a) => a.album.id === album)).toBeFalsy();
    });

    it("getFeaturedPlaylists returns playlists", async () => {
        const result = await sut.browse.getFeaturedPlaylists();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/browse/featured-playlists");
        expect(result.playlists.items.length).toBeGreaterThan(0);
    });

    it("getCategorysPlaylists returns playlists", async () => {
        const category_id = "0JQ5DAqbMKFEC4WFtoNRpw";
        const result = await sut.browse.getPlaylistsForCategory(category_id);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/browse/categories/${category_id}/playlists`);
        expect(result.playlists.items.length).toBeGreaterThan(0);
    });

    it("getCurrentUsersSavedAudiobooks returns playlists", async () => {
        const result = await sut.currentUser.audiobooks.savedAudiobooks();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/audiobooks");
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("checkCurrentUsersSavedAudiobooks returns true for saved book", async () => {
        const result = await sut.currentUser.audiobooks.hasSavedAudiobooks(["19Xw49IjNbOCCoebfy3qA9"]);

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/audiobooks/contains?ids=19Xw49IjNbOCCoebfy3qA9");
        expect(result[0]).toBeTruthy();
    });

    it("can save and remove audiobook for user", async () => {
        await sut.currentUser.audiobooks.saveAudiobooks(["2lwSCFrbU1Y7tH3BYS0aeM"]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/audiobooks`);

        const result2 = await sut.currentUser.audiobooks.savedAudiobooks();
        expect(result2.items.find((a) => a.id === "2lwSCFrbU1Y7tH3BYS0aeM")).toBeTruthy();

        await sut.currentUser.audiobooks.removeSavedAudiobooks(["2lwSCFrbU1Y7tH3BYS0aeM"]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/audiobooks`);

        const result3 = await sut.currentUser.audiobooks.savedAudiobooks();
        expect(result3.items.find((a) => a.id === "2lwSCFrbU1Y7tH3BYS0aeM")).toBeFalsy();
    });


}, { timeout: 20000 });
