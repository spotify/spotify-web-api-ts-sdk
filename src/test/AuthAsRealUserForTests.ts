import playwright from "playwright";
import AuthorizationCodeWithPKCEStrategy from "../auth/AuthorizationCodeWithPKCEStrategy";
import AccessTokenHelpers from "../auth/AccessTokenHelpers";
import type { AccessToken } from "../types";

export default class AuthAsSpecifcUserForTests extends AuthorizationCodeWithPKCEStrategy {
    constructor(
        protected clientId: string,
        protected scopes: string[],
        private email: string,
        private password: string
    ) {
        super(clientId, "http://localhost:3000", scopes);
    }

    public async getAccessToken(): Promise<AccessToken> {
        const token = await this.cache.getOrCreate<AccessToken>("spotify-sdk:token", async () => {
            const token = await this.useBrowserAutomationToGetToken();
            const expires = Date.now() + (token.expires_in * 1000);
            return { ...token, expires };
        });

        return token;
    }

    private async useBrowserAutomationToGetToken(): Promise<AccessToken> {
        const verifier = AccessTokenHelpers.generateCodeVerifier(128);
        const challenge = await AccessTokenHelpers.generateCodeChallenge(verifier);

        const location = await super.generateRedirectUrlForUser(this.scopes, challenge);

        // Redirect to Spotify auth page using playwright
        const browser = await playwright.chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(location);
        await page.waitForSelector('input[id="login-username"]');

        // Fill in the email and password
        await page.fill('input[id="login-username"]', this.email);
        await page.fill('input[id="login-password"]', this.password);
        await page.click('button[id="login-button"]');

        await page.waitForSelector('button[data-testid="auth-accept"]');

        let capturedUrl = "";
        try {
            await page.click('button[data-testid="auth-accept"]');
            await page.waitForRequest(r => {
                const url = r.url();
                capturedUrl = url;
                return url.includes("http://localhost:3000");
            });
        } catch (e) {
            console.log(capturedUrl, e);
        }

        const url = new URL(capturedUrl);
        const hashParams = new URLSearchParams(url.searchParams);
        const code = hashParams.get("code");

        // Close the browser
        await browser.close();

        // Exchange the code for a token
        const token = await this.exchangeCodeForToken(code!, verifier);
        return token;
    }
}
