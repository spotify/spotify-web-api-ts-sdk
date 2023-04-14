export default interface IAuthStrategy {
    setConfiguration(configuration: SdkConfiguration): void;
    getAccessToken(): Promise<string | null>;
}
