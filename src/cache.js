class Cache{
    constructor() {
        this.store = new Map();
    }

    set(key, value, accessCount = 1) {
        this.store.set(key, { value, remainingAccess: accessCount });
    }

    get(key) {
        const entry = this.store.get(key);
        if (!entry || entry.remainingAccess <= 0) {
            return null;
        }
        entry.remainingAccess--;
        if (entry.remainingAccess <= 0) {
            this.store.delete(key);
        }
        return entry.value;
    }

    access(key) {
        const entry = this.store.get(key);
        return entry && entry.remainingAccess > 0 ? entry.remainingAccess : null;
    }

    pairs() {
        return Array.from(this.store.entries()).map(([key, { value, remainingAccess }]) => ({
            key,
            value,
            remaining: remainingAccess,
        }));
    }

    getStats() {
        return this.pairs();
    }
}
export {Cache}