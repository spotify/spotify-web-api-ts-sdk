---
editUrl: false
next: false
prev: false
title: "AuthorizationCodeWithPKCEStrategy"
---

## Implements

- [`IAuthStrategy`](/api/interfaces/iauthstrategy/)

## Constructors

### new AuthorizationCodeWithPKCEStrategy(clientId, redirectUri, scopes)

> **new AuthorizationCodeWithPKCEStrategy**(`clientId`, `redirectUri`, `scopes`): [`AuthorizationCodeWithPKCEStrategy`](/api/classes/authorizationcodewithpkcestrategy/)

#### Parameters

• **clientId**: `string`

• **redirectUri**: `string`

• **scopes**: `string`[]

#### Returns

[`AuthorizationCodeWithPKCEStrategy`](/api/classes/authorizationcodewithpkcestrategy/)

#### Source

[auth/AuthorizationCodeWithPKCEStrategy.ts:25](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/auth/AuthorizationCodeWithPKCEStrategy.ts#L25)

## Methods

### getAccessToken()

> **getAccessToken**(): `Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

`Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

#### Implementation of

[`IAuthStrategy.getAccessToken`](/api/interfaces/iauthstrategy/#getaccesstoken)

#### Source

[auth/AuthorizationCodeWithPKCEStrategy.ts:53](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/auth/AuthorizationCodeWithPKCEStrategy.ts#L53)

***

### getOrCreateAccessToken()

> **getOrCreateAccessToken**(): `Promise`\<[`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

`Promise`\<[`AccessToken`](/api/interfaces/accesstoken/)\>

#### Implementation of

[`IAuthStrategy.getOrCreateAccessToken`](/api/interfaces/iauthstrategy/#getorcreateaccesstoken)

#### Source

[auth/AuthorizationCodeWithPKCEStrategy.ts:35](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/auth/AuthorizationCodeWithPKCEStrategy.ts#L35)

***

### removeAccessToken()

> **removeAccessToken**(): `void`

#### Returns

`void`

#### Implementation of

[`IAuthStrategy.removeAccessToken`](/api/interfaces/iauthstrategy/#removeaccesstoken)

#### Source

[auth/AuthorizationCodeWithPKCEStrategy.ts:60](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/auth/AuthorizationCodeWithPKCEStrategy.ts#L60)

***

### setConfiguration()

> **setConfiguration**(`configuration`): `void`

#### Parameters

• **configuration**: [`SdkConfiguration`](/api/interfaces/sdkconfiguration/)

#### Returns

`void`

#### Implementation of

[`IAuthStrategy.setConfiguration`](/api/interfaces/iauthstrategy/#setconfiguration)

#### Source

[auth/AuthorizationCodeWithPKCEStrategy.ts:31](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/auth/AuthorizationCodeWithPKCEStrategy.ts#L31)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
