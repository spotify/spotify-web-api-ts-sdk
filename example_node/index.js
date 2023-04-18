import { SpotifyApi } from "../dist/cjs/index.js";
import dotenv from "dotenv";
dotenv.config();

console.log("Searching Spotify for The Beatles...");

const api = SpotifyApi.withClientCredentials(
    process.env.SPOTIFY_CLIENT_ID,
    process.env.SPOTIFY_CLIENT_SECRET
);

const items = await api.search("The Beatles", ["artist"]);

console.table(items.artists.items.map((item) => ({
    name: item.name,
    followers: item.followers.total,
    popularity: item.popularity,
})));

