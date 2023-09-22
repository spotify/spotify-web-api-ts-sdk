import type { Market, Playlist, MaxInt, Page, Track, SnapshotReference, Image, PlaylistedTrack, QueryAdditionalTypes, TrackItem } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class PlaylistsEndpoints extends EndpointsBase {

    public getPlaylist<AdditionalTypes extends QueryAdditionalTypes | undefined = undefined>(
        playlist_id: string, market?: Market, fields?: string, additional_types?: AdditionalTypes
    ) {
        // TODO: better support for fields
        const params = this.paramsFor({ market, fields, additional_types: additional_types?.join(',') });
        return this.getRequest<Playlist<AdditionalTypes extends undefined ? Track : TrackItem>>(`playlists/${playlist_id}${params}`);
    }

    public getPlaylistItems<AdditionalTypes extends QueryAdditionalTypes | undefined = undefined>(
        playlist_id: string, market?: Market, fields?: string, limit?: MaxInt<50>, offset?: number, additional_types?: AdditionalTypes
    ) {
        // TODO: better support for fields
        const params = this.paramsFor({ market, fields, limit, offset, additional_types: additional_types?.join(',') });
        return this.getRequest<Page<PlaylistedTrack<AdditionalTypes extends undefined ? Track : TrackItem>>>(`playlists/${playlist_id}/tracks${params}`);
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
        return this.getRequest<Page<Playlist>>(`users/${user_id}/playlists${params}`);
    }

    public createPlaylist(user_id: string, request: CreatePlaylistRequest) {
        return this.postRequest<Playlist>(`users/${user_id}/playlists`, request);
    }

    public getPlaylistCoverImage(playlist_id: string) {
        return this.getRequest<Image[]>(`playlists/${playlist_id}/images`);
    }

    public async addCustomPlaylistCoverImage(playlist_id: string, imageData: Buffer | HTMLImageElement | HTMLCanvasElement | string) {
        let base64EncodedJpeg: string = "";

        if (imageData instanceof Buffer) {
            base64EncodedJpeg = imageData.toString("base64");
        } else if (imageData instanceof HTMLCanvasElement) {
            base64EncodedJpeg = imageData.toDataURL("image/jpeg").split(';base64,')[1];
        } else if (imageData instanceof HTMLImageElement) {
            const canvas = document.createElement("canvas");
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
                throw new Error("Could not get canvas context");
            }
            ctx.drawImage(imageData, 0, 0);
            base64EncodedJpeg = canvas.toDataURL("image/jpeg").split(';base64,')[1];
        } else if (typeof imageData === "string") {
            base64EncodedJpeg = imageData;
        } else {
            throw new Error("ImageData must be a Buffer, HTMLImageElement, HTMLCanvasElement, or string containing a base64 encoded jpeg");
        }

        await this.addCustomPlaylistCoverImageFromBase64String(playlist_id, base64EncodedJpeg);
    }

    public async addCustomPlaylistCoverImageFromBase64String(playlist_id: string, base64EncodedJpeg: string) {
        await this.putRequest(`playlists/${playlist_id}/images`, base64EncodedJpeg, "image/jpeg");
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
