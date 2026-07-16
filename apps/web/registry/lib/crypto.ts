// oxlint-disable no-bitwise

export function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) return false

  let c = 0
  for (let i = 0; i < a.byteLength; i += 1) c |= (a[i] ?? 0) ^ (b[i] ?? 0)
  return c === 0
}

export function encodeHex(data: Uint8Array): string {
  let result = ''

  for (const d of data) {
    result += hexAlphabet[d >> 4]
    result += hexAlphabet[d & 0x0F]
  }

  return result
}

export function decodeHex(data: string): Uint8Array {
  if (data.length % 2 !== 0) throw new Error('Invalid hex string')

  const result = new Uint8Array(data.length / 2)
  for (let i = 0; i < data.length; i += 2) {
    const high = hextDecodeMap[data[i] ?? '']
    const low = hextDecodeMap[data[i + 1] ?? '']

    if (high === undefined || low === undefined)
      throw new Error('Invalid hex string')

    result[i / 2] = (high << 4) | low
  }
  return result
}

export function encodeBase64Url(bytes: Uint8Array): string {
  let result = ''

  for (let i = 0; i < bytes.byteLength; i += 3) {
    let buffer = 0
    let bufferBitSize = 0

    for (let j = 0; j < 3 && i + j < bytes.byteLength; j += 1) {
      buffer = (buffer << 8) | (bytes[i + j] ?? 0)
      bufferBitSize += 8
    }

    for (let j = 0; j < 4; j += 1) {
      if (bufferBitSize >= 6) {
        result += base64urlAlphabet[(buffer >> (bufferBitSize - 6)) & 0x3F]
        bufferBitSize -= 6
      } else if (bufferBitSize > 0) {
        result += base64urlAlphabet[(buffer << (6 - bufferBitSize)) & 0x3F]
        bufferBitSize = 0
      } else result += '='
    }
  }

  return result
}

export function decodeBase64Url(encoded: string): Uint8Array {
  const result = new Uint8Array(Math.ceil(encoded.length / 4) * 3)
  let totalBytes = 0

  for (let i = 0; i < encoded.length; i += 4) {
    let chunk = 0
    let bitsRead = 0

    for (let j = 0; j < 4; j += 1) {
      if (encoded[i + j] === '=') continue

      if (j > 0 && encoded[i + j - 1] === '=')
        throw new Error('Invalid padding')

      const byte = encoded[i + j]
      if (byte === undefined || !(byte in base64urlDecodeMap))
        throw new Error('Invalid character')

      chunk |= (base64urlDecodeMap[byte] ?? 0) << ((3 - j) * 6)
      bitsRead += 6
    }

    if (bitsRead < 24) {
      let unused: number
      if (bitsRead === 12) unused = chunk & 0xFF_FF
      else if (bitsRead === 18) unused = chunk & 0xFF
      else throw new Error('Invalid padding')

      if (unused !== 0) throw new Error('Invalid padding')
    }

    const byteLength = Math.floor(bitsRead / 8)
    for (let k = 0; k < byteLength; k += 1) {
      result[totalBytes] = (chunk >> (16 - k * 8)) & 0xFF
      totalBytes += 1
    }
  }

  return result.slice(0, totalBytes)
}

const hexAlphabet = '0123456789abcdef'
const hextDecodeMap: Record<string, number> = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15,
}

const base64urlAlphabet =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const base64urlDecodeMap: Record<string, number> = {
  '0': 52,
  '1': 53,
  '2': 54,
  '3': 55,
  '4': 56,
  '5': 57,
  '6': 58,
  '7': 59,
  '8': 60,
  '9': 61,
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
  a: 26,
  b: 27,
  c: 28,
  d: 29,
  e: 30,
  f: 31,
  g: 32,
  h: 33,
  i: 34,
  j: 35,
  k: 36,
  l: 37,
  m: 38,
  n: 39,
  o: 40,
  p: 41,
  q: 42,
  r: 43,
  s: 44,
  t: 45,
  u: 46,
  v: 47,
  w: 48,
  x: 49,
  y: 50,
  z: 51,
  '-': 62,
  _: 63,
}
