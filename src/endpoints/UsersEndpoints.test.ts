import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestSdkInstance } from "../test/SpotifyApiBuilder";
import { SpotifyApi } from "../SpotifyApi";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { validUser } from "../test/data/validUser";

describe("Integration: Users Endpoints", () => {
    let sut: SpotifyApi;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [sut, fetchSpy] = buildIntegrationTestSdkInstance();
    });

    it("getUserProfile can return information", async () => {
        const valid = validUser();
        const result = await sut.users.profile(valid.id);

        expect(fetchSpy.request(0).input).toBe(`https://api.spotify.com/v1/users/${valid.id}`);
        expect(result.id).toBe(valid.id);
        expect(result.display_name).toBe(valid.display_name);
    });
});
