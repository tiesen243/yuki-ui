import type { AuthConfig } from '@/server/auth/types'
import { Discord } from '@/server/auth/providers/discord'
import { Facebook } from '@/server/auth/providers/facebook'
import { Figma } from '@/server/auth/providers/figma'
import { Github } from '@/server/auth/providers/github'
import { Google } from '@/server/auth/providers/google'
import { Vercel } from '@/server/auth/providers/vercel'
import { db } from '@/server/prisma'

export const authConfig = {
  secret: process.env.AUTH_SECRET,

  providers: [
    new Discord(
      process.env.AUTH_DISCORD_ID ?? '',
      process.env.AUTH_DISCORD_SECRET ?? '',
    ),
    new Facebook(
      process.env.AUTH_FACEBOOK_ID ?? '',
      process.env.AUTH_FACEBOOK_SECRET ?? '',
    ),
    new Figma(
      process.env.AUTH_FIGMA_ID ?? '',
      process.env.AUTH_FIGMA_SECRET ?? '',
    ),
    new Github(
      process.env.AUTH_GITHUB_ID ?? '',
      process.env.AUTH_GITHUB_SECRET ?? '',
    ),
    new Google(
      process.env.AUTH_GOOGLE_ID ?? '',
      process.env.AUTH_GOOGLE_SECRET ?? '',
    ),
    new Vercel(
      process.env.AUTH_VERCEL_ID ?? '',
      process.env.AUTH_VERCEL_SECRET ?? '',
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
