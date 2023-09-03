import { SpotifyApi } from '../SpotifyApi.js';
import type { User, Page, Artist, Track, MaxInt, FollowedArtists, Market, SavedAlbum, SimplifiedAudiobook, SimplifiedPlaylist, SavedEpisode, SavedShow, SavedTrack, UserProfile } from '../types.js';
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
        return this.getRequest<UserProfile>('me');
    }

    public topItems<T extends "artists" | "tracks">(type: T, time_range?: 'short_term' | 'medium_term' | 'long_term', limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ time_range, limit, offset });
        return this.getRequest<Page<T extends "artists" ? Artist : Track>>(`me/top/${type}${params}`);
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
        return this.getRequest<Page<SimplifiedAudiobook>>(`me/audiobooks${params}`);
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
        return this.getRequest<Page<SimplifiedPlaylist>>(`me/playlists${params}`);
    }

    public async follow(playlist_id: string) {
        await this.putRequest(`playlists/${playlist_id}/followers`);
    }

    public async unfollow(playlist_id: string) {
        await this.deleteRequest(`playlists/${playlist_id}/followers`);
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

    public saveShows(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.putRequest(`me/shows${params}`);
    }

    public removeSavedShows(ids: string[], market?: Market) {
        const params = this.paramsFor({ ids, market });
        return this.deleteRequest(`me/shows${params}`);
    }

    public hasSavedShow(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`me/shows/contains${params}`);
    }
}

class CurrentUserTracksEndpoints extends EndpointsBase {
    public savedTracks(limit?: MaxInt<50>, offset?: number, market?: Market) {
        const params = this.paramsFor({ limit, offset, market });
        return this.getRequest<Page<SavedTrack>>(`me/tracks${params}`);
    }
    public async saveTracks(ids: string[]) {
        await this.putRequest('me/tracks', ids);
    }

    public async removeSavedTracks(ids: string[]) {
        await this.deleteRequest('me/tracks', ids);
    }

    public hasSavedTracks(ids: string[]) {
        const params = this.paramsFor({ ids });
        return this.getRequest<boolean[]>(`me/tracks/contains${params}`);
    }
}

