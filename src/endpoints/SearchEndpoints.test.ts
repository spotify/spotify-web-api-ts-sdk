import { beforeEach, describe, expect, expectTypeOf, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { Artist, ItemTypes, Page } from "../types";

describe("Integration: Search Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getTrack can return information", async () => {
        const q = "Katatonia"
        const result = await sut.search(q, ["artist"]);

        const allMentionedArtists = result.artists.items.map(artist => artist.name);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/search?q=${q}&type=artist`);
        expect(allMentionedArtists).toContain("Katatonia");
    });

    it("result type should mark properties as optional if they can\'t be determined", async () => {
        const q = "Katatonia"
        const types: ItemTypes[] = ["artist"]
        const result = await sut.search(q, types);

        expectTypeOf(result).toMatchTypeOf<{ artists?: Page<Artist> }>
    })
    
    it("result type should assert property as present if types are passed as a tuple", async () => {
        const q = "Katatonia"
        const result = await sut.search(q, ['artist']);

        expectTypeOf(result).toEqualTypeOf<{ artists: Page<Artist> }>
    })
});