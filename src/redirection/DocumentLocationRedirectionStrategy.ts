import type { IRedirectionStrategy } from "../types.js";

export default class DocumentLocationRedirectionStrategy implements IRedirectionStrategy {
    public async redirect(targetUrl: string | URL): Promise<void> {
        document.location = targetUrl.toString();
    }

    public async onReturnFromRedirect(): Promise<void> {
    }
}
