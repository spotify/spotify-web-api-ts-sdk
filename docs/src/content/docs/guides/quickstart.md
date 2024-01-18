---
title: Getting Started
description: A brief overview of the library.
---

### Creating a client instance

Creating an instance of the SDK is easy, and can be done in a number of ways depending on which form of authentication you want to use.

```js
import { SpotifyApi } from "@fostertheweb/spotify-web-sdk";

// Choose one of the following:
const sdk = SpotifyApi.withUserAuthorization(
  "client-id",
  "https://localhost:3000",
  ["scope1", "scope2"]
);

const sdk = SpotifyApi.withClientCredentials("client-id", "secret");
```

Each of these factory methods will return a `SpotifyApi` instance, which you can use to make requests to the Spotify Web API.

Once you have an authenticated instance of the SDK, you can make requests to the Spotify Web API by using the methods exposed on the client instance of the API. Types are embedded in the package, so if you're using Visual Studio Code or other compatible IDEs, you should get intellisense and type checking by default.

```js
const items = await sdk.search("The Beatles", ["artist"]);

console.table(
  items.artists.items.map((item) => ({
    name: item.name,
    followers: item.followers.total,
    popularity: item.popularity,
  }))
);
```
