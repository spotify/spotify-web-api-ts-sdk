import { SpotifyApi } from '../SpotifyApi.js';
import type { User, Page, Artist, MaxInt, FollowedArtists, Market, SavedAlbum, Audiobook, PlaylistWithTrackReferences, SavedTrack, SavedEpisode, SavedShow } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class CurrentUserEndpoints extends EndpointsBase {
    public albums: CurrentUserAlbumsEndpoints;
    public audiobooks: CurrentUserAudiobooksEndpoints;
    public episodes: CurrentUserEpisodesEndpoints;
    public playlists: CurrentUserPlaylistsEndpoints;
    public shows: CurrentUserShowsEndpoints;
    public tracks: CurrentUserTracksEndpoints;

    constructor(api: SpotifyApi) {
        super(api);

        this.albums = new CurrentUserAlbumsEndpoints(api);
        this.audiobooks = new CurrentUserAudiobooksEndpoints(api);
        this.episodes = new CurrentUserEpisodesEndpoints(api);
        this.playlists = new CurrentUserPlaylistsEndpoints(api);
        this.shows = new CurrentUserShowsEndpoints(api);
        this.tracks = new CurrentUserTracksEndpoints(api);
    }

    public profile() {
        return this.getRequest<User>('me');
    }

    public topItems(type: "artists" | "tracks") {
        return this.getRequest<Page<Artist>>(`me/top/${type}`);
    }

    public followedArtists(after?: string, limit?: MaxInt<50>) {
        const params = this.paramsFor({ type: "artist", after, limit });
        return this.getRequest<FollowedArtists>(`me/following${params}`);
    }

    public async followArtistsOrUsers(ids: string[], type: 'artist' | 'user') {
        const params = this.paramsFor({ type });
        await this.putRequest(`me/following${params}`, { ids });
    }

    public async unfollowArtistsOrUsers(ids: string[], type: 'artist' | 'user') {
        const params = this.paramsFor({ type });
        await this.deleteRequest(`me/following${params}`, { ids });
    }

    public followsArtistsOrUsers(ids: string[], type: 'artist' | 'user') {
        const params = this.paramsFor({ ids, type });
        return this.getRequest<boolean[]>(`me/following/contains${params}`);
    }
}


class CurrentUserAlbumsEndpoints extends EndpointsBase {
    public savedAlbums(limit?: MaxInt<50>, offset?: number, market?: Market) {
        const params = this.paramsFor({ limit, offset, market });
        return this.getRequest<Page<SavedAlbum>>(`me/albums${params}`);
    }

    public async saveAlbums(ids: string[]) {
        await this.putRequest('me/albums', ids);
    }

    public async removeSavedAlbums(ids: string[]) {
        await this.deleteRequest('me/albums', ids);
    }

    public hasSavedAlbums(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`me/albums/contains${params}`);
    }
}

class CurrentUserAudiobooksEndpoints extends EndpointsBase {
    public savedAudiobooks(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return this.getRequest<Page<Audiobook>>(`me/audiobooks${params}`);
    }

    public async saveAudiobooks(ids: string[]) {
        await this.putRequest('me/audiobooks', ids);
    }

    public async removeSavedAudiobooks(ids: string[]) {
        await this.deleteRequest('me/audiobooks', ids);
    }

    public hasSavedAudiobooks(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`me/audiobooks/contains${params}`);
    }
}

class CurrentUserEpisodesEndpoints extends EndpointsBase {
    public savedEpisodes(market?: Market, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ market, limit, offset });
        return this.getRequest<Page<SavedEpisode>>(`me/episodes${params}`);
    }

    public async saveEpisodes(ids: string[]) {
        await this.putRequest(`me/episodes`, ids)
    }

    public async removeSavedEpisodes(ids: string[]) {
        await this.deleteRequest(`me/episodes`, ids)
    }

    public hasSavedEpisodes(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`me/episodes/contains${params}`);
    }
}

class CurrentUserPlaylistsEndpoints extends EndpointsBase {
    public playlists(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return this.getRequest<Page<PlaylistWithTrackReferences>>(`me/playlists${params}`);
    }

    public follow(playlist_id: string) {
        return this.putRequest(`playlists/${playlist_id}/followers`);
    }

    public unfollow(playlist_id: string) {
        return this.deleteRequest(`playlists/${playlist_id}/followers`);
    }

    public isFollowing(playlistId: string, ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`playlists/${playlistId}/followers/contains${params}`)
    }
}

class CurrentUserShowsEndpoints extends EndpointsBase {
    public savedShows(limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset })
        return this.getRequest<Page<SavedShow>>(`me/shows${params}`);
    }

    public async saveShows(ids: string[]) {
        const params = this.paramsFor({ ids });
        await this.putRequest(`me/shows${params}`);
    }

    public async removeSavedShows(ids: string[], market?: Market) {
        const params = this.paramsFor({ ids, market });
        await this.deleteRequest(`me/shows${params}`);
    }

    public hasSavedShows(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`me/shows/contains${params}`);
    }
}

class CurrentUserTracksEndpoints extends EndpointsBase {
    public savedTracks(limit?: MaxInt<50>, offset?: number, market?: Market) {
        const params = this.paramsFor({ limit, offset, market });
        return this.getRequest<Page<SavedTrack>>(`me/tracks${params}`);
    }

    public saveTracks(ids: string[]) {
        return this.putRequest('me/tracks', ids);
    }

    public removeSavedTracks(ids: string[]) {
        return this.deleteRequest('me/tracks', ids);
    }

    public hasSavedTracks(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`me/tracks/contains${params}`);
    }
}

