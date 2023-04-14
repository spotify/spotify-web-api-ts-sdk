// Configuration types

type RequestImplementation = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

interface SdkOptions {
    fetch?: RequestImplementation;
    beforeRequest?: (url: string, options: RequestInit) => void;
    afterRequest?: (url: string, options: RequestInit, response: Response) => void;
    deserializer?: IResponseDeserializer;
    responseValidator?: IValidateResponses;
    errorHandler?: IHandleErrors;
    redirectionStrategy?: IRedirectionStrategy;
    cachingStrategy?: ICachingStrategy;
}

interface SdkConfiguration extends SdkOptions {
    fetch: RequestImplementation;
    beforeRequest: (url: string, options: RequestInit) => void;
    afterRequest: (url: string, options: RequestInit, response: Response) => void;
    deserializer: IResponseDeserializer;
    responseValidator: IValidateResponses;
    errorHandler: IHandleErrors;
    redirectionStrategy: IRedirectionStrategy;
    cachingStrategy: ICachingStrategy;
}

interface IRedirectionStrategy {
    redirect(targetUrl: string | URL): Promise<void>;
    onReturnFromRedirect(): Promise<void>;
}

interface IHandleErrors {
    handleErrors(error: any): Promise<boolean>;
}

interface IValidateResponses {
    validateResponse: (response: Response) => Promise<any | null>;
}

interface IResponseDeserializer {
    deserialize<TReturnType>(response: Response): Promise<TReturnType>;
}

interface ICachingStrategy {
    getOrCreate<T>(
        cacheKey: string,
        createFunction: () => Promise<T & ICachable & object>,
        updateFunction?: (item: T) => Promise<T & ICachable & object>
    ): Promise<T & ICachable>;

    get<T>(cacheKey: string): Promise<T & ICachable | null>;
    setCacheItem<T>(cacheKey: string, item: T & ICachable): void;
    remove(cacheKey: string): void;
}

interface ICachable {
    expires?: number;
    expiresOnAccess?: boolean;
}

// API return types

type MaxInt<T extends number> = number extends T ? number : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R['length'] extends T ? R[number] : _Range<T, [R['length'], ...R]>;

type ItemTypes = 'artist' | 'album' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook';
type Market = "AD" | "AE" | "AG" | "AL" | "AM" | "AO" | "AR" | "AT" | "AU" | "AZ" | "BA" | "BB" | "BD" | "BE" | "BF" | "BG" | "BH" | "BI" | "BJ" | "BN" | "BO" | "BR" | "BS" | "BT" | "BW" | "BY" | "BZ" | "CA" | "CD" | "CG" | "CH" | "CI" | "CL" | "CM" | "CO" | "CR" | "CV" | "CW" | "CY" | "CZ" | "DE" | "DJ" | "DK" | "DM" | "DO" | "DZ" | "EC" | "EE" | "EG" | "ES" | "ET" | "FI" | "FJ" | "FM" | "FR" | "GA" | "GB" | "GD" | "GE" | "GH" | "GM" | "GN" | "GQ" | "GR" | "GT" | "GW" | "GY" | "HK" | "HN" | "HR" | "HT" | "HU" | "ID" | "IE" | "IL" | "IN" | "IQ" | "IS" | "IT" | "JM" | "JO" | "JP" | "KE" | "KG" | "KH" | "KI" | "KM" | "KN" | "KR" | "KW" | "KZ" | "LA" | "LB" | "LC" | "LI" | "LK" | "LR" | "LS" | "LT" | "LU" | "LV" | "LY" | "MA" | "MC" | "MD" | "ME" | "MG" | "MH" | "MK" | "ML" | "MN" | "MO" | "MR" | "MT" | "MU" | "MV" | "MW" | "MX" | "MY" | "MZ" | "NA" | "NE" | "NG" | "NI" | "NL" | "NO" | "NP" | "NR" | "NZ" | "OM" | "PA" | "PE" | "PG" | "PH" | "PK" | "PL" | "PS" | "PT" | "PW" | "PY" | "QA" | "RO" | "RS" | "RW" | "SA" | "SB" | "SC" | "SE" | "SG" | "SI" | "SK" | "SL" | "SM" | "SN" | "SR" | "ST" | "SV" | "SZ" | "TD" | "TG" | "TH" | "TJ" | "TL" | "TN" | "TO" | "TR" | "TT" | "TV" | "TW" | "TZ" | "UA" | "UG" | "US" | "UY" | "UZ" | "VC" | "VE" | "VN" | "VU" | "WS" | "XK" | "ZA" | "ZM" | "ZW";
type CountryCodeA2 = 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';


interface AccessToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
}

interface Album {
    album_group: string
    album_type: string
    artists: ArtistReference[]
    available_markets: string[]
    copyrights: Copyright[]
    external_ids: ExternalIds
    external_urls: ExternalUrls
    genres: any[]
    href: string
    id: string
    images: Image[]
    label: string
    name: string
    popularity: number
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string

}

interface SavedAlbum {
    added_at: string
    album: AlbumWithTracks
}

interface AlbumWithTracks extends Album {
    tracks: Page<Track>
}

interface Albums {
    albums: AlbumWithTracks[]
}

interface NewReleases {
    albums: Page<AlbumWithTracks>
}

interface Copyright {
    text: string
    type: string
}

interface ExternalIds {
    upc: string
}

interface Page<TItemType> {
    href: string
    items: TItemType[]
    limit: number
    next: any
    offset: number
    previous: any
    total: number
}

interface PlaylistedTrack {
    added_at: string
    added_by: AddedBy
    is_local: boolean
    primary_color: any
    track: TrackWithAlbum
}

interface AddedBy {
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}

interface Track {
    artists: ArtistReference[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    name: string
    preview_url: string
    track_number: number
    type: string
    uri: string
}

interface TrackWithAlbum extends Track {
    album: Album
}

interface Tracks {
    tracks: TrackWithAlbum[]
}

interface ArtistReference {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

interface Artist {
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

interface Artists {
    artists: Artist[]
}

interface FollowedArtists {
    artists: Page<Artist>
}

interface Followers {
    href: any
    total: number
}

interface ExternalUrls {
    spotify: string
}

interface SearchResults {
    tracks: Page<Track>
    artists: Page<Artist>
    albums: Page<Album>
    playlists: Page<Playlist>
    shows: Page<Show>
    episodes: Page<Episode>
    audiobooks: Page<AudiobookWithChapters>
}

interface ArtistSearchResult {
    href: string;
    items: ArtistSearchResultItem[];
}

interface ArtistSearchResultItem {
    id: string;
    name: string;
    popularity: number;
    genres: string[];
}

interface TopTracksResult {
    tracks: Track[];
}

interface UserResponse {
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

interface Image {
    url: string;
    height: number;
    width: number;
}

interface PlaylistCreationResult {
    id: string;
    name: string;
    href: string;
    external_urls: ExternalUrls;
}

interface Audiobook {
    authors: Author[]
    available_markets: string[]
    copyrights: any[]
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

interface AudiobookWithChapters extends Audiobook {
    chapters: Page<Chapter>
}

interface Audiobooks {
    audiobooks: AudiobookWithChapters[]
}

interface Categories {
    categories: Page<Category>
}

interface Episodes {
    episodes: Episode[]
}

interface Genres {
    genres: string[]
}

interface Markets {
    markets: string[]
}

interface Shows {
    shows: ShowWithEpisodes[]
}

interface Category {
    href: string
    icons: Icon[]
    id: string
    name: string
}

interface Icon {
    height?: number
    url: string
    width?: number
}

interface Author {
    name: string
}

interface Chapter {
    id: string
    description: string
    chapter_number: number
    duration_ms: number
    explicit: boolean
    images: Image[]
    languages: string[]
    name: string
    audio_preview_url: any
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

interface Chapters {
    chapters: ChapterWithAudiobookAndRestrictions[];
}

interface ChapterWithAudiobookAndRestrictions extends Chapter {
    restrictions?: Restrictions
    audiobook: Audiobook
}

interface Restrictions {
    reason: string
}

interface ResumePoint {
    fully_played: boolean
    resume_position_ms: number
}

interface Narrator {
    name: string
}

interface Episode {
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

    // If fetched from Episode API, show included
    show?: Show
}

interface Show {
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

interface ShowWithEpisodes extends Show {
    episodes: Page<Episode>
}

interface SnapshotReference {
    snapshot_id: string
}

interface Playlist {
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

interface PlaylistWithTracks extends Playlist {
    tracks: Page<PlaylistedTrack>
}

interface PlaylistsWithTrackReferences {
    message: string;
    playlists: Page<PlaylistWithTrackReferences>
}

interface PlaylistWithTrackReferences extends Playlist {
    tracks: TrackReference
}

interface TrackReference {
    href: string;
    total: number;
}

interface UserReference {
    display_name: string
    external_urls: ExternalUrls
    href: string
    id: string
    type: string
    uri: string
}

interface User {
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

interface AudioFeatures {
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

interface AudioFeaturesCollection {
    audio_features: AudioFeatures[]
}

interface AudioAnalysis {
    meta: Meta
    track: TrackAnalysis
    bars: Bar[]
    beats: Beat[]
    sections: Section[]
    segments: Segment[]
    tatums: Tatum[]
}

interface Meta {
    analyzer_version: string
    platform: string
    detailed_status: string
    status_code: number
    timestamp: number
    analysis_time: number
    input_process: string
}

interface TrackAnalysis {
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

interface Bar {
    start: number
    duration: number
    confidence: number
}

interface Beat {
    start: number
    duration: number
    confidence: number
}

interface Section {
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

interface Segment {
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

interface Tatum {
    start: number
    duration: number
    confidence: number
}
