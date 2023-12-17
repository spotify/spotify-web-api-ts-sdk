---
editUrl: false
next: false
prev: false
title: "SpotifyApi"
---

## Constructors

### new SpotifyApi(authentication, config)

> **new SpotifyApi**(`authentication`, `config`?): [`SpotifyApi`](/api/classes/spotifyapi/)

#### Parameters

• **authentication**: [`IAuthStrategy`](/api/interfaces/iauthstrategy/)

• **config?**: [`SdkOptions`](/api/interfaces/sdkoptions/)

#### Returns

[`SpotifyApi`](/api/classes/spotifyapi/)

#### Source

[SpotifyApi.ts:59](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L59)

## Properties

### albums

> **albums**: `default`

#### Source

[SpotifyApi.ts:42](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L42)

***

### artists

> **artists**: `default`

#### Source

[SpotifyApi.ts:43](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L43)

***

### audiobooks

> **audiobooks**: `default`

#### Source

[SpotifyApi.ts:44](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L44)

***

### browse

> **browse**: `default`

#### Source

[SpotifyApi.ts:45](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L45)

***

### chapters

> **chapters**: `default`

#### Source

[SpotifyApi.ts:46](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L46)

***

### currentUser

> **currentUser**: `default`

#### Source

[SpotifyApi.ts:57](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L57)

***

### episodes

> **episodes**: `default`

#### Source

[SpotifyApi.ts:47](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L47)

***

### markets

> **markets**: `default`

#### Source

[SpotifyApi.ts:49](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L49)

***

### player

> **player**: `default`

#### Source

[SpotifyApi.ts:50](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L50)

***

### playlists

> **playlists**: `default`

#### Source

[SpotifyApi.ts:51](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L51)

***

### recommendations

> **recommendations**: `default`

#### Source

[SpotifyApi.ts:48](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L48)

***

### search

> **search**: `SearchExecutionFunction`

#### Source

[SpotifyApi.ts:55](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L55)

***

### shows

> **shows**: `default`

#### Source

[SpotifyApi.ts:52](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L52)

***

### tracks

> **tracks**: `default`

#### Source

[SpotifyApi.ts:53](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L53)

***

### users

> **users**: `default`

#### Source

[SpotifyApi.ts:54](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L54)

## Methods

### authenticate()

> **authenticate**(): `Promise`\<[`AuthenticationResponse`](/api/interfaces/authenticationresponse/)\>

Use this when you're running in a browser and you want to control when first authentication+redirect happens.

#### Returns

`Promise`\<[`AuthenticationResponse`](/api/interfaces/authenticationresponse/)\>

#### Source

[SpotifyApi.ts:162](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L162)

***

### getAccessToken()

> **getAccessToken**(): `Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

`Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

the current access token. null implies the SpotifyApi is not yet authenticated.

#### Source

[SpotifyApi.ts:175](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L175)

***

### logOut()

> **logOut**(): `void`

Removes the access token if it exists.

#### Returns

`void`

#### Source

[SpotifyApi.ts:182](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L182)

***

### makeRequest()

> **makeRequest**\<`TReturnType`\>(`method`, `url`, `body`, `contentType`): `Promise`\<`TReturnType`\>

#### Type parameters

• **TReturnType**

#### Parameters

• **method**: `"GET"` \| `"POST"` \| `"PUT"` \| `"DELETE"`

• **url**: `string`

• **body**: `any`= `undefined`

• **contentType**: `undefined` \| `string`= `undefined`

#### Returns

`Promise`\<`TReturnType`\>

#### Source

[SpotifyApi.ts:84](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L84)

***

### switchAuthenticationStrategy()

> **switchAuthenticationStrategy**(`authentication`): `void`

#### Parameters

• **authentication**: [`IAuthStrategy`](/api/interfaces/iauthstrategy/)

#### Returns

`void`

#### Source

[SpotifyApi.ts:153](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L153)

***

### performUserAuthorization()

#### performUserAuthorization(clientId, redirectUri, scopes, postbackUrl, config)

> **`static`** **performUserAuthorization**(`clientId`, `redirectUri`, `scopes`, `postbackUrl`, `config`?): `Promise`\<[`AuthenticationResponse`](/api/interfaces/authenticationresponse/)\>

Use this when you're running in the browser, and want to perform the user authorization flow to post back to your server with the access token.

##### Parameters

• **clientId**: `string`

Your Spotify client ID

• **redirectUri**: `string`

The URI to redirect to after the user has authorized your app

• **scopes**: `string`[]

The scopes to request

• **postbackUrl**: `string`

The URL to post the access token to

• **config?**: [`SdkOptions`](/api/interfaces/sdkoptions/)

Optional configuration

##### Returns

`Promise`\<[`AuthenticationResponse`](/api/interfaces/authenticationresponse/)\>

##### Source

[SpotifyApi.ts:245](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L245)

#### performUserAuthorization(clientId, redirectUri, scopes, onAuthorization, config)

> **`static`** **performUserAuthorization**(`clientId`, `redirectUri`, `scopes`, `onAuthorization`, `config`?): `Promise`\<[`AuthenticationResponse`](/api/interfaces/authenticationresponse/)\>

Use this when you're running in the browser, and want to perform the user authorization flow to post back to your server with the access token.
This overload is provided for you to perform the postback yourself, if you want to do something other than a simple HTTP POST to a URL - for example, if you want to use a WebSocket, or provide custom authentication.

##### Parameters

• **clientId**: `string`

Your Spotify client ID

• **redirectUri**: `string`

The URI to redirect to after the user has authorized your app

• **scopes**: `string`[]

The scopes to request

• **onAuthorization**: (`token`) => `Promise`\<`void`\>

A function to call with the access token where YOU perform the server-side postback

• **config?**: [`SdkOptions`](/api/interfaces/sdkoptions/)

Optional configuration

##### Returns

`Promise`\<[`AuthenticationResponse`](/api/interfaces/authenticationresponse/)\>

##### Source

[SpotifyApi.ts:262](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L262)

***

### withAccessToken()

> **`static`** **withAccessToken**(`clientId`, `token`, `config`?): [`SpotifyApi`](/api/classes/spotifyapi/)

Use this when you're running in a Node environment, and accepting the access token from a client-side `performUserAuthorization` call.
You can also use this method if you already have an access token and don't want to use the built-in authentication strategies.

#### Parameters

• **clientId**: `string`

• **token**: [`AccessToken`](/api/interfaces/accesstoken/)

• **config?**: [`SdkOptions`](/api/interfaces/sdkoptions/)

#### Returns

[`SpotifyApi`](/api/classes/spotifyapi/)

#### Source

[SpotifyApi.ts:228](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L228)

***

### withClientCredentials()

> **`static`** **withClientCredentials**(`clientId`, `clientSecret`, `scopes`, `config`?): [`SpotifyApi`](/api/classes/spotifyapi/)

#### Parameters

• **clientId**: `string`

• **clientSecret**: `string`

• **scopes**: `string`[]= `[]`

• **config?**: [`SdkOptions`](/api/interfaces/sdkoptions/)

#### Returns

[`SpotifyApi`](/api/classes/spotifyapi/)

#### Source

[SpotifyApi.ts:200](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L200)

***

### withImplicitGrant()

> **`static`** **withImplicitGrant**(`clientId`, `redirectUri`, `scopes`, `config`?): [`SpotifyApi`](/api/classes/spotifyapi/)

#### Parameters

• **clientId**: `string`

• **redirectUri**: `string`

• **scopes**: `string`[]= `[]`

• **config?**: [`SdkOptions`](/api/interfaces/sdkoptions/)

#### Returns

[`SpotifyApi`](/api/classes/spotifyapi/)

#### Source

[SpotifyApi.ts:214](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L214)

***

### withUserAuthorization()

> **`static`** **withUserAuthorization**(`clientId`, `redirectUri`, `scopes`, `config`?): [`SpotifyApi`](/api/classes/spotifyapi/)

#### Parameters

• **clientId**: `string`

• **redirectUri**: `string`

• **scopes**: `string`[]= `[]`

• **config?**: [`SdkOptions`](/api/interfaces/sdkoptions/)

#### Returns

[`SpotifyApi`](/api/classes/spotifyapi/)

#### Source

[SpotifyApi.ts:186](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/SpotifyApi.ts#L186)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
