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
export type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;

export type ItemTypes = 'artist' | 'album' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook';
export type Market = "AD" | "AE" | "AG" | "AL" | "AM" | "AO" | "AR" | "AT" | "AU" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BN" | "BO" | "BR" | "BS" | "BT" | "BW" | "BY" | "BZ" | "CA" | "CD" | "CG" | "CH" | "CI" | "CL" | "CM" | "CO" | "CR" | "CV" | "CW" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "ES" | "ET" | "FI" | "FJ" | "FM" | "FR" | "GA" | "GB" | "GD" | "GE" | "GH" | "GM" | "GN" | "GQ" | "GR" | "GT" | "GW" | "GY" | "HK" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IN" | "IQ" | "IS" | "IT" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KR" | "KW" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MG" | "MH" | "MK" | "ML" | "MN" | "MO" | "MR" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NE" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NZ" | "OM" | "PA" | "PE" | "PG" | "PH" | "PK" | "PL" | "PS" | "PT" | "PW" | "PY" | "QA" | "RO" | "RS" | "RW" | "SA" | "SB" | "SC" | "SE" | "SG" | "SI" | "SK" | "SL" | "SM" | "SN" | "SR" | "ST" | "SV" | "SZ" | "TD" | "TG" | "TH" | "TJ" | "TL" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "US" | "UY" | "UZ" | "VC" | "VE" | "VN" | "VU" | "WS" | "XK" | "ZA" | "ZM" | "ZW";
export type CountryCodeA2 = 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';


export interface AccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
}

interface AlbumBase {
    album_type: string
    total_tracks: number
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    restrictions?: Restrictions
    type: string
    uri: string
    copyrights: Copyright[]
    external_ids: ExternalIds
    genres: string[]
    label: string
    popularity: number
}

export interface Album extends AlbumBase {
    artists: Artist[]
    tracks: Page<SimplifiedTrack>
}

export interface SimplifiedAlbum extends AlbumBase {
    album_group: string
    artists: SimplifiedArtist[]
}

export interface SavedAlbum {
    added_at: string
    album: Album
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

export interface PlaylistTrack {
    added_at: string
    added_by: AddedBy
    is_local: boolean
    track: Track | Episode
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
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    id: string
    is_playable?: boolean
    linked_from?: LinkedFrom
    restrictions?: Restrictions
    name: string
    preview_url: string
    track_number: number
    type: string
    uri: string
    is_local: boolean
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

export interface Artist {
    external_urls: ExternalUrls
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image[]
    name: string
    popularity: number
    type: string
    uri: string
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

export interface SearchResults {
    tracks: Page<Track>
    artists: Page<Artist>
    albums: Page<SimplifiedAlbum>
    // TODO: simplified from here down
    // https://developer.spotify.com/documentation/web-api/reference/search
    playlists: Page<Playlist>
    shows: Page<Show>
    episodes: Page<SimplifiedEpisode>
    audiobooks: Page<AudiobookWithChapters>
}

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

export interface UserResponse {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: ExternalUrls;
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

export interface Image {
    url: string;
    height: number;
    width: number;
}

export interface PlaylistCreationResult {
    id: string;
    name: string;
    href: string;
    external_urls: ExternalUrls;
}

export interface Audiobook {
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

export interface AudiobookWithChapters extends Audiobook {
    chapters: Page<Chapter>
}

export interface Audiobooks {
    audiobooks: AudiobookWithChapters[]
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
    shows: ShowWithEpisodes[]
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

export interface Chapter {
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
}

export interface Chapters {
    chapters: ChapterWithAudiobookAndRestrictions[];
}

export interface ChapterWithAudiobookAndRestrictions extends Chapter {
    restrictions?: Restrictions
    audiobook: Audiobook
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
    show: Show
}

export interface SavedEpisode {
    added_at: string
    episode: Episode
}

export interface Show {
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
    show: Show
}

export interface ShowWithEpisodes extends Show {
    episodes: Page<SimplifiedEpisode>
}

export interface SnapshotReference {
    snapshot_id: string
}

export interface Playlist {
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

export interface PlaylistWithTracks extends Playlist {
    tracks: Page<PlaylistTrack>
}

export interface PlaylistsWithTrackReferences {
    message: string;
    playlists: Page<PlaylistWithTrackReferences>
}

export interface PlaylistWithTrackReferences extends Playlist {
    tracks: TrackReference
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
