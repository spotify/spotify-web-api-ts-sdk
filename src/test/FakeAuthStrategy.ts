import IAuthStrategy from "../auth/IAuthStrategy";

export class FakeAuthStrategy implements IAuthStrategy {
    public static FAKE_AUTH_TOKEN = "fake-auth-token";
    private promiseToResolve: Promise<string | null>;
    private res: any;

    private returnedToken;

    constructor(autoResolve: boolean = true, returnedToken: string = FakeAuthStrategy.FAKE_AUTH_TOKEN) {

        this.returnedToken = returnedToken;

        this.promiseToResolve = new Promise((res, rej) => {
            this.res = res;
            if (autoResolve) {
                res(this.returnedToken);
            }
        });
    }

    public setConfiguration(configuration: SdkConfiguration): void {
    }

    public getAccessToken(): Promise<string | null> {
        return this.promiseToResolve;
    }

    public fakeAuthed() {
        this.res(this.returnedToken);
    }
}
