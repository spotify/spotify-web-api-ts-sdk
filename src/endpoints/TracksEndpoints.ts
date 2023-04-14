import type { Market, TrackWithAlbum, Tracks, AudioFeatures, AudioFeaturesCollection, AudioAnalysis } from '../types';
import EndpointsBase from './EndpointsBase';

export default class TracksEndpoints extends EndpointsBase {

    public get(id: string, market?: Market): Promise<TrackWithAlbum>
    public get(ids: string[], market?: Market): Promise<TrackWithAlbum[]>
    public async get(idOrIds: string | string[], market?: Market) {
        if (typeof idOrIds === 'string') {
            const params = this.paramsFor({ market });
            return this.getRequest<TrackWithAlbum>(`tracks/${idOrIds}${params}`);
        }

        const params = this.paramsFor({ ids: idOrIds, market });
        // TODO: only returns top 20, validate here
        const response = await this.getRequest<Tracks>(`tracks${params}`);
        return response.tracks;
    }

    public audioFeatures(id: string): Promise<AudioFeatures>
    public audioFeatures(ids: string[]): Promise<AudioFeatures[]>
    public async audioFeatures(idOrIds: string | string[]) {
        if (typeof idOrIds === 'string') {
            return this.getRequest<AudioFeatures>(`audio-features/${idOrIds}`);
        }
        const params = this.paramsFor({ ids: idOrIds });
        const response = await this.getRequest<AudioFeaturesCollection>(`audio-features${params}`);
        return response.audio_features;
    }

    public audioAnalysis(id: string) {
        return this.getRequest<AudioAnalysis>(`audio-analysis/${id}`);
    }

}
