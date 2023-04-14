import type { Market, MaxInt } from '../types';
import EndpointsBase from './EndpointsBase';

interface QueryRange {
    timestamp: number;
    type: "before" | "after"
}

export default class PlayerEndpoints extends EndpointsBase {
    public getPlaybackState(market?: Market, additionalTypes?: string) {
        const params = this.paramsFor({ market, additionalTypes });
        return this.getRequest<any>(`me/player${params}`);
    }

    public getAvailableDevices() {
        return this.getRequest<any>('me/player/devices');
    }

    public getCurrentlyPlayingTrack(market?: Market, additionalTypes?: string) {
        const params = this.paramsFor({ market, additionalTypes });
        return this.getRequest<any>(`me/player/currently-playing${params}`);
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
        return this.getRequest<any>(`me/player/recently-played${params}`);
    }

    public getUsersQueue() {
        return this.getRequest<any>('me/player/queue');
    }

    public transferPlayback(device_ids: string[], play?: boolean) {
        if (device_ids.length > 1) {
            throw new Error("Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return 400 Bad Request");
        }
        return this.putRequest<any>('me/player', { device_ids, play });
    }

    public startResumePlayback(device_id: string, context_uri?: string, uris?: string[], offset?: object, positionMs?: number) {
        const params = this.paramsFor({ device_id });

        return this.putRequest<any>(`me/player/play${params}`, { context_uri, uris, offset, positionMs });
    }

    public pausePlayback(device_id: string) {
        const params = this.paramsFor({ device_id });
        return this.putRequest<any>(`me/player/pause${params}`);
    }

    public skipToNext(device_id: string) {
        const params = this.paramsFor({ device_id });
        return this.postRequest<any>(`me/player/next${params}`);
    }

    public skipToPrevious(device_id: string) {
        const params = this.paramsFor({ device_id });
        return this.postRequest<any>(`me/player/previous${params}`);
    }

    public seekToPosition(position_ms: number, device_id?: string) {
        const params = this.paramsFor({ position_ms, device_id });
        return this.putRequest<any>(`me/player/seek${params}`);
    }

    public setRepeatMode(state: 'track' | 'context' | 'off', device_id?: string) {
        const params = this.paramsFor({ state, device_id });
        this.putRequest<any>(`me/player/repeat${params}`);
    }

    public setPlaybackVolume(volume_percent: number, device_id?: string) {
        const params = this.paramsFor({ volume_percent, device_id });
        this.putRequest<any>(`me/player/volume${params}`);
    }

    public togglePlaybackShuffle(state: boolean, device_id?: string) {
        const params = this.paramsFor({ state, device_id });
        this.putRequest<any>(`me/player/shuffle${params}`);
    }

    public addItemToPlaybackQueue(uri: string, device_id?: string) {
        const params = this.paramsFor({ uri, device_id });
        this.putRequest<any>(`me/player/queue${params}`);
    }
}
