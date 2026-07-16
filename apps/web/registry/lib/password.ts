import { scrypt } from 'node:crypto'

import { constantTimeEqual, decodeHex, encodeHex } from '@/registry/lib/crypto'

export class Password {
  private readonly config: Omit<Password.Props, 'secret' | 'dkLen'>
  private readonly secret: string
  private readonly dkLen: number

  public constructor({ secret, dkLen, ...config }: Password.Props = {}) {
    this.secret = secret ?? ''
    this.dkLen = dkLen ?? 64

    this.config = {
      N: 16_384,
      r: 8,
      p: 1,
      maxmem: 32 * 1024 * 1024,
      ...config,
    }
  }

  public async hash(password: string): Promise<string> {
    const salt = encodeHex(crypto.getRandomValues(new Uint8Array(16)))
    const key = await this.generateKey(password.normalize('NFKC'), salt)
    return `${salt}:${encodeHex(key)}`
  }

  public async verify(hash: string, password: string): Promise<boolean> {
    try {
      const parts = hash.split(':')
      if (parts.length !== 2) return false

      const [salt = '', key = ''] = parts
      if (!salt || !key) return false

      const targetKey = await this.generateKey(password.normalize('NFKC'), salt)
      return constantTimeEqual(targetKey, decodeHex(key))
    } catch {
      return false
    }
  }

  private async generateKey(data: string, salt: string): Promise<Uint8Array> {
    const textEncoder = new TextEncoder()

    const password = textEncoder.encode(data + this.secret)
    const nonce = textEncoder.encode(salt)

    const key = await this.scrypt(password, nonce)

    return new Uint8Array(key)
  }

  private scrypt = (password: Uint8Array, salt: Uint8Array): Promise<Buffer> =>
    // oxlint-disable-next-line promise/avoid-new
    new Promise((resolve, reject) => {
      scrypt(password, salt, this.dkLen, this.config, (e, derivedKey) => {
        if (e) reject(e)
        else resolve(derivedKey)
      })
    })
}

export namespace Password {
  export interface Props {
    secret?: string
    dkLen?: number
    N?: number
    r?: number
    p?: number
    maxmem?: number
  }
}
