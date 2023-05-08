import type { Markets } from '../types.js';
import EndpointsBase from './EndpointsBase.js';

export default class MarketsEndpoints extends EndpointsBase {
    public getAvailableMarkets() {
        return this.getRequest<Markets>('markets');
    }
}
