import type { AuthOptions } from '@/server/auth/core/types'
import type {
  Session as ISession,
  User as IUser,
} from '@/server/db/auth.schema'
import { encodeHex, hashSecret } from '@/server/auth/core/crypto'
import Discord from '@/server/auth/providers/discord'
import { accounts, sessions, users } from '@/server/db/auth.models'

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
    getUserByEmail: async (email) => {
      const user = await users.findOne({ email })
      if (!user) return null
      return { ...user.toObject(), id: user._id }
    },
    createUser: async (data) => {
      const user = await users.create(data)
      return { ...user.toObject(), id: user._id }
    },

    getAccount: async (provider, accountId) => {
      const account = await accounts.findOne({ provider, accountId })
      if (!account) return null
      return {
        ...account.toObject(),
        password: account.password ?? null,
      }
    },
    createAccount: async (data) => {
      await accounts.create(data)
    },

    getSessionAndUser: async (token) => {
      const session = await sessions.findOne({ token })
      if (!session) return null
      const user = await users.findById(session.userId)
      if (!user) return null
      return {
        user: { ...user.toObject(), id: user._id },
        expires: session.expires,
      }
    },
    createSession: async (data) => {
      await sessions.create(data)
    },
    updateSession: async (token, data) => {
      await sessions.findOneAndUpdate({ token }, { $set: data }, { new: true })
    },
    deleteSession: async (token) => {
      await sessions.deleteOne({ token })
    },
  }
}

declare module '@/server/auth/core/types.d.ts' {
  interface User extends Omit<IUser, '_id'> {
    id: string
  }
  interface Session extends ISession {
    token: string
  }
}
