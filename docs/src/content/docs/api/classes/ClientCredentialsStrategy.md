---
editUrl: false
next: false
prev: false
title: "ClientCredentialsStrategy"
---

## Implements

- [`IAuthStrategy`](/api/interfaces/iauthstrategy/)

## Constructors

### new ClientCredentialsStrategy(clientId, clientSecret)

> **new ClientCredentialsStrategy**(`clientId`, `clientSecret`): [`ClientCredentialsStrategy`](/api/classes/clientcredentialsstrategy/)

#### Parameters

• **clientId**: `string`

• **clientSecret**: `string`

#### Returns

[`ClientCredentialsStrategy`](/api/classes/clientcredentialsstrategy/)

#### Source

[auth/ClientCredentialsStrategy.ts:17](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ClientCredentialsStrategy.ts#L17)

## Methods

### getAccessToken()

> **getAccessToken**(): `Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

`Promise`\<`null` \| [`AccessToken`](/api/interfaces/accesstoken/)\>

#### Implementation of

[`IAuthStrategy.getAccessToken`](/api/interfaces/iauthstrategy/#getaccesstoken)

#### Source

[auth/ClientCredentialsStrategy.ts:39](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ClientCredentialsStrategy.ts#L39)

***

### getOrCreateAccessToken()

> **getOrCreateAccessToken**(): `Promise`\<[`AccessToken`](/api/interfaces/accesstoken/)\>

#### Returns

`Promise`\<[`AccessToken`](/api/interfaces/accesstoken/)\>

#### Implementation of

[`IAuthStrategy.getOrCreateAccessToken`](/api/interfaces/iauthstrategy/#getorcreateaccesstoken)

#### Source

[auth/ClientCredentialsStrategy.ts:23](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ClientCredentialsStrategy.ts#L23)

***

### removeAccessToken()

> **removeAccessToken**(): `void`

#### Returns

`void`

#### Implementation of

[`IAuthStrategy.removeAccessToken`](/api/interfaces/iauthstrategy/#removeaccesstoken)

#### Source

[auth/ClientCredentialsStrategy.ts:46](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ClientCredentialsStrategy.ts#L46)

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

[auth/ClientCredentialsStrategy.ts:19](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/auth/ClientCredentialsStrategy.ts#L19)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
