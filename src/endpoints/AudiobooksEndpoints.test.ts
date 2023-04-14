import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { validAudioBook } from "../test/data/validAudioBook";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validAudiobookChapters } from "../test/data/validAudiobookChapters";

describe("Integration: Audiobooks Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getAudiobook can return information", async () => {
        const item = validAudioBook();
        const result = await sut.audiobooks.get(item.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/audiobooks/${item.id}`);
        expect(result.id).toBe(item.id);
    });

    it("getAudiobooks can return multiple items at once", async () => {
        const item = validAudioBook();
        const result = await sut.audiobooks.get([item.id, item.id]);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/audiobooks?ids=${item.id}%2C${item.id}`);
        expect(result.length).toBe(2);
        expect(result[0].id).toBe(item.id);
        expect(result[1].id).toBe(item.id);
    });

    it("getAudiobookChapters can return information", async () => {
        const item = validAudioBook();
        const chapters = validAudiobookChapters();

        const result = await sut.audiobooks.getAudiobookChapters(item.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/audiobooks/${item.id}/chapters`);
        expect(result.items.length).toBeGreaterThan(0);
    });
});
