import { JWT } from '@/server/auth/core/jwt'
import { describe, it, expect, beforeEach } from 'bun:test'

describe('JWT', () => {
  let jwt: JWT<{ userId: number; role: string }>

  beforeEach(() => {
    jwt = new JWT('my-secret-key')
  })

  it('should sign and verify a JWT token', async () => {
    const payload = { userId: 123, role: 'admin' }
    const token = await jwt.sign(payload, {
      audiences: 'my-audience',
      issuer: 'my-issuer',
      subject: 'my-subject',
      headers: { customHeader: 'customValue' },
      expiresIn: 600,
      includeIssuedTimestamp: true,
    })

    const verifiedPayload = await jwt.verify(token)

    expect(verifiedPayload.userId).toBe(123)
    expect(verifiedPayload.role).toBe('admin')
    expect(verifiedPayload.aud).toBe('my-audience')
    expect(verifiedPayload.iss).toBe('my-issuer')
    expect(verifiedPayload.sub).toBe('my-subject')
    expect(verifiedPayload.iat).toBeDefined()
    expect(verifiedPayload.exp).toBeDefined()
  })

  it('should throw an error for an invalid token', () => {
    const invalidToken = 'invalid.token.string'
    expect(jwt.verify(invalidToken)).rejects.toThrow('Invalid token signature')
  })

  it('should throw an error for secret key changes', async () => {
    const payload = { userId: 101, role: 'editor' }
    const token = await jwt.sign(payload, { expiresIn: 600 })

    const jwtWithDifferentKey = new JWT('different-secret-key')
    expect(jwtWithDifferentKey.verify(token)).rejects.toThrow(
      'Invalid token signature',
    )
  })

  it('should throw an error for an expired token', async () => {
    const payload = { userId: 456, role: 'user' }
    const token = await jwt.sign(payload, { expiresIn: -10 }) // Expired 10 seconds ago

    expect(jwt.verify(token)).rejects.toThrow('Token has expired')
  })

  it('should throw an error for a token not valid yet', async () => {
    const payload = { userId: 789, role: 'guest' }
    const notBefore = new Date(Date.now() + 60000) // Valid in 60 seconds
    const token = await jwt.sign(payload, { notBefore })

    expect(jwt.verify(token)).rejects.toThrow('Token not valid yet')
  })
})
