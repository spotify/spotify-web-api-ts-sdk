# Spotify Web API SDK - TypeScript

> This is a fork of the [official library](https://github.com/spotify/spotify-web-api-ts-sdk) released by Spotify. I needed to publish my fork to npm so I include a fix in my own application since there has not been an offical release in several months. This project has now diverged from upstream and I plan to maintain this library.

This is a JavaScript/TypeScript SDK for the [Spotify Web API](https://developer.spotify.com/web-api/) and currently does not include any of the Web Playback SDK functionality.

## Requirements

Because this SDK uses `fetch` both in Node and the Browser, and ESM, we require the following:

- Node 18.0.0 or higher
- A modern, version infinite, browser

The package contains both an ESM and CommonJS build, so you can use it in both Node and the Browser.

## Using this in your project

```bash
npm install @fostertheweb/spotify-web-sdk
```

## Running the tests

To run the tests, you need to have a Spotify account.

You will need to create a new app in the Spotify Developer portal, and add a redirect URI of `http://localhost:3000`.

You will need to add the following environment variables:

- `INTEGRATION_TESTS_SPOTIFY_CLIENT_ID`
- `INTEGRATION_TESTS_SPOTIFY_CLIENT_SECRET`
- `INTEGRATION_TESTS_USER_EMAIL`
- `INTEGRATION_TESTS_USER_PASSWORD`

The latter two credentials are used to run integration tests in the scope of a *real user account*. This is required to test endpoints that require a user's authorization, such as `followPlaylist`. You need to make sure that your user has access to whichever Spotify app your client credentials and secret are for.

You can run the tests with `npm run test`, or using a plugin like [Wallaby](https://wallabyjs.com/).

We support `dotenv`, so you can add these to a `.env` file in the root of the repository.

To run the embedded example app, you will need to add the following environment variables:

- `VITE_SPOTIFY_CLIENT_ID`=the same value as set in INTEGRATION_TESTS_SPOTIFY_CLIENT_ID
- `VITE_REDIRECT_TARGET`=http://localhost:3000

For the example app to work, this .env file needs to be in the ./example folder.
