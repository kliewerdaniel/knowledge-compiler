import crypto from 'node:crypto'
import { L1MemoryCache } from './l1.js'
import { L2DiskCache } from './l2.js'
import type { CacheEntry, CacheStats } from './types.js'

export interface CacheControllerOptions {
  l1?: L1MemoryCache
  l2?: L2DiskCache
}

export class CacheController {
  private l1: L1MemoryCache
  private l2: L2DiskCache

  constructor(l1?: L1MemoryCache, l2?: L2DiskCache)
  constructor(opts: CacheControllerOptions)
  constructor(
    l1OrOpts?: L1MemoryCache | CacheControllerOptions,
    l2?: L2DiskCache,
  ) {
    if (l1OrOpts && 'l1' in l1OrOpts) {
      this.l1 = l1OrOpts.l1 ?? new L1MemoryCache()
      this.l2 = l1OrOpts.l2 ?? new L2DiskCache()
    } else {
      this.l1 = (l1OrOpts as L1MemoryCache | undefined) ?? new L1MemoryCache()
      this.l2 = l2 ?? new L2DiskCache()
    }
  }

  async get<T>(key: string): Promise<CacheEntry<T> | undefined> {
    const l1Entry = this.l1.get<T>(key)
    if (l1Entry) return l1Entry

    const l2Entry = await this.l2.get<T>(key)
    if (l2Entry) {
      this.l1.set(key, l2Entry)
    }

    return l2Entry
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    this.l1.set(key, entry)
    await this.l2.set(key, entry)
  }

  async has(key: string): Promise<boolean> {
    if (this.l1.has(key)) return true
    return this.l2.has(key)
  }

  async computeKey(input: {
    passId: string
    contentHash: string
    depHash?: string
  }): Promise<string> {
    const hash = crypto.createHash('sha256')
    hash.update(input.passId)
    hash.update('\x00')
    hash.update(input.contentHash)
    if (input.depHash) {
      hash.update('\x00')
      hash.update(input.depHash)
    }
    return hash.digest('hex')
  }

  async invalidate(pattern?: string): Promise<number> {
    let count = 0

    if (pattern) {
      const l1Keys: string[] = []
      for (const key of this.l1.keys()) {
        if (key.includes(pattern)) {
          l1Keys.push(key)
        }
      }
      for (const key of l1Keys) {
        if (this.l1.delete(key)) count++
      }
    } else {
      count = this.l1.count
      this.l1.clear()
    }

    count += await this.l2.invalidateByPattern(pattern)

    return count
  }

  async clear(): Promise<void> {
    this.l1.clear()
    await this.l2.clear()
  }

  async stats(): Promise<CacheStats> {
    const [l1Stats, l2Stats] = await Promise.all([
      Promise.resolve(this.l1.stats),
      this.l2.stats,
    ])

    return {
      hits: l1Stats.hits + l2Stats.hits,
      misses: l1Stats.misses + l2Stats.misses,
      l1Size: l1Stats.l1Size,
      l2Size: l2Stats.l2Size,
      evictions: l1Stats.evictions + l2Stats.evictions,
    }
  }
}
