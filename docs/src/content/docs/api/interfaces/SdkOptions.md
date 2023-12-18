---
editUrl: false
next: false
prev: false
title: "SdkOptions"
---

## Extended By

- [`SdkConfiguration`](/api/interfaces/sdkconfiguration/)

## Properties

### afterRequest?

> **afterRequest**?: (`url`, `options`, `response`) => `void`

#### Parameters

• **url**: `string`

• **options**: `RequestInit`

• **response**: `Response`

#### Returns

`void`

#### Source

[types.ts:11](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L11)

***

### beforeRequest?

> **beforeRequest**?: (`url`, `options`) => `void`

#### Parameters

• **url**: `string`

• **options**: `RequestInit`

#### Returns

`void`

#### Source

[types.ts:10](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L10)

***

### cachingStrategy?

> **cachingStrategy**?: [`ICachingStrategy`](/api/interfaces/icachingstrategy/)

#### Source

[types.ts:20](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L20)

***

### deserializer?

> **deserializer**?: [`IResponseDeserializer`](/api/interfaces/iresponsedeserializer/)

#### Source

[types.ts:16](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L16)

***

### errorHandler?

> **errorHandler**?: [`IHandleErrors`](/api/interfaces/ihandleerrors/)

#### Source

[types.ts:18](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L18)

***

### fetch?

> **fetch**?: [`RequestImplementation`](/api/type-aliases/requestimplementation/)

#### Source

[types.ts:9](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L9)

***

### redirectionStrategy?

> **redirectionStrategy**?: [`IRedirectionStrategy`](/api/interfaces/iredirectionstrategy/)

#### Source

[types.ts:19](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L19)

***

### responseValidator?

> **responseValidator**?: [`IValidateResponses`](/api/interfaces/ivalidateresponses/)

#### Source

[types.ts:17](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L17)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
