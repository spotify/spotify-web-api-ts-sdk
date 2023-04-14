import EndpointsBase from './EndpointsBase';

export default class MarketsEndpoints extends EndpointsBase {
    public getAvailableMarkets() {
        return this.getRequest<Markets>('markets');
    }
}
