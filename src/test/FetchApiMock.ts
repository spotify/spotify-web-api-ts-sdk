export type FetchParams = { input: RequestInfo | URL; init?: RequestInit; };

export class FetchApiMock {
    public issuedRequests: Array<FetchParams> = [];
    private responseQueue: Array<Response> = [];

    public fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> {
        this.issuedRequests.push({ input, init });
        return Promise.resolve(this.responseQueue.pop()!);
    }

    public queueResponse(response: Response) {
        this.responseQueue.push(response);
    }

    public queueResponseBody(status: number, body: any) {        
        this.queueRawResponseBody(status, JSON.stringify(body));
    }

    public queueRawResponseBody(status: number, body: string) {
        const fakeResponse = {
            status: status,
            text: () => {
                return JSON.stringify(body);
            }
        } as any;

        this.queueResponse(fakeResponse);
    }

    public isssuedRequest(offset: number) {
        return this.issuedRequests[offset];
    }

    public issuedRequestHeadersAndBody(offset: number): [HeadersInit, string] {
        const request = this.isssuedRequest(offset);
        const { init } = request;
        const headers = init?.headers as any;
        const body = init?.body as string;
        return [headers, body];
    }
}


