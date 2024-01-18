---
editUrl: false
next: false
prev: false
title: "InMemoryCachingStrategy"
---

## Extends

- [`GenericCache`](/api/classes/genericcache/)

## Constructors

### new InMemoryCachingStrategy()

> **new InMemoryCachingStrategy**(): [`InMemoryCachingStrategy`](/api/classes/inmemorycachingstrategy/)

#### Returns

[`InMemoryCachingStrategy`](/api/classes/inmemorycachingstrategy/)

#### Overrides

[`GenericCache.constructor`](/api/classes/genericcache/#constructors)

#### Source

[caching/InMemoryCachingStrategy.ts:5](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/caching/InMemoryCachingStrategy.ts#L5)

## Methods

### get()

> **get**\<`T`\>(`cacheKey`): `Promise`\<`null` \| `T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Type parameters

• **T**

#### Parameters

• **cacheKey**: `string`

#### Returns

`Promise`\<`null` \| `T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Inherited from

[`GenericCache.get`](/api/classes/genericcache/#get)

#### Source

[caching/GenericCache.ts:46](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/caching/GenericCache.ts#L46)

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

#### Inherited from

[`GenericCache.getOrCreate`](/api/classes/genericcache/#getorcreate)

#### Source

[caching/GenericCache.ts:20](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/caching/GenericCache.ts#L20)

***

### remove()

> **remove**(`cacheKey`): `void`

#### Parameters

• **cacheKey**: `string`

#### Returns

`void`

#### Inherited from

[`GenericCache.remove`](/api/classes/genericcache/#remove)

#### Source

[caching/GenericCache.ts:93](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/caching/GenericCache.ts#L93)

***

### set()

> **set**(`cacheKey`, `value`, `expiresIn`): `void`

#### Parameters

• **cacheKey**: `string`

• **value**: `object`

• **expiresIn**: `number`

#### Returns

`void`

#### Inherited from

[`GenericCache.set`](/api/classes/genericcache/#set)

#### Source

[caching/GenericCache.ts:82](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/caching/GenericCache.ts#L82)

***

### setCacheItem()

> **setCacheItem**(`cacheKey`, `cacheItem`): `void`

#### Parameters

• **cacheKey**: `string`

• **cacheItem**: [`ICachable`](/api/interfaces/icachable/)

#### Returns

`void`

#### Inherited from

[`GenericCache.setCacheItem`](/api/classes/genericcache/#setcacheitem)

#### Source

[caching/GenericCache.ts:88](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/caching/GenericCache.ts#L88)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
