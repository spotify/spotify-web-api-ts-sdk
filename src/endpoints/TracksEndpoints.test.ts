import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validTrack } from "../test/data/validTrack";

describe("Integration: Tracks Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getTrack can return information", async () => {
        const valid = validTrack();
        const result = await sut.tracks.get(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/tracks/${valid.id}`);
        expect(result.id).toBe(valid.id);
    });

    it("getTracks can return multiple items", async () => {
        const valid = validTrack();
        const result = await sut.tracks.get([valid.id, valid.id]);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/tracks?ids=${valid.id}%2C${valid.id}`);
        expect(result[0].id).toBe(valid.id);
        expect(result[1].id).toBe(valid.id);
    });

    it("audioFeatures can return information", async () => {
        const valid = validTrack();
        const result = await sut.tracks.audioFeatures(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/audio-features/${valid.id}`);
        expect(result.id).toBe(valid.id);
    });   
    
    it("audioFeatures can return multiple items", async () => {
        const valid = validTrack();
        const result = await sut.tracks.audioFeatures([valid.id, valid.id]);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/audio-features?ids=${valid.id}%2C${valid.id}`);
        expect(result[0].id).toBe(valid.id);
        expect(result[1].id).toBe(valid.id);
    });

    it("audioAnalysis can return information", async () => {
        const valid = validTrack();
        const result = await sut.tracks.audioAnalysis(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/audio-analysis/${valid.id}`);
        expect(result.track.tempo).toBeGreaterThan(0);
    });   

});
