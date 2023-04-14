import { SpotifyApi } from "../SpotifyApi";
import ClientCredentialsStrategy from "../auth/ClientCredentialsStrategy";
import { FakeAuthStrategy } from "./FakeAuthStrategy";
import { FetchApiMock } from "./FetchApiMock";
import { FetchApiSpy } from "./FetchApiSpy";
import AuthAsSpecifcUserForTests from "./AuthAsRealUserForTests";

import dotenv from "dotenv";
dotenv.config();

export function buildIntegrationTestSdkInstance(logResults: boolean = false): [SpotifyApi, FetchApiSpy] {
    // This should be replaced with a representative server-side auth flow
    // that returns a valid access token.

    // We'll load access keys from the .env file, so if it's not provided
    // all the integration tests will deliberately fail and not hit
    // the Spotify API

    const clientId = process.env.INTEGRATION_TESTS_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.INTEGRATION_TESTS_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error("No client ID or secret provided. Please provide a valid Spotify client ID and secret in the /.env file as: INTEGRATION_TESTS_SPOTIFY_CLIENT_ID and INTEGRATION_TESTS_SPOTIFY_CLIENT_SECRET");
    }

    const authStrat = new ClientCredentialsStrategy(clientId, clientSecret);

    const fetchSpy = new FetchApiSpy(logResults);
    const sdkConfig = {
        fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => {
            return fetchSpy.fetch(input, init);
        }
    }

    const sdkInstance = new SpotifyApi(authStrat, sdkConfig);

    return [sdkInstance, fetchSpy];
}

export function buildIntegrationTestUserSdkInstance(logResults: boolean = false): [SpotifyApi, FetchApiSpy] {
    const clientId = process.env.INTEGRATION_TESTS_SPOTIFY_CLIENT_ID;
    const email = process.env.INTEGRATION_TESTS_USER_EMAIL;
    const password = process.env.INTEGRATION_TESTS_USER_PASSWORD;

    if (!clientId || !email || !password) {
        throw new Error("No client ID, or secret, or email, or password provided. Please provide a valid Spotify client ID and secret in the /.env file.");
    }

    const authStrat = new AuthAsSpecifcUserForTests(clientId, [
        "user-read-private",
        "user-read-email",
        "playlist-modify-public",
        "playlist-modify-private",
        "playlist-read-private",
        "playlist-read-collaborative",
        "user-library-modify",
        "user-library-read",
        "user-top-read",
        "user-read-recently-played",
        "user-follow-read",
        "user-follow-modify",
        "user-read-playback-position",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "app-remote-control",
        "streaming"
    ], email, password);

    const fetchSpy = new FetchApiSpy(logResults);
    const sdkConfig = {
        fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => {
            return fetchSpy.fetch(input, init);
        }
    }

    const sdkInstance = new SpotifyApi(authStrat, sdkConfig);

    return [sdkInstance, fetchSpy];
}

export function buildUnitTestSdkInstance(): [SpotifyApi, FetchApiMock] {
    const authStrat = new FakeAuthStrategy();
    const fetchMock = new FetchApiMock();
    const sdkConfig = {
        fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => {
            return fetchMock.fetch(input, init);
        }
    }

    const sdkInstance = new SpotifyApi(authStrat, sdkConfig);

    return [sdkInstance, fetchMock];
}
