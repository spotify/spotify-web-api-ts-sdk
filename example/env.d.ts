interface ImportMetaEnv {
    readonly VITE_SPOTIFY_CLIENT_ID: string
    readonly VITE_REDIRECT_TARGET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
