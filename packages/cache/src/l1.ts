import type { CacheEntry, CacheStats } from './types.js'

export class L1MemoryCache {
  readonly maxSize: number
  readonly defaultTTL: number

  private _map = new Map<string, CacheEntry>()
  private _hits = 0
  private _misses = 0
  private _evictions = 0
  private _currentSize = 0

  constructor(maxSize = 500 * 1024 * 1024, defaultTTL = 30 * 60 * 1000) {
    this.maxSize = maxSize
    this.defaultTTL = defaultTTL
  }

  get<T>(key: string): CacheEntry<T> | undefined {
    const entry = this._map.get(key)
    if (!entry) {
      this._misses++
      return undefined
    }

    if (this._isExpired(entry)) {
      this._map.delete(key)
      this._currentSize -= entry.byteLength
      this._evictions++
      this._misses++
      return undefined
    }

    this._hits++
    entry.lastAccessedAt = Date.now()

    // Bump to end (most recently used)
    this._map.delete(key)
    this._map.set(key, entry)

    return entry as CacheEntry<T>
  }

  set<T>(key: string, entry: CacheEntry<T>): void {
    const existing = this._map.get(key)
    if (existing) {
      this._currentSize -= existing.byteLength
    }

    this._map.set(key, entry as CacheEntry)
    this._currentSize += entry.byteLength

    this._evict()
  }

  has(key: string): boolean {
    const entry = this._map.get(key)
    if (!entry) return false

    if (this._isExpired(entry)) {
      this._map.delete(key)
      this._currentSize -= entry.byteLength
      this._evictions++
      return false
    }

    return true
  }

  delete(key: string): boolean {
    const entry = this._map.get(key)
    if (!entry) return false

    this._currentSize -= entry.byteLength
    this._map.delete(key)

    return true
  }

  clear(): void {
    this._map.clear()
    this._currentSize = 0
  }

  get size(): number {
    return this._currentSize
  }

  get count(): number {
    return this._map.size
  }

  keys(): IterableIterator<string> {
    return this._map.keys()
  }

  get stats(): CacheStats {
    return {
      hits: this._hits,
      misses: this._misses,
      l1Size: this._currentSize,
      l2Size: 0,
      evictions: this._evictions,
    }
  }

  private _isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.createdAt > entry.ttl
  }

  private _evict(): void {
    while (this._currentSize > this.maxSize && this._map.size > 0) {
      const oldestKey = this._map.keys().next().value
      if (oldestKey === undefined) break

      const oldest = this._map.get(oldestKey)
      if (oldest) {
        this._currentSize -= oldest.byteLength
      }
      this._map.delete(oldestKey)
      this._evictions++
    }
  }
}
