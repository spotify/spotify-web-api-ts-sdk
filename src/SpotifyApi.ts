import AlbumsEndpoints from "./endpoints/AlbumsEndpoints.js";
import ArtistsEndpoints from "./endpoints/ArtistsEndpoints.js";
import AudiobooksEndpoints from "./endpoints/AudiobooksEndpoints.js";
import BrowseEndpoints from "./endpoints/BrowseEndpoints.js";
import ChaptersEndpoints from "./endpoints/ChaptersEndpoints.js";
import EpisodesEndpoints from "./endpoints/EpisodesEndpoints.js";
import RecommendationsEndpoints from "./endpoints/RecommendationsEndpoints.js";
import MarketsEndpoints from "./endpoints/MarketsEndpoints.js";
import PlayerEndpoints from "./endpoints/PlayerEndpoints.js";
import PlaylistsEndpoints from "./endpoints/PlaylistsEndpoints.js";
import SearchEndpoints, { SearchExecutionFunction } from "./endpoints/SearchEndpoints.js";
import ShowsEndpoints from "./endpoints/ShowsEndpoints.js";
import TracksEndpoints from "./endpoints/TracksEndpoints.js";
import IAuthStrategy, { isEmptyAccessToken } from "./auth/IAuthStrategy.js";
import UsersEndpoints from "./endpoints/UsersEndpoints.js";
import CurrentUserEndpoints from "./endpoints/CurrentUserEndpoints.js";
import ClientCredentialsStrategy from "./auth/ClientCredentialsStrategy.js";
import ImplicitGrantStrategy from "./auth/ImplicitGrantStrategy.js";
import AuthorizationCodeWithPKCEStrategy from "./auth/AuthorizationCodeWithPKCEStrategy.js";
import DefaultResponseDeserializer from "./serialization/DefaultResponseDeserializer.js";
import DefaultResponseValidator from "./responsevalidation/DefaultResponseValidator.js";
import NoOpErrorHandler from "./errorhandling/NoOpErrorHandler.js";
import DocumentLocationRedirectionStrategy from "./redirection/DocumentLocationRedirectionStrategy.js";
import LocalStorageCachingStrategy from "./caching/LocalStorageCachingStrategy.js";
import InMemoryCachingStrategy from "./caching/InMemoryCachingStrategy.js";
import ProvidedAccessTokenStrategy from "./auth/ProvidedAccessTokenStrategy.js";
import type { AccessToken, SdkConfiguration, SdkOptions, AuthenticationResponse } from "./types.js";

export class SpotifyApi {
    private sdkConfig: SdkConfiguration;
    private static rootUrl: string = "https://api.spotify.com/v1/";

    private authenticationStrategy: IAuthStrategy;

    public albums: AlbumsEndpoints;
    public artists: ArtistsEndpoints;
    public audiobooks: AudiobooksEndpoints;
    public browse: BrowseEndpoints;
    public chapters: ChaptersEndpoints;
    public episodes: EpisodesEndpoints;
    public recommendations: RecommendationsEndpoints;
    public markets: MarketsEndpoints;
    public player: PlayerEndpoints;
    public playlists: PlaylistsEndpoints;
    public shows: ShowsEndpoints;
    public tracks: TracksEndpoints;
    public users: UsersEndpoints;
    public search: SearchExecutionFunction;

    public currentUser: CurrentUserEndpoints;

    public constructor(authentication: IAuthStrategy, config?: SdkOptions) {
        this.sdkConfig = this.initializeSdk(config);

        this.albums = new AlbumsEndpoints(this);
        this.artists = new ArtistsEndpoints(this);
        this.audiobooks = new AudiobooksEndpoints(this);
        this.browse = new BrowseEndpoints(this);
        this.chapters = new ChaptersEndpoints(this);
        this.episodes = new EpisodesEndpoints(this);
        this.recommendations = new RecommendationsEndpoints(this);
        this.markets = new MarketsEndpoints(this);
        this.player = new PlayerEndpoints(this);
        this.playlists = new PlaylistsEndpoints(this);
        this.shows = new ShowsEndpoints(this);
        this.tracks = new TracksEndpoints(this);
        this.users = new UsersEndpoints(this);
        this.currentUser = new CurrentUserEndpoints(this);

        const search = new SearchEndpoints(this);
        this.search = search.execute.bind(search);

        this.authenticationStrategy = authentication;
        this.authenticationStrategy.setConfiguration(this.sdkConfig);
    }

    public async makeRequest<TReturnType>(method: "GET" | "POST" | "PUT" | "DELETE", url: string, body: any = undefined, contentType: string | undefined = undefined): Promise<TReturnType> {
        try {
            const accessToken = await this.authenticationStrategy.getOrCreateAccessToken();
            if (isEmptyAccessToken(accessToken)) {
                console.warn("No access token found, authenticating now.");
                return null as TReturnType;
            }

            const token = accessToken?.access_token;

            const fullUrl = SpotifyApi.rootUrl + url;
            const opts: RequestInit = {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": contentType ?? "application/json"
                },
                body: body ? typeof body === "string" ? body : JSON.stringify(body) : undefined
            };

            this.sdkConfig.beforeRequest(fullUrl, opts);
            const result = await this.sdkConfig.fetch(fullUrl, opts);
            this.sdkConfig.afterRequest(fullUrl, opts, result);

            if (result.status === 204) {
                return null as TReturnType;
            }

            await this.sdkConfig.responseValidator.validateResponse(result);
            return this.sdkConfig.deserializer.deserialize<TReturnType>(result);
        } catch (error) {
            const handled = await this.sdkConfig.errorHandler.handleErrors(error);
            if (!handled) {
                throw error;
            }
            return null as TReturnType;
        }
    }

    private initializeSdk(config: SdkOptions | undefined): SdkConfiguration {
        const isBrowser = typeof window !== 'undefined';

        const defaultConfig: SdkConfiguration = {
            fetch: (req: RequestInfo | URL, init: RequestInit | undefined) => fetch(req, init),
            beforeRequest: (_: string, __: RequestInit) => { },
            afterRequest: (_: string, __: RequestInit, ___: Response) => { },
            deserializer: new DefaultResponseDeserializer(),
            responseValidator: new DefaultResponseValidator(),
            errorHandler: new NoOpErrorHandler(),
            redirectionStrategy: new DocumentLocationRedirectionStrategy(),
            cachingStrategy: isBrowser
                ? new LocalStorageCachingStrategy()
                : new InMemoryCachingStrategy()
        };

        return { ...defaultConfig, ...config };
    }

    public switchAuthenticationStrategy(authentication: IAuthStrategy) {
        this.authenticationStrategy = authentication;
        this.authenticationStrategy.setConfiguration(this.sdkConfig);
        this.authenticationStrategy.getOrCreateAccessToken(); // trigger any redirects 
    }

    /**
     * Use this when you're running in a browser and you want to control when first authentication+redirect happens.
    */
    public async authenticate(): Promise<AuthenticationResponse> {
        const response = await this.authenticationStrategy.getOrCreateAccessToken(); // trigger any redirects

        return {
            authenticated: response.expires! > Date.now() && !isEmptyAccessToken(response),
            accessToken: response
        };
    }

    /**
     * @returns the current access token. null implies the SpotifyApi is not yet authenticated.
     */
    public async getAccessToken(): Promise<AccessToken | null> {
        return this.authenticationStrategy.getAccessToken();
    }

    /**
     * Removes the access token if it exists.
     */
    public logOut(): void {
        this.authenticationStrategy.removeAccessToken();
    }

    public static withUserAuthorization(clientId: string, redirectUri: string, scopes: string[] = [], config?: SdkOptions): SpotifyApi {
        const strategy = new AuthorizationCodeWithPKCEStrategy(clientId, redirectUri, scopes);
        return new SpotifyApi(strategy, config);
    }

    public static withClientCredentials(clientId: string, clientSecret: string, scopes: string[] = [], config?: SdkOptions): SpotifyApi {
        const strategy = new ClientCredentialsStrategy(clientId, clientSecret, scopes);
        return new SpotifyApi(strategy, config);
    }

    public static withImplicitGrant(clientId: string, redirectUri: string, scopes: string[] = [], config?: SdkOptions): SpotifyApi {
        const strategy = new ImplicitGrantStrategy(clientId, redirectUri, scopes);
        return new SpotifyApi(strategy, config);
    }

    /**
     * Use this when you're running in a Node environment, and accepting the access token from a client-side `performUserAuthorization` call.
     * You can also use this method if you already have an access token and don't want to use the built-in authentication strategies.
     */
    public static withAccessToken(clientId: string, token: AccessToken, config?: SdkOptions): SpotifyApi {
        const strategy = new ProvidedAccessTokenStrategy(clientId, token);
        return new SpotifyApi(strategy, config);
    }

    /**
     * Use this when you're running in the browser, and want to perform the user authorization flow to post back to your server with the access token.
     * @param clientId Your Spotify client ID
     * @param redirectUri The URI to redirect to after the user has authorized your app
     * @param scopes The scopes to request
     * @param postbackUrl The URL to post the access token to
     * @param config Optional configuration
     */
    public static async performUserAuthorization(clientId: string, redirectUri: string, scopes: string[], postbackUrl: string, config?: SdkOptions): Promise<AuthenticationResponse>;

    /**
     * Use this when you're running in the browser, and want to perform the user authorization flow to post back to your server with the access token.
     * This overload is provided for you to perform the postback yourself, if you want to do something other than a simple HTTP POST to a URL - for example, if you want to use a WebSocket, or provide custom authentication.
     * @param clientId Your Spotify client ID
     * @param redirectUri The URI to redirect to after the user has authorized your app
     * @param scopes The scopes to request
     * @param onAuthorization A function to call with the access token where YOU perform the server-side postback
     * @param config Optional configuration
     */
    public static async performUserAuthorization(clientId: string, redirectUri: string, scopes: string[], onAuthorization: (token: AccessToken) => Promise<void>, config?: SdkOptions): Promise<AuthenticationResponse>;

    public static async performUserAuthorization(clientId: string, redirectUri: string, scopes: string[], onAuthorizationOrUrl: ((token: AccessToken) => Promise<void>) | string, config?: SdkOptions): Promise<AuthenticationResponse> {
        const strategy = new AuthorizationCodeWithPKCEStrategy(clientId, redirectUri, scopes);
        const client = new SpotifyApi(strategy, config);
        const accessToken = await client.authenticationStrategy.getOrCreateAccessToken();

        if (!isEmptyAccessToken(accessToken)) {
            if (typeof onAuthorizationOrUrl === "string") {
                console.log("Posting access token to postback URL.");
                await fetch(onAuthorizationOrUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(accessToken)
                });
            } else {
                await onAuthorizationOrUrl(accessToken);
            }
        }

        return {
            authenticated: accessToken.expires! > Date.now() && !isEmptyAccessToken(accessToken),
            accessToken
        };
    }
}
