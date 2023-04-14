import fs from 'fs';
import { v4 as uuidv4 } from "uuid";

export class FetchApiSpy {
    private issuedRequests: Array<{ input: RequestInfo | URL; init?: RequestInit; }> = [];
    private logResults: boolean;

    constructor(logResults: boolean = false) {
        this.logResults = logResults;
    }

    public async fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> {
        this.issuedRequests.push({ input, init });
        const result = fetch(input, init);

        if (this.logResults) {
            const awaited = await result;
            const clone = awaited.clone();

            if (!fs.existsSync("temp")) {
                fs.mkdirSync("temp");
            }

            const uniqueId = uuidv4();
            const bodyText = await clone.text();

            const fileContents = `
// URL: ${awaited.url}
// Status: ${awaited.status}
// Status Text: ${awaited.statusText}

${bodyText}`.trim();

            fs.writeFileSync(`temp/${uniqueId}.json`, fileContents);

            return awaited;
        }

        return result;
    }

    public request(offset: number) {
        return this.issuedRequests[0];
    }

    public lastRequest() {
        return this.issuedRequests[this.issuedRequests.length - 1];
    }
}
