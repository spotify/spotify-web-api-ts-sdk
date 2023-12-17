---
editUrl: false
next: false
prev: false
title: "SearchResults"
---

> **SearchResults**\<`T`\>: `Pick`\<[`PartialSearchResult`](/api/type-aliases/partialsearchresult/), `ResourceTypeToResultKey`\[`T`\[`number`\]\]\> extends infer R ? `number` extends `T`\[`"length"`\] ? `R` : `Required`\<`R`\> : `never`

Makes all properties in SearchResults optional, unless the type T is a tuple (literal array / tuple) of SearchTypes.

## Type parameters

• **T** extends readonly [`ItemTypes`](/api/type-aliases/itemtypes/)[]

## Source

[types.ts:737](https://github.com/fostertheweb/spotify-web-sdk/blob/eb6b780/src/types.ts#L737)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
