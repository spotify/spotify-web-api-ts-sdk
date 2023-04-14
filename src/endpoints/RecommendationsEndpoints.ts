import EndpointsBase from './EndpointsBase';

export default class RecommendationsEndpoints extends EndpointsBase {
    public get() {
        throw new Error("not implemented, too many params :O")
        return this.getRequest<any>('recommendations');
    }
    
    public genreSeeds() {
        return this.getRequest<Genres>('recommendations/available-genre-seeds');
    }
}
