import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestUserSdkInstance } from "../test/SpotifyApiBuilder";
import EndpointsBase from "./EndpointsBase";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { SpotifyApi } from "../SpotifyApi";

class FakeEndPoints extends EndpointsBase {
    public functionWithStringParam(id: string) {
        return this.paramsFor({ id });
    }

    public functionWithStringArrayParam(ids: string[]) {
        return this.paramsFor({ ids });
    }

    public functionWithBooleanParam(id: boolean) {
        return this.paramsFor({ id });
    }
}

describe("EndpointsBase", async () => {

    let api: SpotifyApi;
    let sut: FakeEndPoints;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [api, fetchSpy] = buildIntegrationTestUserSdkInstance();
        sut = new FakeEndPoints(api);
    });

    it("paramsFor can correctly url encode a string", () => {
        const result = sut.functionWithStringParam("one");
        expect(result).toBe("?id=one");
    });

    it("paramsFor can correctly url encode an array", () => {
        const result = sut.functionWithStringArrayParam(["one", "two"]);
        expect(result).toBe("?ids=one%2Ctwo");
    });

    it("paramsFor can correctly url encode a false boolean", () => {
        const result = sut.functionWithBooleanParam(false);
        expect(result).toBe("?id=false");
    });

});
