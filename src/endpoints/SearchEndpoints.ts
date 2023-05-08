import type { ItemTypes, Market, MaxInt, SearchResults } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export interface SearchExecutionFunction {
    (q: string, type: ItemTypes[], market?: Market, limit?: MaxInt<50>, offset?: number, include_external?: string): Promise<SearchResults>;
}

export default class SearchEndpoints extends EndpointsBase {
    public async execute(q: string, type: ItemTypes[], market?: Market, limit?: MaxInt<50>, offset?: number, include_external?: string) {
        const params = this.paramsFor({ q, type, market, limit, offset, include_external });
        return await this.getRequest<SearchResults>(`search${params}`);
    }
}
