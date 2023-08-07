import type { AccessToken, SdkConfiguration } from "../types.js";

export const emptyAccessToken: AccessToken = { access_token: "emptyAccessToken", token_type: "", expires_in: 0, refresh_token: "", expires: -1 };
export function isEmptyAccessToken(value: any): boolean {
    return value === emptyAccessToken;
}

export default interface IAuthStrategy {
    setConfiguration(configuration: SdkConfiguration): void;
    getOrCreateAccessToken(): Promise<AccessToken>;
    getAccessToken(): Promise<AccessToken | null>;
    removeAccessToken(): void;
}
