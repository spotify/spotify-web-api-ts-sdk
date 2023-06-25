import IAuthStrategy from "../auth/IAuthStrategy";
import type { AccessToken, SdkConfiguration } from "../types";

export class FakeAuthStrategy implements IAuthStrategy {
    public static FAKE_AUTH_TOKEN = "fake-auth-token";
    private promiseToResolve: Promise<AccessToken>;
    private res: any;

    private returnedToken;

    constructor(autoResolve: boolean = true, returnedToken: string = FakeAuthStrategy.FAKE_AUTH_TOKEN) {

        this.returnedToken = {
            access_token: returnedToken
        };

        this.promiseToResolve = new Promise((res, rej) => {
            this.res = res;
            if (autoResolve) {
                res(this.returnedToken);
            }
        });
    }

    public setConfiguration(configuration: SdkConfiguration): void {
    }

    public getAccessToken(): Promise<AccessToken> {
        return this.promiseToResolve;
    }

    public async isAuthenticated(): Promise<boolean> {
        return true;
    }

    public fakeAuthed() {
        this.res(this.returnedToken);
    }
}
