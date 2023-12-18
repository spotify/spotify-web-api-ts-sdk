---
editUrl: false
next: false
prev: false
title: "PartialSearchResult"
---

> **PartialSearchResult**: `{ [K in ItemTypes as ResourceTypeToResultKey[K]]?: Page<K extends keyof SearchResultsMap ? SearchResultsMap[K] : any> }`

## Source

[types.ts:728](https://github.com/fostertheweb/spotify-web-sdk/blob/8d95f4b/src/types.ts#L728)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
