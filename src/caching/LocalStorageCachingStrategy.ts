import GenericCache from "./GenericCache";
import { ICacheStore } from "./ICacheStore";

export default class LocalStorageCachingStrategy extends GenericCache {
    constructor() {
        super(new LocalStorageCacheStore());
    }
}

class LocalStorageCacheStore implements ICacheStore {
    public get(key: string): string | null {
        return localStorage.getItem(key);
    }

    public set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }
}
