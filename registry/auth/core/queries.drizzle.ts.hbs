'use server'

import { cookies } from 'next/headers'
import { sha256 } from '@oslojs/crypto/sha2'
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding'
import { eq } from 'drizzle-orm'

import type { SessionResult } from '@/server/auth/types'
import {
  SESSION_COOKIE_NAME,
  SESSION_EXPIRATION,
  SESSION_REFRESH_THRESHOLD,
  TOKEN_BYTES,
} from '@/server/auth/config'
import { verify } from '@/server/auth/core/password'
import { db } from '@/server/db'
import { accounts, sessions, users } from '@/server/db/schema'

async function createSession(
  userId: string,
): Promise<{ sessionToken: string; expires: Date }> {
  const bytes = new Uint8Array(TOKEN_BYTES)
  crypto.getRandomValues(bytes)
  const token = encodeBase32LowerCaseNoPadding(bytes)

  const sessionToken = hashSHA256(token)
  const expires = new Date(Date.now() + SESSION_EXPIRATION)

  // Store the hashed token in the database
  const [session] = await db
    .insert(sessions)
    .values({ sessionToken, expires, userId })
    .returning()

  if (!session) throw new Error('Failed to create session')

  // Return the unhashed token to the client along with expiration
  return { sessionToken: token, expires: session.expires }
}

async function validateToken(token: string): Promise<SessionResult> {
  const sessionToken = hashSHA256(token)

  // Lookup the session and associated user in the database
  const [result] = await db
    .select({
      sessionToken: sessions.sessionToken,
      expires: sessions.expires,
      user: users,
    })
    .from(sessions)
    .where(eq(sessions.sessionToken, sessionToken))
    .innerJoin(users, eq(users.id, sessions.userId))

  // Return early if session not found
  if (!result) return { expires: new Date() }

  const { user, ...session } = result
  const now = Date.now()

  // Check if session has expired
  if (now > session.expires.getTime()) {
    await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken))
    return { expires: new Date() }
  }

  // Refresh session if it's beyond the refresh threshold
  if (now >= session.expires.getTime() - SESSION_REFRESH_THRESHOLD) {
    const newExpires = new Date(Date.now() + SESSION_EXPIRATION)
    await db
      .update(sessions)
      .set({ expires: newExpires })
      .where(eq(sessions.sessionToken, sessionToken))
    session.expires = newExpires
  }

  return { user, expires: session.expires }
}

async function invalidateToken(token: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.sessionToken, hashSHA256(token)))
}

async function invalidateAllTokens(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId))
}

async function signIn(input: {
  email: string
  password: string
}): Promise<{ sessionToken: string; expires: Date }> {
  const [user] = await db
    .select({ id: users.id, password: users.password })
    .from(users)
    .where(eq(users.email, input.email))

  if (!user?.password || !verify(input.password, user.password))
    throw new Error('Invalid email or password')

  return createSession(user.id)
}

async function signOut(request?: Request): Promise<void> {
  const nextCookies = await cookies()

  const token =
    nextCookies.get(SESSION_COOKIE_NAME)?.value ??
    request?.headers.get('Authorization')?.replace('Bearer ', '') ??
    ''

  if (token) await invalidateToken(token)
  if (!request) nextCookies.delete(SESSION_COOKIE_NAME)
}

async function getOrCreateUserFromOAuth(data: {
  provider: string
  providerAccountId: string
  name: string
  email: string
  image: string
}): Promise<typeof users.$inferSelect> {
  const { provider, providerAccountId, email } = data

  const existingAccount = await db.query.accounts.findFirst({
    where: (accounts, { and, eq }) =>
      and(
        eq(accounts.provider, provider),
        eq(accounts.providerAccountId, providerAccountId),
      ),
    with: { user: true },
  })
  if (existingAccount?.user) return existingAccount.user

  return await db.transaction(async (tx) => {
    const existingUser = await tx.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    })

    if (existingUser) {
      await tx.insert(accounts).values({
        provider,
        providerAccountId,
        userId: existingUser.id,
      })
      return existingUser
    }

    const [newUser] = await tx.insert(users).values(data).returning()
    if (!newUser) throw new Error('Failed to create user')

    await tx.insert(accounts).values({
      provider,
      providerAccountId,
      userId: newUser.id,
    })

    return newUser
  })
}

function hashSHA256(str: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(str)))
}

export {
  signIn,
  signOut,
  getOrCreateUserFromOAuth,
  createSession,
  validateToken,
  invalidateToken,
  invalidateAllTokens,
}
