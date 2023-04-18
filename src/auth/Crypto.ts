export class Crypto {
    public static get current() {
        return this.hasSubtleCrypto ? window.crypto : this.tryLoadNodeWebCrypto();
    }

    private static get hasSubtleCrypto() {
        return typeof window !== 'undefined' && typeof window.crypto !== 'undefined' && typeof window.crypto.subtle !== 'undefined';
    }

    private static tryLoadNodeWebCrypto() {
        try {
            // Deliberately avoid bundling for browsers depending
            // on node by doing this require during execution.
            const { webcrypto } = require('crypto');
            return webcrypto;
        } catch (e) {
            throw e;
        }
    }
}
