export interface CachePolicy {
  read: boolean;
  write: boolean;
  ttl: number;
}

export interface CacheEntry<T = unknown> {
  key: string;
  inputHash: string;
  outputHash: string;
  depHash?: string;
  version: number;
  schemaVersion: number;
  createdAt: number;
  lastAccessedAt: number;
  ttl: number;
  data: T;
  byteLength: number;
  compression: 'none' | 'gzip' | 'zstd';
  compressedLength?: number;
}

export interface CacheStats {
  hits: number;
  misses: number;
  l1Size: number;
  l2Size: number;
  evictions: number;
}
