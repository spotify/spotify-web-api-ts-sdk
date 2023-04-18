import playwright from "playwright";
import AuthorizationCodeWithPKCEStrategy from "../auth/AuthorizationCodeWithPKCEStrategy";
import AccessTokenHelpers from "../auth/AccessTokenHelpers";
import type { AccessToken } from "../types";

export default class AuthAsSpecifcUserForTests extends AuthorizationCodeWithPKCEStrategy {
    private static headless = true;
    private static memoryCachedTokens: Map<string, AccessToken> = new Map();
    private cacheKey: string;

    constructor(
        protected clientId: string,
        protected scopes: string[],
        private email: string,
        private password: string
    ) {
        super(clientId, "http://localhost:3000", scopes);
        this.cacheKey = `test-user-${email}`;
    }

    public async getAccessToken(): Promise<AccessToken> {
        if (AuthAsSpecifcUserForTests.memoryCachedTokens.has(this.cacheKey)) {
            return AuthAsSpecifcUserForTests.memoryCachedTokens.get(this.cacheKey)!;
        }

        const token = await this.useBrowserAutomationToGetToken();
        AuthAsSpecifcUserForTests.memoryCachedTokens.set(this.cacheKey, token);
        return token;
    }

    private async useBrowserAutomationToGetToken(): Promise<AccessToken> {
        const verifier = AccessTokenHelpers.generateCodeVerifier(128);
        const challenge = await AccessTokenHelpers.generateCodeChallenge(verifier);

        const location = await super.generateRedirectUrlForUser(this.scopes, challenge);

        // Redirect to Spotify auth page using playwright
        const browser = await playwright.chromium.launch({ headless: AuthAsSpecifcUserForTests.headless });
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
        return await this.exchangeCodeForToken(code!, verifier);
    }
}
