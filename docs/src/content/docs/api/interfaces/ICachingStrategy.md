---
editUrl: false
next: false
prev: false
title: "ICachingStrategy"
---

## Methods

### get()

> **get**\<`T`\>(`cacheKey`): `Promise`\<`null` \| `T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Type parameters

• **T**

#### Parameters

• **cacheKey**: `string`

#### Returns

`Promise`\<`null` \| `T` & [`ICachable`](/api/interfaces/icachable/)\>

#### Source

[types.ts:63](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/types.ts#L63)

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

#### Source

[types.ts:57](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/types.ts#L57)

***

### remove()

> **remove**(`cacheKey`): `void`

#### Parameters

• **cacheKey**: `string`

#### Returns

`void`

#### Source

[types.ts:65](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/types.ts#L65)

***

### setCacheItem()

> **setCacheItem**\<`T`\>(`cacheKey`, `item`): `void`

#### Type parameters

• **T**

#### Parameters

• **cacheKey**: `string`

• **item**: `T` & [`ICachable`](/api/interfaces/icachable/)

#### Returns

`void`

#### Source

[types.ts:64](https://github.com/fostertheweb/spotify-web-sdk/blob/e412602/src/types.ts#L64)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
