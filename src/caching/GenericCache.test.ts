import { beforeEach, describe, expect, it } from "vitest";
import GenericCache from "./GenericCache";
import { ICacheStore } from "./ICacheStore";

describe('GenericCache', () => {

    let store: ICacheStore;
    let sut: GenericCache;
    beforeEach(() => {
        store = new TestCacheStore();
        sut = new GenericCache(store);
    });

    it("get item that isn't in the cache, returns null", async () => {
        const result = await sut.get<{ test: string }>('test');
        expect(result).toBeNull();
    });

    it('should set and get a value', async () => {
        sut.set('test', { test: "test" }, 1000);
        const result = await sut.get<{ test: string }>('test');
        expect(result?.test).toBe('test');
    });

    it('should remove a value', async () => {
        sut.set('test', { test: "test" }, 1000);
        sut.remove('test');
        const result = await sut.get<{ test: string }>('test');
        expect(result).toBeNull();
    });

    it('should return null for expired value', async () => {
        sut.set('test', { test: "test" }, 0);
        const result = await sut.get<{ test: string }>('test');
        expect(result).toBeNull();
    });

    it("should return and remove value if expiresOnAccess is true", async () => {
        const value = { test: "test", expiresOnAccess: true };
        sut.setCacheItem('test', value);

        const result = await sut.get<{ test: string }>('test');
        expect(result).toEqual(value);

        const result2 = await sut.get<{ test: string }>('test');
        expect(result2).toBeNull();
    });

    it("should throw an error if the factory func fails to create an object", async () => {
        await expect(sut.getOrCreate('test', async () => {
            return null as any;
        })).rejects.toThrow("Could not create cache item");
    });

    it("should return the created object if the factory func succeeds", async () => {
        const result = await sut.getOrCreate('test', async () => {
            return { test: "test" };
        });
        expect(result.test).toBe("test");
    });

    it("should return existing item if it exists in the cache when getOrCreate is called", async () => {
        sut.set('test', { test: "test" }, 1000);

        const result = await sut.getOrCreate('test', async () => {
            return { test: "test2" };
        });

        expect(result.test).toBe("test");
    });

    it("can renew an item if an update function is provided and it's within two minutes of expiry", async () => {
        sut = new GenericCache(store, new Map(), 100); // Auto-renew checks every 100ms
        const expiry = Date.now() + (1 * (60 * 1000)); // One minute from now

        await sut.getOrCreate('test', async () => {
            return { test: "test", expires: expiry, };
        }, async (item) => {
            return { test: "test2", expires: Date.now() + 10 * (60 * 1000) };
        });

        await wait(500);

        const result = await sut.get<{ test: string }>('test');

        expect(result!.test).toBe("test2");
    });

    it("does not renew an item if an update function is provided and it's not yet within two minutes of expiry", async () => {
        sut = new GenericCache(store, new Map(), 100); // Auto-renew checks every 100ms
        const expiry = Date.now() + (3 * (60 * 1000)); // Three minutes from now

        await sut.getOrCreate('test', async () => {
            return { test: "test", expires: expiry, };
        }, async (item) => {
            throw new Error("Should not be called");
        });

        await wait(500);

        const result = await sut.get<{ test: string }>('test');

        expect(result!.test).toBe("test");
    });

    it("renewal triggered by get request when auto-renewal disabled and item within refresh window", async () => {
        sut = new GenericCache(store, new Map(), -1); // Auto-renewal disabled
        const expiry = Date.now() + (1 * (60 * 1000)); // One minute from now

        await sut.getOrCreate('test', async () => {
            return { test: "test", expires: expiry, };
        }, async (item) => {
            return { test: "test2", expires: Date.now() + 10 * (60 * 1000) };
        });

        let result = await sut.get<{ test: string }>('test');

        expect(result!.test).toBe("test2");
    });

    it("renewal triggered by get request, which errors, when auto-renewal disabled, returns un-renewed item", async () => {
        sut = new GenericCache(store, new Map(), -1); // Auto-renewal disabled
        const expiry = Date.now() + (1 * (60 * 1000)); // One minute from now

        await sut.getOrCreate('test', async () => {
            return { test: "test", expires: expiry, };
        }, async (item) => {
            throw new Error("Test error");
        });

        let result = await sut.get<{ test: string }>('test');

        expect(result!.test).toBe("test");
    });

    it("renewal triggered by autorenew, fails gracefully, returns un-renewed item", async () => {
        sut = new GenericCache(store, new Map(), 100); // Auto-renew checks every 100ms
        const expiry = Date.now() + (1 * (60 * 1000)); // One minute from now

        await sut.getOrCreate('test', async () => {
            return { test: "test", expires: expiry, };
        }, async (item) => {
            throw new Error("Test error");
        });

        await wait(500);

        const result = await sut.get<{ test: string }>('test');

        expect(result!.test).toBe("test");
    });

    it("renewal triggered for item which has already been explicitly removed, skips renewal attempt", async () => {
        sut = new GenericCache(store, new Map(), 10); // Auto-renew checks every 100ms
        const expiry = Date.now() + (1 * (60 * 1000)); // One minute from now

        let renewCalled = false;

        await sut.getOrCreate('test', async () => {
            return { test: "test", expires: expiry, };
        }, async (item) => {
            renewCalled = true;
            throw new Error("Should not be called");
        });

        sut.remove('test');

        await wait(50);
        expect(renewCalled).toBe(false);
    });
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class TestCacheStore implements ICacheStore {
    private cache = new Map<string, string>();

    public get(key: string): string | null {
        return this.cache.get(key) ?? null;
    }

    public set(key: string, value: string): void {
        this.cache.set(key, value);
    }

    public remove(key: string): void {
        this.cache.delete(key);
    }
}