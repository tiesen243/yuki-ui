import type { AuthConfig } from '@/server/auth/types'
import { Discord } from '@/server/auth/providers/discord'

export const authConfig = {
  secret: process.env.AUTH_SECRET,

  providers: [
    new Discord(
      process.env.AUTH_DISCORD_ID ?? '',
      process.env.AUTH_DISCORD_SECRET ?? '',
    ),
  ],

  adapter: {
    user: {
      async find(identifier) {
        throw new Error('Not implemented')
      },
      async create(data) {
        throw new Error('Not implemented')
      },
    },

    account: {
      async find(provider, accountId) {
        throw new Error('Not implemented')
      },
      async create(data) {
        throw new Error('Not implemented')
      },
    },

    session: {
      async find(id) {
        throw new Error('Not implemented')
      },
      async create(data) {
        throw new Error('Not implemented')
      },
      async update(id, data) {
        throw new Error('Not implemented')
      },
      async delete(id) {
        throw new Error('Not implemented')
      },
    },
  },
} as const satisfies AuthConfig
