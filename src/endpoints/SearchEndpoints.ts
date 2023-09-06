import type { ItemTypes, Market, MaxInt, SearchResults } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export interface SearchExecutionFunction {
    <const T extends readonly ItemTypes[]>(q: string, type: T, market?: Market, limit?: MaxInt<50>, offset?: number, include_external?: string): Promise<SearchResults<T>>;
}

export default class SearchEndpoints extends EndpointsBase {
    public async execute<const T extends readonly ItemTypes[]>(q: string, type: T, market?: Market, limit?: MaxInt<50>, offset?: number, include_external?: string) {
        const params = this.paramsFor({ q, type, market, limit, offset, include_external });
        return await this.getRequest<SearchResults<T>>(`search${params}`);
    }
}
