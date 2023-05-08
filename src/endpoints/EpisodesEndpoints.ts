import type { Market, Episode, Episodes } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class EpisodesEndpoints extends EndpointsBase {

    public get(id: string, market: Market): Promise<Episode>
    public get(ids: string[], market: Market): Promise<Episode[]>
    public async get(idOrIds: string | string[], market: Market) {
        if (typeof idOrIds === 'string') {
            const params = this.paramsFor({ market });
            return this.getRequest<Episode>(`episodes/${idOrIds}${params}`);
        }

        const params = this.paramsFor({ ids: idOrIds, market });
        const response = await this.getRequest<Episodes>(`episodes${params}`);
        return response.episodes;
    }
}
