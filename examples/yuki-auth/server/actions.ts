'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { and, eq } from 'drizzle-orm'

import type { Account } from '@/server/auth/types'
import { auth } from '@/server/auth'
import { accounts } from '@/server/drizzle/schema'
import { db } from '@/server/drizzle'

export async function getLinkedAccounts(): Promise<Account[]> {
  const session = await auth({ headers: await headers() })
  if (!session.user) return []

  const records = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, session.user.id))

  return records
}

export async function unlinkAccount(provider: string, accountId: string) {
  const session = await auth({ headers: await headers() })
  if (!session.user) throw new Error('Not authenticated')

  await db
    .delete(accounts)
    .where(
      and(
        eq(accounts.userId, session.user.id),
        eq(accounts.provider, provider),
        eq(accounts.accountId, accountId),
      ),
    )

  revalidatePath('/')
}
