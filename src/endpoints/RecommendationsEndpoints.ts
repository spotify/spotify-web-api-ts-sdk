import type { Genres, MaxInt, RecommendationsRequest, RecommendationsRequestRequiredArguments, RecommendationsResponse, Track } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class RecommendationsEndpoints extends EndpointsBase {
    public get(request: RecommendationsRequestRequiredArguments | RecommendationsRequest) {
        const params = this.paramsFor(request);
        return this.getRequest<RecommendationsResponse>(`recommendations${params}`);
    }

    public genreSeeds() {
        return this.getRequest<Genres>('recommendations/available-genre-seeds');
    }
}
