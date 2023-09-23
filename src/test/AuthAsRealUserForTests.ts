import playwright from "playwright";
import AuthorizationCodeWithPKCEStrategy from "../auth/AuthorizationCodeWithPKCEStrategy";
import AccessTokenHelpers from "../auth/AccessTokenHelpers";
import type { AccessToken } from "../types";

export default class AuthAsSpecificUserForTests extends AuthorizationCodeWithPKCEStrategy {
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

    public async getOrCreateAccessToken(): Promise<AccessToken> {
        if (AuthAsSpecificUserForTests.memoryCachedTokens.has(this.cacheKey)) {
            return AuthAsSpecificUserForTests.memoryCachedTokens.get(this.cacheKey)!;
        }

        const token = await this.useBrowserAutomationToGetToken();
        AuthAsSpecificUserForTests.memoryCachedTokens.set(this.cacheKey, token);
        return token;
    }

    private async useBrowserAutomationToGetToken(): Promise<AccessToken> {
        const verifier = AccessTokenHelpers.generateCodeVerifier(128);
        const challenge = await AccessTokenHelpers.generateCodeChallenge(verifier);

        const location = await super.generateRedirectUrlForUser(this.scopes, challenge);

        // Redirect to Spotify auth page using playwright
        const browser = await playwright.chromium.launch({
            headless: AuthAsSpecificUserForTests.headless
        });

        const context = await browser.newContext({
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
        });

        const page = await context.newPage();
        page.setViewportSize({ width: 1024, height: 2000 });

        await page.goto(location);
        await page.waitForSelector('input[id="login-username"]');

        await page.fill('input[id="login-username"]', this.email);
        await page.fill('input[id="login-password"]', this.password);

        // Wait for between 1-3 seconds
        await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);

        await page.waitForSelector('button[id="login-button"]',);
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
