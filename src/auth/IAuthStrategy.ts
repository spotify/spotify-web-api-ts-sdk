import type { AccessToken, SdkConfiguration } from "../types.js";

export const emptyAccessToken: AccessToken = { access_token: "", token_type: "", expires_in: 0, refresh_token: "" };

export default interface IAuthStrategy {
    setConfiguration(configuration: SdkConfiguration): void;
    getAccessToken(): Promise<AccessToken>;
}
