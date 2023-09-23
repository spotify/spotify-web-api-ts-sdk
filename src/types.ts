// Configuration types

export type RequestImplementation = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export interface SdkOptions {
    fetch?: RequestImplementation;
    beforeRequest?: (url: string, options: RequestInit) => void;
    afterRequest?: (url: string, options: RequestInit, response: Response) => void;
    deserializer?: IResponseDeserializer;
    responseValidator?: IValidateResponses;
    errorHandler?: IHandleErrors;
    redirectionStrategy?: IRedirectionStrategy;
    cachingStrategy?: ICachingStrategy;
}

export interface AuthenticationResponse {
    authenticated: boolean;
    accessToken: AccessToken;
}

export interface SdkConfiguration extends SdkOptions {
    fetch: RequestImplementation;
    beforeRequest: (url: string, options: RequestInit) => void;
    afterRequest: (url: string, options: RequestInit, response: Response) => void;
    deserializer: IResponseDeserializer;
    responseValidator: IValidateResponses;
    errorHandler: IHandleErrors;
    redirectionStrategy: IRedirectionStrategy;
    cachingStrategy: ICachingStrategy;
}

export interface IRedirectionStrategy {
    redirect(targetUrl: string | URL): Promise<void>;
    onReturnFromRedirect(): Promise<void>;
}

export interface IHandleErrors {
    handleErrors(error: any): Promise<boolean>;
}

export interface IValidateResponses {
    validateResponse: (response: Response) => Promise<any | null>;
}

export interface IResponseDeserializer {
    deserialize<TReturnType>(response: Response): Promise<TReturnType>;
}

export interface ICachingStrategy {
    getOrCreate<T>(
        cacheKey: string,
        createFunction: () => Promise<T & ICachable & object>,
        updateFunction?: (item: T) => Promise<T & ICachable & object>
    ): Promise<T & ICachable>;

    get<T>(cacheKey: string): Promise<T & ICachable | null>;
    setCacheItem<T>(cacheKey: string, item: T & ICachable): void;
    remove(cacheKey: string): void;
}

export interface ICachable {
    expires?: number;
    expiresOnAccess?: boolean;
}

// API return types

export type MaxInt<T extends number> = number extends T ? number : _Range<T, []>;
export type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] | T : _Range<T, [R['length'], ...R]>;

export type ItemTypes = 'artist' | 'album' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook';
export type Market = "AD" | "AE" | "AG" | "AL" | "AM" | "AO" | "AR" | "AT" | "AU" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BN" | "BO" | "BR" | "BS" | "BT" | "BW" | "BY" | "BZ" | "CA" | "CD" | "CG" | "CH" | "CI" | "CL" | "CM" | "CO" | "CR" | "CV" | "CW" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "ES" | "ET" | "FI" | "FJ" | "FM" | "FR" | "GA" | "GB" | "GD" | "GE" | "GH" | "GM" | "GN" | "GQ" | "GR" | "GT" | "GW" | "GY" | "HK" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IN" | "IQ" | "IS" | "IT" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KR" | "KW" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MG" | "MH" | "MK" | "ML" | "MN" | "MO" | "MR" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NE" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NZ" | "OM" | "PA" | "PE" | "PG" | "PH" | "PK" | "PL" | "PS" | "PT" | "PW" | "PY" | "QA" | "RO" | "RS" | "RW" | "SA" | "SB" | "SC" | "SE" | "SG" | "SI" | "SK" | "SL" | "SM" | "SN" | "SR" | "ST" | "SV" | "SZ" | "TD" | "TG" | "TH" | "TJ" | "TL" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "US" | "UY" | "UZ" | "VC" | "VE" | "VN" | "VU" | "WS" | "XK" | "ZA" | "ZM" | "ZW";
export type CountryCodeA2 = 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';


export type {
    RecommendationsRequest,
    RecommendationsRequestRequiredArguments,
    RecommendationsResponse,
    RecommendationSeed,
} from './endpoints/RecommendationsEndpoints';

export type QueryAdditionalTypes = ['episode'];
export type TrackItem = Track | Episode;

export interface AccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    expires?: number;
}

interface AlbumBase {
    album_type: string
    available_markets: string[]
    copyrights: Copyright[]
    external_ids: ExternalIds
    external_urls: ExternalUrls
    genres: string[]
    href: string
    id: string
    images: Image[]
    label: string
    name: string
    popularity: number
    release_date: string
    release_date_precision: string
    restrictions?: Restrictions
    total_tracks: number
    type: string
    uri: string
}

export interface SimplifiedAlbum extends AlbumBase {
    album_group: string
    artists: SimplifiedArtist[]
}

export interface SavedAlbum {
    added_at: string
    album: Album
}

export interface Album extends AlbumBase {
    artists: Artist[]
    tracks: Page<SimplifiedTrack>
}

export interface Albums {
    albums: Album[]
}

export interface NewReleases {
    albums: Page<SimplifiedAlbum>
}

export interface Copyright {
    text: string
    type: string
}

export interface ExternalIds {
    upc: string
}

export interface Page<TItemType> {
    href: string
    items: TItemType[]
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
}

export interface PlaylistedTrack<Item extends TrackItem = TrackItem> {
    added_at: string
    added_by: AddedBy
    is_local: boolean
    primary_color: string
    track: Item
}

export interface AddedBy {
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}

export interface LinkedFrom {
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}

export interface SimplifiedTrack {
    artists: SimplifiedArtist[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    episode: boolean;
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    name: string
    preview_url: string | null
    track: boolean;
    track_number: number
    type: string
    uri: string
    is_playable?: boolean
    linked_from?: LinkedFrom
    restrictions?: Restrictions
}

export interface SavedTrack {
    added_at: string
    track: Track
}

export interface ExternalIds {
    isrc: string
    ean: string
    upc: string
}

export interface Track extends SimplifiedTrack {
    album: SimplifiedAlbum
    external_ids: ExternalIds
    popularity: number
}

export interface Tracks {
    tracks: Track[]
}

export interface SimplifiedArtist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

export interface Artist extends SimplifiedArtist {
    followers: Followers
    genres: string[]
    images: Image[]
    popularity: number
}

export interface Artists {
    artists: Artist[]
}

export interface FollowedArtists {
    artists: Page<Artist>
}

export interface Followers {
    href: string | null
    total: number
}

export interface ExternalUrls {
    spotify: string
}


interface ResourceTypeToResultKey {
    album: 'albums'
    artist: 'artists'
    track: 'tracks'
    playlist: 'playlists'
    show: 'shows'
    episode: 'episodes'
    audiobook: 'audiobooks'
}

interface SearchResultsMap {
    album: SimplifiedAlbum
    artist: Artist
    track: Track
    playlist: PlaylistBase
    show: SimplifiedShow
    episode: SimplifiedEpisode
    audiobook: SimplifiedAudiobook
}

export type PartialSearchResult = {
    [K in ItemTypes as ResourceTypeToResultKey[K]]?: Page<K extends keyof SearchResultsMap ? SearchResultsMap[K] : any>
}

/**
 * Makes all properties in SearchResults optional, unless the type T is a tuple (literal array / tuple) of SearchTypes.
 */
export type SearchResults<T extends readonly ItemTypes[]> = Pick<PartialSearchResult, ResourceTypeToResultKey[T[number]]> extends infer R
    ? number extends T['length']
        ? R
        : Required<R>
    : never

export interface ArtistSearchResult {
    href: string;
    items: ArtistSearchResultItem[];
}

export interface ArtistSearchResultItem {
    id: string;
    name: string;
    popularity: number;
    genres: string[];
}

export interface TopTracksResult {
    tracks: Track[];
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface SimplifiedAudiobook {
    authors: Author[]
    available_markets: string[]
    copyrights: Copyright[]
    description: string
    edition: string
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    html_description: string
    id: string
    images: Image[]
    languages: string[]
    media_type: string
    name: string
    narrators: Narrator[]
    publisher: string
    total_chapters: number
    type: string
    uri: string
}

export interface Audiobook extends SimplifiedAudiobook {
    chapters: Page<SimplifiedChapter>
}

export interface Audiobooks {
    audiobooks: Audiobook[]
}

export interface Categories {
    categories: Page<Category>
}

export interface Episodes {
    episodes: Episode[]
}

export interface Genres {
    genres: string[]
}

export interface Markets {
    markets: string[]
}

export interface Shows {
    shows: Show[]
}

export interface Category {
    href: string
    icons: Icon[]
    id: string
    name: string
}

export interface Icon {
    height?: number
    url: string
    width?: number
}

export interface Author {
    name: string
}

export interface SimplifiedChapter {
    id: string
    description: string
    chapter_number: number
    duration_ms: number
    explicit: boolean
    images: Image[]
    languages: string[]
    name: string
    audio_preview_url: string
    release_date: string
    release_date_precision: string
    resume_point: ResumePoint
    html_description: string
    available_markets: Market[]
    type: string
    uri: string
    external_urls: ExternalUrls
    href: string
    is_playable: boolean
    restrictions?: Restrictions
}

export interface Chapters {
    chapters: Chapter[];
}

export interface Chapter extends SimplifiedChapter {
    audiobook: SimplifiedAudiobook
}

export interface Restrictions {
    reason: string
}

export interface ResumePoint {
    fully_played: boolean
    resume_position_ms: number
}

export interface Narrator {
    name: string
}

export interface SimplifiedEpisode {
    audio_preview_url: string
    description: string
    html_description: string
    duration_ms: number
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    is_externally_hosted: boolean
    is_playable: boolean
    language: string
    languages: string[]
    name: string
    release_date: string
    release_date_precision: string
    resume_point: ResumePoint
    type: string
    uri: string
    restrictions: Restrictions
}

export interface Episode extends SimplifiedEpisode {
    show: SimplifiedShow
}

export interface SavedEpisode {
    added_at: string
    episode: Episode
}

export interface SimplifiedShow {
    available_markets: string[]
    copyrights: Copyright[]
    description: string
    html_description: string
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    is_externally_hosted: boolean
    languages: string[]
    media_type: string
    name: string
    publisher: string
    type: string
    uri: string
    total_episodes: number
}

export interface SavedShow {
    added_at: string
    show: SimplifiedShow
}

export interface Show extends SimplifiedShow {
    episodes: Page<SimplifiedEpisode>
}

export interface SnapshotReference {
    snapshot_id: string
}

interface PlaylistBase {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    name: string
    owner: UserReference
    primary_color: string
    public: boolean
    snapshot_id: string
    type: string
    uri: string
}

export interface Playlist<Item extends TrackItem = TrackItem> extends PlaylistBase {
    tracks: Page<PlaylistedTrack<Item>>
}

export interface FeaturedPlaylists {
    message: string;
    playlists: Page<SimplifiedPlaylist>
}

export interface SimplifiedPlaylist extends PlaylistBase {
    tracks: TrackReference | null
}

export interface TrackReference {
    href: string;
    total: number;
}

export interface UserReference {
    display_name: string
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}

export interface User {
    display_name: string
    email: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    type: string
    uri: string
}

export interface UserProfile extends User {
    country: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    product: string;
}

export interface AudioFeatures {
    danceability: number
    energy: number
    key: number
    loudness: number
    mode: number
    speechiness: number
    acousticness: number
    instrumentalness: number
    liveness: number
    valence: number
    tempo: number
    type: string
    id: string
    uri: string
    track_href: string
    analysis_url: string
    duration_ms: number
    time_signature: number
}

export interface AudioFeaturesCollection {
    audio_features: AudioFeatures[]
}

export interface AudioAnalysis {
    meta: Meta
    track: TrackAnalysis
    bars: Bar[]
    beats: Beat[]
    sections: Section[]
    segments: Segment[]
    tatums: Tatum[]
}

export interface Meta {
    analyzer_version: string
    platform: string
    detailed_status: string
    status_code: number
    timestamp: number
    analysis_time: number
    input_process: string
}

export interface TrackAnalysis {
    num_samples: number
    duration: number
    sample_md5: string
    offset_seconds: number
    window_seconds: number
    analysis_sample_rate: number
    analysis_channels: number
    end_of_fade_in: number
    start_of_fade_out: number
    loudness: number
    tempo: number
    tempo_confidence: number
    time_signature: number
    time_signature_confidence: number
    key: number
    key_confidence: number
    mode: number
    mode_confidence: number
    codestring: string
    code_version: number
    echoprintstring: string
    echoprint_version: number
    synchstring: string
    synch_version: number
    rhythmstring: string
    rhythm_version: number
}

export interface Bar {
    start: number
    duration: number
    confidence: number
}

export interface Beat {
    start: number
    duration: number
    confidence: number
}

export interface Section {
    start: number
    duration: number
    confidence: number
    loudness: number
    tempo: number
    tempo_confidence: number
    key: number
    key_confidence: number
    mode: number
    mode_confidence: number
    time_signature: number
    time_signature_confidence: number
}

export interface Segment {
    start: number
    duration: number
    confidence: number
    loudness_start: number
    loudness_max: number
    loudness_max_time: number
    loudness_end: number
    pitches: number[]
    timbre: number[]
}

export interface Tatum {
    start: number
    duration: number
    confidence: number
}

export interface PlaybackState {
    device: Device
    repeat_state: string
    shuffle_state: boolean
    context: Context | null
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: TrackItem
    currently_playing_type: string
    actions: Actions
}

export interface Device {
    id: string | null
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number | null
}

export interface Devices {
    devices: Device[]
}

export interface Context {
    type: string
    href: string
    external_urls: ExternalUrls
    uri: string
}

export interface Actions {
    interrupting_playback?: boolean
    pausing?: boolean
    resuming?: boolean
    seeking?: boolean
    skipping_next?: boolean
    skipping_prev?: boolean
    toggling_repeat_context?: boolean
    toggling_shuffle?: boolean
    toggling_repeat_track?: boolean
    transferring_playback?: boolean
}

export interface RecentlyPlayedTracksPage {
    href: string
    limit: number
    next: string | null
    cursors: {
        after: string
        before: string
    }
    total: number
    items: PlayHistory[]
}

export interface PlayHistory {
    track: Track
    played_at: string
    context: Context
}

export interface Queue {
    currently_playing: TrackItem | null
    queue: TrackItem[]
}
