import AlbumsEndpoints from "./endpoints/AlbumsEndpoints";
import ArtistsEndpoints from "./endpoints/ArtistsEndpoints";
import AudiobooksEndpoints from "./endpoints/AudiobooksEndpoints";
import BrowseEndpoints from "./endpoints/BrowseEndpoints";
import ChaptersEndpoints from "./endpoints/ChaptersEndpoints";
import EpisodesEndpoints from "./endpoints/EpisodesEndpoints";
import RecommendationsEndpoints from "./endpoints/RecommendationsEndpoints";
import MarketsEndpoints from "./endpoints/MarketsEndpoints";
import PlayerEndpoints from "./endpoints/PlayerEndpoints";
import PlaylistsEndpoints from "./endpoints/PlaylistsEndpoints";
import SearchEndpoints, { SearchExecutionFunction } from "./endpoints/SearchEndpoints";
import ShowsEndpoints from "./endpoints/ShowsEndpoints";
import TracksEndpoints from "./endpoints/TracksEndpoints";
import IAuthStrategy from "./auth/IAuthStrategy";
import UsersEndpoints from "./endpoints/UsersEndpoints";
import CurrentUserEndpoints from "./endpoints/CurrentUserEndpoints";
import ClientCredentialsStrategy from "./auth/ClientCredentialsStrategy";
import ImplicitGrantStrategy from "./auth/ImplicitGrantStrategy";
import AuthorizationCodeWithPKCEStrategy from "./auth/AuthorizationCodeWithPKCEStrategy";
import DefaultResponseDeserializer from "./serialization/DefaultResponseDeserializer";
import DefaultResponseValidator from "./responsevalidation/DefaultResponseValidator";
import NoOpErrorHandler from "./errorhandling/NoOpErrorHandler";
import DocumentLocationRedirectionStrategy from "./redirection/DocumentLocationRedirectionStrategy";
import LocalStorageCachingStrategy from "./caching/LocalStorageCachingStrategy";

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
        this.sdkConfig = this.initilizeSdk(config);

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

    public async makeRequest<TReturnType>(method: "GET" | "POST" | "PUT" | "DELETE", url: string, body: any = undefined): Promise<TReturnType> {
        try {
            const token = await this.authenticationStrategy.getAccessToken();

            const fullUrl = SpotifyApi.rootUrl + url;
            const opts: RequestInit = {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: body ? JSON.stringify(body) : undefined
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

    private initilizeSdk(config: SdkOptions | undefined): SdkConfiguration {
        const defaultConfig: SdkConfiguration = {
            fetch: (req: RequestInfo | URL, init: RequestInit | undefined) => fetch(req, init),
            beforeRequest: (_: string, __: RequestInit) => { },
            afterRequest: (_: string, __: RequestInit, ___: Response) => { },
            deserializer: new DefaultResponseDeserializer(),
            responseValidator: new DefaultResponseValidator(),
            errorHandler: new NoOpErrorHandler(),
            redirectionStrategy: new DocumentLocationRedirectionStrategy(),
            cachingStrategy: new LocalStorageCachingStrategy()
        };

        return { ...defaultConfig, ...config };
    }

    public switchAuthenticationStrategy(authentication: IAuthStrategy) {
        this.authenticationStrategy = authentication;
        this.authenticationStrategy.setConfiguration(this.sdkConfig);
        this.authenticationStrategy.getAccessToken(); // trigger any redirects 
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
}
