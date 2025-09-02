import { scrypt } from 'node:crypto'

import {
  constantTimeEqual,
  decodeHex,
  encodeHex,
} from '@/server/auth/core/crypto'

export class Password {
  private static dkLen: number = 64

  static async hash(password: string): Promise<string> {
    const salt = encodeHex(crypto.getRandomValues(new Uint8Array(16)))
    const key = await this.generateKey(password.normalize('NFKC'), salt)
    return `${salt}:${encodeHex(key)}`
  }

  static async verify(hash: string, password: string): Promise<boolean> {
    const parts = hash.split(':')
    if (parts.length !== 2) return false

    const [salt, key] = parts
    const targetKey = await this.generateKey(password.normalize('NFKC'), salt)
    return constantTimeEqual(targetKey, decodeHex(key ?? ''))
  }

  private static async generateKey(
    data: string,
    salt?: string,
  ): Promise<Uint8Array> {
    const textEncoder = new TextEncoder()
    return new Promise((resolve, reject) => {
      scrypt(
        textEncoder.encode(data),
        textEncoder.encode(salt),
        this.dkLen,
        (error, derivedKey) => {
          if (error) reject(error)
          else resolve(new Uint8Array(derivedKey))
        },
      )
    })
  }
}
