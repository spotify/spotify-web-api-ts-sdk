
import type {
    Artist,
    Artists,
    Market,
    MaxInt,
    Page,
    SimplifiedAlbum,
    TopTracksResult,
} from "../types.js";
import EndpointsBase from "./EndpointsBase.js";

export default class ArtistsEndpoints extends EndpointsBase {
    public async get(id: string): Promise<Artist>;
    public async get(ids: string[]): Promise<Artist[]>;
    public async get(idOrIds: string | string[]) {
        if (typeof idOrIds === "string") {
            const artist = this.getRequest<Artist>(`artists/${idOrIds}`);
            return artist;
        }

        const params = this.paramsFor({ ids: idOrIds });
        const response = await this.getRequest<Artists>(`artists${params}`);
        return response.artists;
    }

    public albums(
        id: string,
        includeGroups?: string,
        market?: Market,
        limit?: MaxInt<50>,
        offset?: number
    ) {
        const params = this.paramsFor({
            include_groups: includeGroups,
            market,
            limit,
            offset,
        });
        return this.getRequest<Page<SimplifiedAlbum>>(
            `artists/${id}/albums${params}`
        );
    }

    public topTracks(id: string, market: Market) {
        // BUG: market is flagged as optional in the docs, but it's actually required for this endpoint
        // otherwise you get a 400

        const params = this.paramsFor({ market });
        return this.getRequest<TopTracksResult>(
            `artists/${id}/top-tracks${params}`
        );
    }

    public relatedArtists(id: string) {
        return this.getRequest<Artists>(`artists/${id}/related-artists`);
    }
}
