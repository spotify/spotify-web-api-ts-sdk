import type { Devices, Market, MaxInt, PlaybackState, Queue, RecentlyPlayedTracksPage } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

interface QueryRange {
    timestamp: number;
    type: "before" | "after"
}

export default class PlayerEndpoints extends EndpointsBase {

    public getPlaybackState(market?: Market, additional_types?: string) {
        const params = this.paramsFor({ market, additional_types });
        return this.getRequest<PlaybackState>(`me/player${params}`);
    }

    public getAvailableDevices() {
        return this.getRequest<Devices>('me/player/devices');
    }

    public getCurrentlyPlayingTrack(market?: Market, additional_types?: string) {
        const params = this.paramsFor({ market, additional_types });
        return this.getRequest<PlaybackState>(`me/player/currently-playing${params}`);
    }

    public getRecentlyPlayedTracks(limit?: MaxInt<50>, queryRange?: QueryRange) {
        const paramObj: any = { limit };

        if (queryRange) {
            if (queryRange.type === "before") {
                paramObj.before = queryRange.timestamp
            } else if (queryRange.type === "after") {
                paramObj.after = queryRange.timestamp
            }
        }

        const params = this.paramsFor(paramObj);
        return this.getRequest<RecentlyPlayedTracksPage>(`me/player/recently-played${params}`);
    }

    public getUsersQueue() {
        return this.getRequest<Queue>('me/player/queue');
    }

    public async transferPlayback(device_ids: string[], play?: boolean) {
        if (device_ids.length > 1) {
            throw new Error("Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return 400 Bad Request");
        }
        await this.putRequest('me/player', { device_ids, play });
    }

    public async startResumePlayback(device_id: string, context_uri?: string, uris?: string[], offset?: object, positionMs?: number) {
        const params = this.paramsFor({ device_id });
        await this.putRequest(`me/player/play${params}`, { context_uri, uris, offset, positionMs });
    }

    public async pausePlayback(device_id: string) {
        const params = this.paramsFor({ device_id });
        await this.putRequest(`me/player/pause${params}`);
    }

    public async skipToNext(device_id: string) {
        const params = this.paramsFor({ device_id });
        await this.postRequest(`me/player/next${params}`);
    }

    public async skipToPrevious(device_id: string) {
        const params = this.paramsFor({ device_id });
        await this.postRequest(`me/player/previous${params}`);
    }

    public async seekToPosition(position_ms: number, device_id?: string) {
        const params = this.paramsFor({ position_ms, device_id });
        await this.putRequest(`me/player/seek${params}`);
    }

    public async setRepeatMode(state: 'track' | 'context' | 'off', device_id?: string) {
        const params = this.paramsFor({ state, device_id });
        await this.putRequest(`me/player/repeat${params}`);
    }

    public async setPlaybackVolume(volume_percent: number, device_id?: string) {
        const params = this.paramsFor({ volume_percent, device_id });
        await this.putRequest(`me/player/volume${params}`);
    }

    public async togglePlaybackShuffle(state: boolean, device_id?: string) {
        const params = this.paramsFor({ state, device_id });
        await this.putRequest(`me/player/shuffle${params}`);
    }

    public async addItemToPlaybackQueue(uri: string, device_id?: string) {
        const params = this.paramsFor({ uri, device_id });
        await this.postRequest(`me/player/queue${params}`);
    }
}
