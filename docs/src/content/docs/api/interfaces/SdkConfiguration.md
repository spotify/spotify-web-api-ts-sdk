---
editUrl: false
next: false
prev: false
title: "SdkConfiguration"
---

## Extends

- [`SdkOptions`](/api/interfaces/sdkoptions/)

## Properties

### afterRequest

> **afterRequest**: (`url`, `options`, `response`) => `void`

#### Parameters

• **url**: `string`

• **options**: `RequestInit`

• **response**: `Response`

#### Returns

`void`

#### Overrides

[`SdkOptions.afterRequest`](/api/interfaces/sdkoptions/#afterrequest)

#### Source

[types.ts:31](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L31)

***

### beforeRequest

> **beforeRequest**: (`url`, `options`) => `void`

#### Parameters

• **url**: `string`

• **options**: `RequestInit`

#### Returns

`void`

#### Overrides

[`SdkOptions.beforeRequest`](/api/interfaces/sdkoptions/#beforerequest)

#### Source

[types.ts:30](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L30)

***

### cachingStrategy

> **cachingStrategy**: [`ICachingStrategy`](/api/interfaces/icachingstrategy/)

#### Overrides

[`SdkOptions.cachingStrategy`](/api/interfaces/sdkoptions/#cachingstrategy)

#### Source

[types.ts:36](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L36)

***

### deserializer

> **deserializer**: [`IResponseDeserializer`](/api/interfaces/iresponsedeserializer/)

#### Overrides

[`SdkOptions.deserializer`](/api/interfaces/sdkoptions/#deserializer)

#### Source

[types.ts:32](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L32)

***

### errorHandler

> **errorHandler**: [`IHandleErrors`](/api/interfaces/ihandleerrors/)

#### Overrides

[`SdkOptions.errorHandler`](/api/interfaces/sdkoptions/#errorhandler)

#### Source

[types.ts:34](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L34)

***

### fetch

> **fetch**: [`RequestImplementation`](/api/type-aliases/requestimplementation/)

#### Overrides

[`SdkOptions.fetch`](/api/interfaces/sdkoptions/#fetch)

#### Source

[types.ts:29](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L29)

***

### redirectionStrategy

> **redirectionStrategy**: [`IRedirectionStrategy`](/api/interfaces/iredirectionstrategy/)

#### Overrides

[`SdkOptions.redirectionStrategy`](/api/interfaces/sdkoptions/#redirectionstrategy)

#### Source

[types.ts:35](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L35)

***

### responseValidator

> **responseValidator**: [`IValidateResponses`](/api/interfaces/ivalidateresponses/)

#### Overrides

[`SdkOptions.responseValidator`](/api/interfaces/sdkoptions/#responsevalidator)

#### Source

[types.ts:33](https://github.com/fostertheweb/spotify-web-sdk/blob/9d7441b/src/types.ts#L33)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
