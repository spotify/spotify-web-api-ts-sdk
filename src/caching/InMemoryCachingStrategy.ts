import GenericCache from "./GenericCache";
import { ICacheStore } from "./ICacheStore";

export default class InMemoryCachingStrategy extends GenericCache {
    constructor() {
        super(new DictionaryCacheStore());
    }
}

class DictionaryCacheStore implements ICacheStore {
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
