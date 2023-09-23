import { beforeEach, describe, expect, it } from "vitest";
import { buildIntegrationTestUserSdkInstance } from "../test/SpotifyApiBuilder";
import EndpointsBase from "./EndpointsBase";
import { FetchApiSpy } from "../test/FetchApiSpy";
import { SpotifyApi } from "../SpotifyApi";

describe("EndpointsBase", async () => {

    let api: SpotifyApi;
    let sut: FakeEndPoints;
    let fetchSpy: FetchApiSpy;

    beforeEach(() => {
        [api, fetchSpy] = buildIntegrationTestUserSdkInstance();
        sut = new FakeEndPoints(api);
    });

    it("paramsFor omits undefined", () => {
        const result = sut.functionThatPassesUndefined();
        expect(result).toBe("");
    });

    it("paramsFor omits null", () => {
        const result = sut.functionThatPassesNull();
        expect(result).toBe("");
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

    it("paramsFor can correctly url encode a 0", () => {
        const result = sut.functionWitNumericParam(0);
        expect(result).toBe("?id=0");
    });

    it("paramsFor can correctly url encode a non-zero number", () => {
        const result = sut.functionWitNumericParam(1);
        expect(result).toBe("?id=1");
    });
});


class FakeEndPoints extends EndpointsBase {
    public functionThatPassesUndefined() {
        return this.paramsFor({ id: undefined });
    }
    
    public functionThatPassesNull() {
        return this.paramsFor({ id: null });
    }
    
    public functionWithStringParam(id: string) {
        return this.paramsFor({ id });
    }

    public functionWithStringArrayParam(ids: string[]) {
        return this.paramsFor({ ids });
    }

    public functionWithBooleanParam(id: boolean) {
        return this.paramsFor({ id });
    }

    public functionWitNumericParam(id: number) {
        return this.paramsFor({ id });
    }
}
