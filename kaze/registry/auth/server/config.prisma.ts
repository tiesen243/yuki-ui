import type { AuthConfig } from '@/server/auth/types'
import { Discord } from '@/server/auth/providers/discord'
import { db } from '@/server/db'

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
        const record = await db.user.findFirst({
          where: { OR: [{ id: identifier }, { email: identifier }] },
        })

        return record ?? null
      },
      async create(data) {
        const result = await db.user.create({ data })

        return result
      },
    },

    account: {
      async find(provider, accountId) {
        const record = await db.account.findUnique({
          where: { provider_accountId: { provider, accountId } },
        })

        return record ?? null
      },
      async create(data) {
        const result = await db.account.create({ data })

        return result
      },
    },

    /**
     * If you use JWT authentication, session management may not be necessary.
     * To disable sessions when using JWT, you can throw an error in the session methods:
     * ```ts
     * throw new Error("Sessions are not supported with JWT auth.");
     * ```
     */
    session: {
      async find(id) {
        const record = await db.session.findUnique({
          where: { id },
          select: {
            users: {
              select: { id: true, name: true, email: true, image: true },
            },
            token: true,
            expiresAt: true,
            ipAddress: true,
            userAgent: true,
          },
        })
        if (!record?.users) return null

        const { users, ...session } = record
        return { ...session, user: users }
      },
      async create(data) {
        await db.session.create({ data })
      },
      async update(id, data) {
        await db.session.update({ where: { id }, data })
      },
      async delete(id) {
        await db.session.delete({ where: { id } })
      },
    },
  },
} as const satisfies AuthConfig
