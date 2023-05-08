import type { Market, ShowWithEpisodes, Shows, MaxInt, Page, Episode } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class ShowsEndpoints extends EndpointsBase {

    public get(id: string, market: Market): Promise<ShowWithEpisodes>;
    public get(ids: string[], market: Market): Promise<ShowWithEpisodes[]>
    public async get(idOrIds: string | string[], market: Market) {
        if (typeof idOrIds === 'string') {
            const params = this.paramsFor({ market })
            return this.getRequest<ShowWithEpisodes>(`shows/${idOrIds}${params}`);
        }

        // TODO: only returns 50, validate here
        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Shows>(`shows${params}`);
        return response.shows;
    }

    public episodes(id: string, market?: Market, limit?: MaxInt<50>, offset?: number) {
        const params = this.paramsFor({ market, limit, offset })
        return this.getRequest<Page<Episode>>(`shows/${id}/episodes${params}`);
    }
}
