import { Password } from '@/server/auth/core/password'
import { beforeEach, describe } from 'bun:test'
import { it } from 'node:test'

describe('Password', () => {
  let password: Password

  beforeEach(() => {
    password = new Password()
  })

  it('should hash and verify a password correctly', async () => {
    const plainPassword = 'SecureP@ssw0rd!'
    const hash = await password.hash(plainPassword)

    const isValid = await password.verify(hash, plainPassword)
    if (!isValid) throw new Error('Password verification failed')

    const isInvalid = await password.verify(hash, 'WrongPassword')
    if (isInvalid) throw new Error('Password verification should have failed')
  })

  it('should return false for malformed hash', async () => {
    const isValid = await password.verify('malformedhash', 'SomePassword')
    if (isValid) throw new Error('Malformed hash should not verify')
  })
})
