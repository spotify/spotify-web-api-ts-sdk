export class Scopes {

    public static get playlist() {
        return [
            ...Scopes.playlistRead,
            ...Scopes.playlistModify
        ];
    }

    public static get playlistRead() {
        return [
            "playlist-read-private",
            "playlist-read-collaborative",
        ];
    }

    public static get playlistModify() {
        return [
            "playlist-modify-public",
            "playlist-modify-private",
            "ugc-image-upload"
        ];
    }

    public static get userDetails() {
        return [
            "user-read-private",
            "user-read-email",
        ];
    }

    public static get userLibrary() {
        return [
            ...Scopes.userLibraryRead,
            ...Scopes.userLibraryModify
        ];
    }

    public static get userLibraryRead() {
        return [
            "user-library-read",
        ];
    }

    public static get userLibraryModify() {
        return [
            "user-library-modify",
        ];
    }

    public static get userRecents() {
        return [
            "user-top-read",
            "user-read-recently-played",
        ];
    }

    public static get userFollow() {
        return [
            ...Scopes.userFollowRead,
            ...Scopes.userFollowModify
        ];
    }

    public static get userFollowRead() {
        return [
            "user-follow-read",
        ];
    }

    public static get userFollowModify() {
        return [
            "user-follow-modify",
        ];
    }

    public static get userPlayback() {
        return [
            ...Scopes.userPlaybackRead,
            ...Scopes.userPlaybackModify
        ];
    }

    public static get userPlaybackRead() {
        return [
            "user-read-playback-position",
            "user-read-playback-state",
            "user-read-currently-playing",
        ];
    }

    public static get userPlaybackModify() {
        return [
            "user-modify-playback-state",
            "app-remote-control",
            "streaming"
        ];
    }

    public static get all() {
        return [
            ...Scopes.userDetails,
            ...Scopes.playlist,
            ...Scopes.userLibrary,
            ...Scopes.userRecents,
            ...Scopes.userFollow,
            ...Scopes.userPlayback,
        ];
    }
}