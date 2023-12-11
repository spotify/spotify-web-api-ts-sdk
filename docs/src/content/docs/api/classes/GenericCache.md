---
editUrl: false
next: false
prev: false
title: "GenericCache"
---

## Extended By

- [`InMemoryCachingStrategy`](/api/classes/inmemorycachingstrategy/)
- [`LocalStorageCachingStrategy`](/api/classes/localstoragecachingstrategy/)

## Implements

- [`ICachingStrategy`](/api/interfaces/icachingstrategy/)

## Constructors

### new GenericCache(storage, updateFunctions, autoRenewInterval, autoRenewWindow)

> **new GenericCache**(`storage`, `updateFunctions`, `autoRenewInterval`, `autoRenewWindow`): [`GenericCache`](/api/classes/genericcache/)

#### Parameters

• **storage**: [`ICacheStore`](/api/interfaces/icachestore/)

• **updateFunctions**: `Map`\<`string`, (`item`) => `Promise`\<[`ICachable`](/api/interfaces/icachable/)\>\>= `undefined`

• **autoRenewInterval**: `number`= `0`

• **autoRenewWindow**: `number`= `undefined`

#### Returns

[`GenericCache`](/api/classes/genericcache/)

#### Source

[caching/GenericCache.ts:6](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/caching/GenericCache.ts#L6)

## Methods

### get()

> **get**\<`T`\>(`cacheKey`): `Promise`\<`null` \| `T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Type parameters

• **T**

#### Parameters

• **cacheKey**: `string`

#### Returns

`Promise`\<`null` \| `T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Implementation of

[`ICachingStrategy.get`](/api/interfaces/icachingstrategy/#get)

#### Source

[caching/GenericCache.ts:46](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/caching/GenericCache.ts#L46)

***

### getOrCreate()

> **getOrCreate**\<`T`\>(`cacheKey`, `createFunction`, `updateFunction`?): `Promise`\<`T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Type parameters

• **T**

#### Parameters

• **cacheKey**: `string`

• **createFunction**: () => `Promise`\<`T` & [`ICachable`](/api/interfaces/icachable/) & `object`\>

• **updateFunction?**: (`item`) => `Promise`\<`T` & [`ICachable`](/api/interfaces/icachable/) & `object`\>

#### Returns

`Promise`\<`T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Implementation of

[`ICachingStrategy.getOrCreate`](/api/interfaces/icachingstrategy/#getorcreate)

#### Source

[caching/GenericCache.ts:20](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/caching/GenericCache.ts#L20)

***

### remove()

> **remove**(`cacheKey`): `void`

#### Parameters

• **cacheKey**: `string`

#### Returns

`void`

#### Implementation of

[`ICachingStrategy.remove`](/api/interfaces/icachingstrategy/#remove)

#### Source

[caching/GenericCache.ts:93](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/caching/GenericCache.ts#L93)

***

### set()

> **set**(`cacheKey`, `value`, `expiresIn`): `void`

#### Parameters

• **cacheKey**: `string`

• **value**: `object`

• **expiresIn**: `number`

#### Returns

`void`

#### Source

[caching/GenericCache.ts:82](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/caching/GenericCache.ts#L82)

***

### setCacheItem()

> **setCacheItem**(`cacheKey`, `cacheItem`): `void`

#### Parameters

• **cacheKey**: `string`

• **cacheItem**: [`ICachable`](/api/interfaces/icachable/)

#### Returns

`void`

#### Implementation of

[`ICachingStrategy.setCacheItem`](/api/interfaces/icachingstrategy/#setcacheitem)

#### Source

[caching/GenericCache.ts:88](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/caching/GenericCache.ts#L88)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
