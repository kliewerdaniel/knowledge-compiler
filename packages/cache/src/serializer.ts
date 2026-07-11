import zlib from 'node:zlib'
import { promisify } from 'node:util'
import type { CacheEntry } from './types.js'

const gzip = promisify(zlib.gzip)
const gunzip = promisify(zlib.gunzip)

const COMPRESSION_THRESHOLD = 10 * 1024 // 10 KB
const BIGINT_MARKER = '__BIGINT__'

const FLAG_NO_COMPRESSION = 0x00
const FLAG_GZIP = 0x01

function bigIntReplacer(this: unknown, _key: string, value: unknown): unknown {
  if (typeof value === 'bigint') {
    return { [BIGINT_MARKER]: value.toString() }
  }
  if (value === undefined) {
    return undefined
  }
  return value
}

function bigIntReviver(_key: string, value: unknown): unknown {
  if (value !== null && typeof value === 'object' && BIGINT_MARKER in (value as Record<string, unknown>)) {
    const raw = (value as Record<string, string>)[BIGINT_MARKER]
    if (raw === undefined) return value
    return BigInt(raw)
  }
  return value
}

const textEncoder = new TextEncoder()

export function jsonStringifyWithBigInt(value: unknown): string {
  return JSON.stringify(value, bigIntReplacer)
}

export function jsonParseWithBigInt<T = unknown>(text: string): T {
  return JSON.parse(text, bigIntReviver) as T
}

export async function serializeEntry<T>(entry: CacheEntry<T>): Promise<Buffer> {
  const json = jsonStringifyWithBigInt(entry)
  const raw = textEncoder.encode(json)
  const rawBuffer = Buffer.from(raw.buffer, raw.byteOffset, raw.byteLength)

  if (rawBuffer.length > COMPRESSION_THRESHOLD) {
    const compressed = await gzip(rawBuffer)
    const header = Buffer.alloc(1)
    header.writeUInt8(FLAG_GZIP, 0)
    return Buffer.concat([header, compressed])
  }

  const header = Buffer.alloc(1)
  header.writeUInt8(FLAG_NO_COMPRESSION, 0)
  return Buffer.concat([header, rawBuffer])
}

export async function deserializeEntry<T>(data: Buffer): Promise<CacheEntry<T>> {
  const flags = data.readUInt8(0)
  const payload = data.subarray(1)

  let json: string
  if (flags === FLAG_GZIP) {
    const decompressed = await gunzip(payload)
    json = new TextDecoder().decode(decompressed)
  } else {
    json = new TextDecoder().decode(payload)
  }

  return jsonParseWithBigInt<CacheEntry<T>>(json)
}
