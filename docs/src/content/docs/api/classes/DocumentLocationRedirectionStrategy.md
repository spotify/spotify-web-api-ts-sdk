---
editUrl: false
next: false
prev: false
title: "DocumentLocationRedirectionStrategy"
---

## Implements

- [`IRedirectionStrategy`](/api/interfaces/iredirectionstrategy/)

## Constructors

### new DocumentLocationRedirectionStrategy()

> **new DocumentLocationRedirectionStrategy**(): [`DocumentLocationRedirectionStrategy`](/api/classes/documentlocationredirectionstrategy/)

#### Returns

[`DocumentLocationRedirectionStrategy`](/api/classes/documentlocationredirectionstrategy/)

## Methods

### onReturnFromRedirect()

> **onReturnFromRedirect**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IRedirectionStrategy.onReturnFromRedirect`](/api/interfaces/iredirectionstrategy/#onreturnfromredirect)

#### Source

[redirection/DocumentLocationRedirectionStrategy.ts:10](https://github.com/fostertheweb/spotify-web-sdk/blob/b2835c1/src/redirection/DocumentLocationRedirectionStrategy.ts#L10)

***

### redirect()

> **redirect**(`targetUrl`): `Promise`\<`void`\>

#### Parameters

• **targetUrl**: `string` \| `URL`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`IRedirectionStrategy.redirect`](/api/interfaces/iredirectionstrategy/#redirect)

#### Source

[redirection/DocumentLocationRedirectionStrategy.ts:6](https://github.com/fostertheweb/spotify-web-sdk/blob/b2835c1/src/redirection/DocumentLocationRedirectionStrategy.ts#L6)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
