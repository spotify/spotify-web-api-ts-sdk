import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validAudiobookChapterResponse } from "../test/data/validChapterApiResponse";

describe("Integration: Chapters Endpoints", () => {
  let sut: SpotifyApi;
  let fetchSpy: FetchApiSpy;

  beforeEach(() => {
    [sut, fetchSpy] = buildIntegrationTestSdkInstance();
  });

  it("getChapter can return information", async () => {
    const valid = validAudiobookChapterResponse();
    const result = await sut.chapters.get(valid.id, "GB");

    expect(fetchSpy.request(0).input).toBe(
      `https://api.spotify.com/v1/chapters/${valid.id}?market=GB`,
    );
    expect(result.id).toBe(valid.id);
  });

  it("getChapters can return multiple items at once", async () => {
    const valid = validAudiobookChapterResponse();
    const result = await sut.chapters.get([valid.id, valid.id], "GB");

    expect(fetchSpy.request(0).input).toBe(
      `https://api.spotify.com/v1/chapters?ids=${valid.id}%2C${valid.id}&market=GB`,
    );
    expect(result[0].id).toBe(valid.id);
    expect(result[1].id).toBe(valid.id);
  });
});
