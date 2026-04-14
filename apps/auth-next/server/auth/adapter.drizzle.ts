import { and, eq } from 'drizzle-orm'

import type { AuthAdapter } from '@/server/auth/core/types'

import { db } from '@/server/drizzle'
import { accounts, sessions, users } from '@/server/drizzle/schema'

export const adapter = {
  async createUser(user) {
    const [createdUser] = await db
      .insert(users)
      .values(user)
      .returning({ id: users.id })

    if (!createdUser) throw new Error('Failed to create user')
    return createdUser
  },
  async getUser(id) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    if (!user) return null
    return user
  },
  async getUserByEmail(email) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (!user) return null
    return user
  },
  async getUserByAccount({ provider, providerAccountId }) {
    const [account] = await db
      .select({
        id: users.id,
        password: accounts.password,
      })
      .from(accounts)
      .where(
        and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId)
        )
      )
      .limit(1)
      .innerJoin(users, eq(accounts.userId, users.id))

    if (!account) return null
    return account
  },
  async updateUser({ id, ...user }) {
    const [updatedUser] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning({ id: users.id })

    if (!updatedUser) return null
    return updatedUser
  },
  async deleteUser(id) {
    await db.delete(users).where(eq(users.id, id))
  },

  async createSession(session) {
    const [createdSession] = await db
      .insert(sessions)
      .values(session)
      .returning({ id: sessions.id })

    if (!createdSession) throw new Error('Failed to create session')
    return createdSession
  },
  async getSessionWithUser(id) {
    const [result] = await db
      .select({
        session: {
          id: sessions.id,
          token: sessions.token,
          expiresAt: sessions.expiresAt,
        },
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
          image: users.image,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        },
      })
      .from(sessions)
      .where(eq(sessions.id, id))
      .limit(1)
      .innerJoin(users, eq(sessions.userId, users.id))

    if (!result) return null
    return result
  },
  async updateSession({ id, ...session }) {
    const [updatedSession] = await db
      .update(sessions)
      .set(session)
      .where(eq(sessions.id, id))
      .returning({ id: sessions.id })

    if (!updatedSession) return null
    return updatedSession
  },
  async deleteSession(id) {
    await db.delete(sessions).where(eq(sessions.id, id))
  },

  async getAccount(provider, providerAccountId) {
    const [account] = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.provider, provider),
          eq(accounts.providerAccountId, providerAccountId)
        )
      )
      .limit(1)

    if (!account) return null
    return account
  },
  async createAccount(account) {
    await db.insert(accounts).values(account)
  },
} satisfies AuthAdapter
