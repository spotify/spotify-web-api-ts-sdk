---
editUrl: false
next: false
prev: false
title: "ProvidedAccessTokenStrategy"
---

This strategy is used when you already have an access token and want to use it.
The authentication strategy will automatically renew the token when it expires.
Designed to allow a browser-based-app to post the access token to the server and use it from there.

## Param

Spotify application client id.

## Param

The access token returned from a client side Authorization Code with PKCE flow.

## Implements

- [`IAuthStrategy`](/api/interfaces/iauthstrategy/)

## Constructors

### new ProvidedAccessTokenStrategy(clientId, accessToken, refreshTokenAction)

> **new ProvidedAccessTokenStrategy**(`clientId`, `accessToken`, `refreshTokenAction`?): [`ProvidedAccessTokenStrategy`](/api/classes/providedaccesstokenstrategy/)

#### Parameters

• **clientId**: `string`

• **accessToken**: [`AccessToken`](/api/interfaces/accesstoken/)

• **refreshTokenAction?**: (`clientId`, `token`) => `Promise`\<[`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

[`ProvidedAccessTokenStrategy`](/api/classes/providedaccesstokenstrategy/)

#### Source

[auth/ProvidedAccessTokenStrategy.ts:19](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ProvidedAccessTokenStrategy.ts#L19)

## Methods

### getAccessToken()

> **getAccessToken**(): `Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

`Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

#### Implementation of

[`IAuthStrategy.getAccessToken`](/api/interfaces/iauthstrategy/#getaccesstoken)

#### Source

[auth/ProvidedAccessTokenStrategy.ts:58](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ProvidedAccessTokenStrategy.ts#L58)

***

### getOrCreateAccessToken()

> **getOrCreateAccessToken**(): `Promise`\<[`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

`Promise`\<[`AccessToken`](/api/interfaces/accesstoken/)\>

#### Implementation of

[`IAuthStrategy.getOrCreateAccessToken`](/api/interfaces/iauthstrategy/#getorcreateaccesstoken)

#### Source

[auth/ProvidedAccessTokenStrategy.ts:46](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ProvidedAccessTokenStrategy.ts#L46)

***

### removeAccessToken()

> **removeAccessToken**(): `void`

#### Returns

`void`

#### Implementation of

[`IAuthStrategy.removeAccessToken`](/api/interfaces/iauthstrategy/#removeaccesstoken)

#### Source

[auth/ProvidedAccessTokenStrategy.ts:62](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ProvidedAccessTokenStrategy.ts#L62)

***

### setConfiguration()

> **setConfiguration**(`_`): `void`

#### Parameters

• **\_**: [`SdkConfiguration`](/api/interfaces/sdkconfiguration/)

#### Returns

`void`

#### Implementation of

[`IAuthStrategy.setConfiguration`](/api/interfaces/iauthstrategy/#setconfiguration)

#### Source

[auth/ProvidedAccessTokenStrategy.ts:44](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ProvidedAccessTokenStrategy.ts#L44)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
