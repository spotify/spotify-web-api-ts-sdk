import type { ChapterWithAudiobookAndRestrictions, Chapters } from '../types';
import EndpointsBase from './EndpointsBase';

// These are mandatory, and the only supported market codes for the Chapters API
export type ChapterMarket = "GB" | "US" | "IE" | "NZ" | "AU";

export default class ChaptersEndpoints extends EndpointsBase {
    public get(id: string, market: ChapterMarket): Promise<ChapterWithAudiobookAndRestrictions>;
    public get(ids: string[], market: ChapterMarket): Promise<ChapterWithAudiobookAndRestrictions[]>;
    public async get(idOrIds: string | string[], market: ChapterMarket) {
        if (typeof idOrIds === 'string') {
            const params = this.paramsFor({ market });
            return this.getRequest<ChapterWithAudiobookAndRestrictions>(`chapters/${idOrIds}${params}`);
        }

        // TODO: Only returns top 50, validate / pre-check here
        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Chapters>(`chapters${params}`);
        return response.chapters;
    }
}
