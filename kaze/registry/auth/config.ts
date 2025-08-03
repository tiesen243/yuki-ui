import type { AuthOptions } from '@/server/auth/core/types'
import { encodeHex, hashSecret } from '@/server/auth/core/crypto'
import Discord from '@/server/auth/providers/discord'

const adapter = getAdapter()
export const authOptions = {
  adapter,
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    expiresThreshold: 60 * 60 * 24 * 7, // 7 days
  },
  providers: {
    discord: new Discord({
      clientId: process.env.AUTH_DISCORD_ID ?? '',
      clientSecret: process.env.AUTH_DISCORD_SECRET ?? '',
    }),
  },
} satisfies AuthOptions

export type Providers = keyof typeof authOptions.providers

export async function validateSessionToken(token: string) {
  const hashToken = encodeHex(await hashSecret(token))
  return await adapter.getSessionAndUser(hashToken)
}

export async function invalidateSessionToken(token: string) {
  const hashToken = encodeHex(await hashSecret(token))
  await adapter.deleteSession(hashToken)
}

function getAdapter(): AuthOptions['adapter'] {
  return {
    getUserByEmail: async (_email) => {
      return null
    },
    createUser: async (_data) => {
      return null
    },

    getAccount: async (_provider, _accountId) => {
      return null
    },
    createAccount: async (_data) => {},

    getSessionAndUser: async (_token) => {
      return null
    },
    createSession: async (_data) => {},
    updateSession: async (_token, _data) => {},
    deleteSession: async (_token) => {},
  }
}

declare module '@/server/auth/core/types.d.ts' {
  interface User {
    id: string
    email: string
    name: string
    image: string
  }
  interface Session {
    token: string
    userId: string
    expires: Date
  }
}
