import EndpointsBase from './EndpointsBase';

export default class PlaylistsEndpoints extends EndpointsBase {

    public getPlaylist(playlist_id: string, market?: Market, fields?: string, additional_types?: string) {
        // TODO: better support for fields
        const params = this.paramsFor({ market, fields, additional_types });
        return this.getRequest<PlaylistWithTracks>(`playlists/${playlist_id}${params}`);
    }

    public getPlaylistItems(playlist_id: string, market?: Market, fields?: string, limit?: MaxInt<50>, offset?: number, additional_types?: string) {
        // TODO: better support for fields
        const params = this.paramsFor({ market, fields, limit, offset, additional_types });
        return this.getRequest<Page<Track>>(`playlists/${playlist_id}/tracks${params}`);
    }

    public async changePlaylistDetails(playlist_id: string, request: ChangePlaylistDetailsRequest) {
        await this.putRequest(`playlists/${playlist_id}`, request);
    }

    public movePlaylistItems(playlist_id: string, range_start: number, range_length: number, moveToPosition: number) {
        return this.updatePlaylistItems(playlist_id, { 
            range_start, 
            range_length,
            insert_before: moveToPosition 
        });
    }

    public updatePlaylistItems(playlist_id: string, request: UpdatePlaylistItemsRequest) {
        return this.putRequest<SnapshotReference>(`playlists/${playlist_id}/tracks`, request);
    }

    public async addItemsToPlaylist(playlist_id: string, uris?: string[], position?: number) {
        await this.postRequest(`playlists/${playlist_id}/tracks`, { position, uris: uris });
    }

    public async removeItemsFromPlaylist(playlist_id: string, request: RemovePlaylistItemsRequest) {
        await this.deleteRequest(`playlists/${playlist_id}/tracks`, request);
    }

    public getUsersPlaylists(user_id: string, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ limit, offset });
        return this.getRequest<Page<PlaylistWithTracks>>(`users/${user_id}/playlists${params}`);
    }

    public createPlaylist(user_id: string, request: CreatePlaylistRequest) {
        return this.postRequest<PlaylistWithTracks>(`users/${user_id}/playlists`, request);
    }

    public getPlaylistCoverImage(playlist_id: string) {
        return this.getRequest<Image[]>(`playlists/${playlist_id}/images`);
    }

    public async addCustomPlaylistCoverImage(playlist_id: string) {
        // There are no docs for this, seems broken.
        await this.putRequest(`playlists/${playlist_id}/images`);
    }

}

interface RemovePlaylistItemsRequest {
    tracks: Array<{ uri: string }>;
    snapshot_id?: string;
}

interface UpdatePlaylistItemsRequest {
    uris?: string[];
    range_start?: number;
    insert_before?: number;
    range_length?: number;
    snapshot_id?: string;
}

interface ChangePlaylistDetailsRequest {
    name?: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
}

// TODO: deduplicate this from above
interface CreatePlaylistRequest {
    name: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
}
