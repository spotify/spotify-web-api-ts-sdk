import fs from "fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildIntegrationTestUserSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validArtist } from "../test/data/validArtist";
import { validAlbumResult } from "../test/data/validAlbumResult";
import { validAudioBook } from "../test/data/validAudioBook";
import { validShow } from "../test/data/validShow";

describe("Integration: Users Endpoints (logged in user)", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    let artistId: string;
    let wasArtistFollowed: boolean;

    let albumId: string;
    let wasAlbumSaved: boolean;

    let audioBookId: string;
    let wasAudioBookSaved: boolean;

    let showId: string;
    let wasShowSaved: boolean;

    beforeAll(async () => {
        [sut, fetchSpy] = buildIntegrationTestUserSdkInstance();

        artistId = validArtist().id;
        wasArtistFollowed = (await sut.currentUser.followsArtistsOrUsers([artistId], "artist"))[0];
        if (!wasArtistFollowed) {
            await sut.currentUser.followArtistsOrUsers([artistId], "artist");
        }

        albumId = validAlbumResult().id;
        wasAlbumSaved = (await sut.currentUser.albums.hasSavedAlbums([albumId]))[0];
        if (!wasAlbumSaved) {
            await sut.currentUser.albums.saveAlbums([albumId]);
        }

        audioBookId = validAudioBook().id;
        wasAudioBookSaved = (await sut.currentUser.audiobooks.hasSavedAudiobooks([audioBookId]))[0];
        if (!wasAudioBookSaved) {
            await sut.currentUser.audiobooks.saveAudiobooks([audioBookId]);
        }

        showId = validShow().id;
        wasShowSaved = (await sut.currentUser.shows.hasSavedShow([showId]))[0];
        if (!wasShowSaved) {
            await sut.currentUser.shows.saveShows([showId]);
        }
    });

    afterAll(async () => {
        if (wasArtistFollowed) {
            await sut.currentUser.followArtistsOrUsers([artistId], "artist");
        } else {
            await sut.currentUser.unfollowArtistsOrUsers([artistId], "artist");
        }

        if (wasAlbumSaved) {
            await sut.currentUser.albums.saveAlbums([albumId]);
        } else {
            await sut.currentUser.albums.removeSavedAlbums([albumId]);
        }

        if (wasAudioBookSaved) {
            await sut.currentUser.audiobooks.saveAudiobooks([audioBookId]);
        } else {
            await sut.currentUser.audiobooks.removeSavedAudiobooks([audioBookId]);
        }

        if (wasShowSaved) {
            await sut.currentUser.shows.saveShows([showId]);
        } else {
            await sut.currentUser.shows.removeSavedShows([showId]);
        }
    });

    it("getCurrentUsersProfile returns a real user", async () => {
        const result = await sut.currentUser.profile();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me");
        expect(result.id.length).toBeGreaterThan(0);
    });

    it("getUsersTopItems returns items for tracks", async () => {
        const result = await sut.currentUser.topItems("tracks");

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/top/tracks");
        expect(result.limit).toBeGreaterThan(0);
    });

    it("getUsersTopItems returns items for artists", async () => {
        const result = await sut.currentUser.topItems("artists");

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/top/artists");
        expect(result.limit).toBeGreaterThan(0);
    });

    it("getUsersTopItems returns items for tracks and time_range", async () => {
        const result = await sut.currentUser.topItems("tracks", 'medium_term');

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term");
        expect(result.limit).toBeGreaterThan(0);
    });

    it("getUsersTopItems returns items for artists and time_range", async () => {
        const result = await sut.currentUser.topItems("artists", 'short_term');

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/top/artists?time_range=short_term");
        expect(result.limit).toBeGreaterThan(0);
    });

    it("getFollowedArtists returns artists", async () => {
        const result = await sut.currentUser.followedArtists();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/following?type=artist");
        expect(result.artists.items.length).toBeGreaterThan(0);
    });

    it("un/followArtistsOrUsersforCurrentUser can add and remove follows for artists", async () => {
        await sut.currentUser.followArtistsOrUsers([artistId], "artist");
        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/following?type=artist");

        const result = await sut.currentUser.followedArtists();
        expect(result.artists.items.find((a) => a.id === artistId)).toBeTruthy();

        await sut.currentUser.unfollowArtistsOrUsers([artistId], "artist");
        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/following?type=artist");

        const result2 = await sut.currentUser.followedArtists();
        expect(result2.artists.items.find((a) => a.id === artistId)).toBeFalsy();
    });

    it("checkUserFollowsArtistsOrUsers correctly identifies followed artist", async () => {
        await sut.currentUser.followArtistsOrUsers([artistId], "artist");

        const result = await sut.currentUser.followsArtistsOrUsers([artistId], "artist");

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/following/contains?ids=${artistId}&type=artist`);
        expect(result[0]).toBeTruthy();
    });

    it("getUsersSavedAlbums returns items", async () => {
        const result = await sut.currentUser.albums.savedAlbums();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/albums");
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("checkCurrentUsersSavedAlbums returns true for saved known album", async () => {
        const result = await sut.currentUser.albums.hasSavedAlbums([albumId]);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/albums/contains?ids=${albumId}`);
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

        await sut.currentUser.playlists.unfollow(result.id);
    });

    it("can set valid image form file (node.js)", async () => {
        const me = await sut.currentUser.profile();

        const result = await sut.playlists.createPlaylist(me.id, {
            name: "test playlist name!",
            description: "test playlist description!"
        });

        const file = fs.readFileSync("./src/test/valid-image.jpg", { encoding: "base64" });

        await sut.playlists.addCustomPlaylistCoverImage(result.id, file);
        await sut.currentUser.playlists.unfollow(result.id);
    });

    it("getCurrentUsersPlaylists returns playlists", async () => {
        const result = await sut.currentUser.playlists.playlists();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/playlists");
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("can save and remove album for user", async () => {
        await sut.currentUser.albums.saveAlbums([albumId]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/albums`);

        const result = await sut.currentUser.albums.savedAlbums();
        expect(result.items.find((a) => a.album.id === albumId)).toBeTruthy();

        await sut.currentUser.albums.removeSavedAlbums([albumId]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/albums`);

        const result2 = await sut.currentUser.albums.savedAlbums();
        expect(result2.items.find((a) => a.album.id === albumId)).toBeFalsy();
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
        const result = await sut.currentUser.audiobooks.hasSavedAudiobooks([audioBookId]);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/audiobooks/contains?ids=${audioBookId}`);
        expect(result[0]).toBeTruthy();
    });

    it("can save and remove audiobook for user", async () => {
        await sut.currentUser.audiobooks.saveAudiobooks([audioBookId]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/audiobooks`);

        const result2 = await sut.currentUser.audiobooks.savedAudiobooks();
        expect(result2.items.find((a) => a.id === audioBookId)).toBeTruthy();

        await sut.currentUser.audiobooks.removeSavedAudiobooks([audioBookId]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/audiobooks`);

        const result3 = await sut.currentUser.audiobooks.savedAudiobooks();
        expect(result3.items.find((a) => a.id === audioBookId)).toBeFalsy();
    });

    it("savedShows returns shows", async () => {
        const result = await sut.currentUser.shows.savedShows();

        expect(fetchSpy.lastRequest().input).toBe("https://api.spotify.com/v1/me/shows");
        expect(result.items.length).toBeGreaterThan(0);
    });

    it("hasSavedShow returns true for saved show", async () => {
        const result = await sut.currentUser.shows.hasSavedShow([showId]);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/shows/contains?ids=${showId}`);
        expect(result[0]).toBeTruthy();
    });

    it("hasSavedShow issues correct request for multiple saved shows", async () => {
        await sut.currentUser.shows.hasSavedShow([showId, showId]);

        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/shows/contains?ids=${showId}%2C${showId}`);
    });

    it("can save and remove show for user", async () => {
        await sut.currentUser.shows.removeSavedShows([showId]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/shows?ids=${showId}`);

        const result = await sut.currentUser.shows.savedShows();
        expect(result.items.find((s) => s.show.id === showId)).toBeFalsy();

        await sut.currentUser.shows.saveShows([showId]);
        expect(fetchSpy.lastRequest().input).toBe(`https://api.spotify.com/v1/me/shows?ids=${showId}`);

        const result2 = await sut.currentUser.shows.savedShows();
        expect(result2.items.find((s) => s.show.id === showId)).toBeTruthy();
    });

}, { timeout: 20000 });
