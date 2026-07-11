import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import xxhashWasm from 'xxhash-wasm'
import type { CacheEntry, CacheStats } from './types.js'
import { serializeEntry, deserializeEntry } from './serializer.js'

type XXHashModule = Awaited<ReturnType<typeof xxhashWasm>>

let _xxhash: XXHashModule | null = null

async function getXXHash(): Promise<XXHashModule> {
  if (!_xxhash) {
    _xxhash = await xxhashWasm()
  }
  return _xxhash
}

function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error
}

export class L2DiskCache {
  readonly basePath: string
  readonly defaultTTL: number

  private _hits = 0
  private _misses = 0
  private _evictions = 0

  constructor(basePath = '.knowledge/cache', defaultTTL = 30 * 60 * 1000) {
    this.basePath = basePath
    this.defaultTTL = defaultTTL
  }

  async get<T>(key: string): Promise<CacheEntry<T> | undefined> {
    const filePath = await this._getFilePath(key)

    try {
      const raw = await fs.readFile(filePath)
      const entry = await deserializeEntry<T>(raw)

      if (this._isExpired(entry)) {
        await fs.unlink(filePath).catch(() => {})
        this._evictions++
        this._misses++
        return undefined
      }

      this._hits++
      return entry
    } catch (error: unknown) {
      if (isNodeError(error) && error.code === 'ENOENT') {
        this._misses++
        return undefined
      }
      throw error
    }
  }

  async set<T>(key: string, entry: CacheEntry<T>): Promise<void> {
    const filePath = await this._getFilePath(key)
    await fs.mkdir(path.dirname(filePath), { recursive: true })

    const serialized = await serializeEntry(entry)

    // Atomic write: write to temp file, then rename
    const tmpPath = filePath + '.tmp.' + crypto.randomBytes(4).toString('hex')
    await fs.writeFile(tmpPath, serialized)
    await fs.rename(tmpPath, filePath)
  }

  async has(key: string): Promise<boolean> {
    const filePath = await this._getFilePath(key)

    try {
      const raw = await fs.readFile(filePath)
      const entry = await deserializeEntry(raw)

      if (this._isExpired(entry)) {
        await fs.unlink(filePath).catch(() => {})
        this._evictions++
        return false
      }

      return true
    } catch (error: unknown) {
      if (isNodeError(error) && error.code === 'ENOENT') {
        return false
      }
      throw error
    }
  }

  async delete(key: string): Promise<boolean> {
    const filePath = await this._getFilePath(key)

    try {
      await fs.unlink(filePath)
      return true
    } catch (error: unknown) {
      if (isNodeError(error) && error.code === 'ENOENT') {
        return false
      }
      throw error
    }
  }

  async invalidateByPattern(pattern?: string): Promise<number> {
    const toDelete: string[] = []

    await this._walk(async (filePath, entry) => {
      if (!pattern || entry.key.includes(pattern)) {
        toDelete.push(filePath)
      }
    })

    for (const filePath of toDelete) {
      try {
        await fs.unlink(filePath)
      } catch {
        // Best-effort deletion
      }
    }

    return toDelete.length
  }

  async clear(): Promise<void> {
    const dataDir = path.join(this.basePath, 'data')

    try {
      await fs.rm(dataDir, { recursive: true, force: true })
    } catch {
      // Directory doesn't exist — nothing to clear
    }
  }

  async prune(maxAge?: number): Promise<number> {
    const threshold = maxAge ?? this.defaultTTL
    const now = Date.now()
    const toDelete: string[] = []

    await this._walk(async (filePath, entry) => {
      if (now - entry.createdAt > threshold) {
        toDelete.push(filePath)
      }
    })

    for (const filePath of toDelete) {
      try {
        await fs.unlink(filePath)
      } catch {
        // Best-effort deletion
      }
    }

    return toDelete.length
  }

  get stats(): Promise<CacheStats> {
    return this._computeStats()
  }

  private async _hashKey(key: string): Promise<string> {
    const xxhash = await getXXHash()
    return xxhash.h64ToString(key)
  }

  private async _getFilePath(key: string): Promise<string> {
    const hash = await this._hashKey(key)
    return path.join(this.basePath, 'data', hash.slice(0, 2), hash.slice(2))
  }

  private _isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.createdAt > entry.ttl
  }

  private async _walk(
    visitor: (filePath: string, entry: CacheEntry) => Promise<void>,
  ): Promise<void> {
    const dataDir = path.join(this.basePath, 'data')

    let dirs: string[]
    try {
      dirs = await fs.readdir(dataDir)
    } catch {
      return
    }

    for (const dir of dirs) {
      if (dir.length !== 2) continue

      const dirPath = path.join(dataDir, dir)
      let files: string[]

      try {
        files = await fs.readdir(dirPath)
      } catch {
        continue
      }

      for (const file of files) {
        const filePath = path.join(dirPath, file)

        try {
          const raw = await fs.readFile(filePath)
          const entry = await deserializeEntry(raw)
          await visitor(filePath, entry)
        } catch {
          // Skip corrupted or unreadable entries
        }
      }
    }
  }

  private async _computeStats(): Promise<CacheStats> {
    let totalSize = 0

    await this._walk(async (filePath) => {
      try {
        const stat = await fs.stat(filePath)
        totalSize += stat.size
      } catch {
        // Skip entries that disappeared
      }
    })

    return {
      hits: this._hits,
      misses: this._misses,
      l1Size: 0,
      l2Size: totalSize,
      evictions: this._evictions,
    }
  }
}
