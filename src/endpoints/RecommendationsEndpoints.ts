import type { Genres, Track } from '../types.js';
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

export interface RecommendationsRequestRequiredArguments {
    seed_artists?: string[];
    seed_genres?: string[];
    seed_tracks?: string[];
}

export interface RecommendationsRequest extends RecommendationsRequestRequiredArguments {
    limit?: number;
    market?: string;
    min_acousticness?: number;
    max_acousticness?: number;
    target_acousticness?: number;
    min_danceability?: number;
    max_danceability?: number;
    target_danceability?: number;
    min_duration_ms?: number;
    max_duration_ms?: number;
    target_duration_ms?: number;
    min_energy?: number;
    max_energy?: number;
    target_energy?: number;
    min_instrumentalness?: number;
    max_instrumentalness?: number;
    target_instrumentalness?: number;
    min_key?: number;
    max_key?: number;
    target_key?: number;
    min_liveness?: number;
    max_liveness?: number;
    target_liveness?: number;
    min_loudness?: number;
    max_loudness?: number;
    target_loudness?: number;
    min_mode?: number;
    max_mode?: number;
    target_mode?: number;
    min_popularity?: number;
    max_popularity?: number;
    target_popularity?: number;
    min_speechiness?: number;
    max_speechiness?: number;
    target_speechiness?: number;
    min_tempo?: number;
    max_tempo?: number;
    target_tempo?: number;
    min_time_signature?: number;
    max_time_signature?: number;
    target_time_signature?: number;
    min_valence?: number;
    max_valence?: number;
    target_valence?: number;
}

export interface RecommendationsResponse {
    seeds: RecommendationSeed[];
    tracks: Track[];
}

export interface RecommendationSeed {
    id: string;
    href: string;
    type: string;

    initialPoolSize: number;
    afterFilteringSize: number;
    afterRelinkingSize: number;
}
