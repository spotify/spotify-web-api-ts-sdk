import type { Genres, MaxInt } from '../types';
import EndpointsBase from './EndpointsBase';

export default class RecommendationsEndpoints extends EndpointsBase {
    public get(request: RecommendationsRequest) {
        const params = this.paramsFor(request);
        return this.getRequest<any>(`recommendations${params}`);
    }

    public genreSeeds() {
        return this.getRequest<Genres>('recommendations/available-genre-seeds');
    }
}

export interface RecommendationsRequest {
    limit?: number;
    market?: string;
    seed_artists?: string[];
    seed_genres?: string[];
    seed_tracks?: string[];
    min_acousticness?: MaxInt<1>;
    max_acousticness?: MaxInt<1>;
    target_acousticness?: MaxInt<1>;
    min_danceability?: MaxInt<1>;
    max_danceability?: MaxInt<1>;
    target_danceability?: MaxInt<1>;
    min_duration_ms?: number;
    max_duration_ms?: number;
    target_duration_ms?: number;
    min_energy?: MaxInt<1>;
    max_energy?: MaxInt<1>;
    target_energy?: MaxInt<1>;
    min_instrumentalness?: MaxInt<1>;
    max_instrumentalness?: MaxInt<1>;
    target_instrumentalness?: MaxInt<1>;
    min_key?: number;
    max_key?: number;
    target_key?: number;
    min_liveness?: MaxInt<1>;
    max_liveness?: MaxInt<1>;
    target_liveness?: MaxInt<1>;
    min_loudness?: number;
    max_loudness?: number;
    target_loudness?: number;
    min_mode?: MaxInt<1>;
    max_mode?: MaxInt<1>;
    target_mode?: MaxInt<1>;
    min_popularity?: MaxInt<100>;
    max_popularity?: MaxInt<100>;
    target_popularity?: MaxInt<100>;
    min_speechiness?: MaxInt<1>;
    max_speechiness?: MaxInt<1>;
    target_speechiness?: MaxInt<1>;
    min_tempo?: number;
    max_tempo?: number;
    target_tempo?: number;
    min_time_signature?: number;
    max_time_signature?: number;
    target_time_signature?: number;
    min_valence?: MaxInt<1>;
    max_valence?: MaxInt<1>;
    target_valence?: MaxInt<1>;
}