import type { Market, AudiobookWithChapters, Audiobooks, MaxInt, Page, Chapter } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class AudiobooksEndpoints extends EndpointsBase {
    public async get(id: string, market?: Market): Promise<AudiobookWithChapters>;
    public async get(ids: string[], market?: Market): Promise<AudiobookWithChapters[]>;
    public async get(idOrIds: string | string[], market?: Market) {
        if (typeof idOrIds === 'string') {
            const params = this.paramsFor({ market });
            return this.getRequest<AudiobookWithChapters>(`audiobooks/${idOrIds}${params}`);
        }

        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Audiobooks>(`audiobooks${params}`);
        return response.audiobooks;
    }

    public getAudiobookChapters(id: string, market?: Market, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ market, limit, offset });
        return this.getRequest<Page<Chapter>>(`audiobooks/${id}/chapters${params}`);
    }

}
