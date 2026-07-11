const MAGIC = 0x4b434d42;
const HEADER_SIZE = 28;

interface EmbeddingHeader {
  magic: number;
  version: number;
  numVectors: number;
  dimensions: number;
  keyTableSize: number;
  floatDataSize: bigint;
}

function writeHeader(view: DataView, offset: number, header: EmbeddingHeader): void {
  view.setUint32(offset, header.magic, true);
  view.setUint32(offset + 4, header.version, true);
  view.setUint32(offset + 8, header.numVectors, true);
  view.setUint32(offset + 12, header.dimensions, true);
  view.setUint32(offset + 16, header.keyTableSize, true);
  view.setBigUint64(offset + 20, header.floatDataSize, true);
}

function readHeader(view: DataView, offset: number): EmbeddingHeader {
  const magic = view.getUint32(offset, true);
  if (magic !== MAGIC) {
    throw new Error(
      `Invalid magic number: expected 0x${MAGIC.toString(16)}, got 0x${magic.toString(16)}`
    );
  }
  return {
    magic,
    version: view.getUint32(offset + 4, true),
    numVectors: view.getUint32(offset + 8, true),
    dimensions: view.getUint32(offset + 12, true),
    keyTableSize: view.getUint32(offset + 16, true),
    floatDataSize: view.getBigUint64(offset + 20, true),
  };
}

export function encodeEmbeddings(embeddings: Map<string, Float32Array>): Buffer {
  const entries = Array.from(embeddings.entries());
  if (entries.length === 0) {
    const buf = Buffer.alloc(HEADER_SIZE);
    const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
    writeHeader(view, 0, { magic: MAGIC, version: 1, numVectors: 0, dimensions: 0, keyTableSize: 0, floatDataSize: BigInt(0) });
    return buf;
  }

  const dimensions = entries[0]![1].length;
  for (const [key, vec] of entries) {
    if (vec.length !== dimensions) {
      throw new Error(
        `Inconsistent embedding dimensions: key "${key}" has ${vec.length}, expected ${dimensions}`
      );
    }
  }

  const numVectors = entries.length;
  const keyTableEntries: { key: string; byteOffset: number }[] = [];
  let keyTableSize = 0;
  for (const [key] of entries) {
    const keyBytes = Buffer.byteLength(key, 'utf-8');
    keyTableEntries.push({ key, byteOffset: keyTableSize });
    keyTableSize += 4 + keyBytes;
  }

  const floatDataSize = numVectors * dimensions * 4;
  const indexSize = numVectors * 8;
  const totalSize = HEADER_SIZE + keyTableSize + floatDataSize + indexSize;

  const buf = Buffer.alloc(totalSize);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);

  writeHeader(view, 0, {
    magic: MAGIC,
    version: 1,
    numVectors,
    dimensions,
    keyTableSize,
    floatDataSize: BigInt(floatDataSize),
  });

  let keyOffset = HEADER_SIZE;
  for (const { key } of keyTableEntries) {
    const keyBytes = Buffer.byteLength(key, 'utf-8');
    view.setUint32(keyOffset, keyBytes, true);
    buf.write(key, keyOffset + 4, keyBytes, 'utf-8');
    keyOffset += 4 + keyBytes;
  }

  let floatOffset = HEADER_SIZE + keyTableSize;
  for (const [, vec] of entries) {
    for (let i = 0; i < dimensions; i++) {
      view.setFloat32(floatOffset + i * 4, vec[i]!, true);
    }
    floatOffset += dimensions * 4;
  }

  let indexOffset = HEADER_SIZE + keyTableSize + floatDataSize;
  let cumulativeOffset = 0;
  for (let i = 0; i < numVectors; i++) {
    view.setBigUint64(indexOffset + i * 8, BigInt(cumulativeOffset), true);
    cumulativeOffset += dimensions * 4;
  }

  return buf;
}

export function decodeEmbeddings(buffer: Buffer): { embeddings: Map<string, Float32Array>; numVectors: number; dimensions: number } {
  if (buffer.byteLength < HEADER_SIZE) {
    throw new Error(`Buffer too small: ${buffer.byteLength} bytes, minimum ${HEADER_SIZE}`);
  }

  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const header = readHeader(view, 0);

  if (header.numVectors === 0) {
    return { embeddings: new Map(), numVectors: 0, dimensions: 0 };
  }

  const expectedFloatSize = Number(header.floatDataSize);
  const expectedIndexSize = header.numVectors * 8;
  const expectedTotal = HEADER_SIZE + header.keyTableSize + expectedFloatSize + expectedIndexSize;

  if (buffer.byteLength < expectedTotal) {
    throw new Error(
      `Buffer too short: ${buffer.byteLength} bytes, expected at least ${expectedTotal}`
    );
  }

  const keys: string[] = [];
  let keyOffset = HEADER_SIZE;
  for (let i = 0; i < header.numVectors; i++) {
    const keyLen = view.getUint32(keyOffset, true);
    keyOffset += 4;
    const key = buffer.toString('utf-8', keyOffset, keyOffset + keyLen);
    keys.push(key);
    keyOffset += keyLen;
  }

  const floatStart = HEADER_SIZE + header.keyTableSize;
  const embeddings = new Map<string, Float32Array>();

  for (let i = 0; i < header.numVectors; i++) {
    const vec = new Float32Array(header.dimensions);
    const startOffset = floatStart + i * header.dimensions * 4;
    for (let j = 0; j < header.dimensions; j++) {
      vec[j] = view.getFloat32(startOffset + j * 4, true);
    }
    embeddings.set(keys[i]!, vec);
  }

  return { embeddings, numVectors: header.numVectors, dimensions: header.dimensions };
}
