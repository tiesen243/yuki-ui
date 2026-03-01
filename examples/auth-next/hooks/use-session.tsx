'use client'

import { useQuery } from '@tanstack/react-query'
import * as React from 'react'

import type { SessionWithUser } from '@/server/auth/core/types'

type SessionContextValue = (
  | {
      status: 'loading'
      session: SessionWithUser | undefined
    }
  | {
      status: 'unauthenticated'
      session: null
    }
  | {
      status: 'authenticated'
      session: SessionWithUser & {
        token: string
        user: NonNullable<SessionWithUser['user']>
      }
    }
) & {
  signIn: (opts: { email: string; password: string }) => Promise<void>
  signOut: () => Promise<void>
}

const SessionContext = React.createContext<SessionContextValue | null>(null)

const useSession = () => {
  const context = React.use(SessionContext)
  if (!context)
    throw new Error('useSession must be used within a SessionProvider')
  return context
}

function SessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data, status, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await fetch('/api/auth/get-current-user')
      if (!res.ok) throw new Error('Failed to fetch session')
      return res.json() as Promise<SessionWithUser>
    },
  })

  const signIn = React.useCallback(
    async (opts: Parameters<SessionContextValue['signIn']>[0]) => {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts),
      })
      const json = await res.json()

      if (!res.ok) throw new Error(json.error ?? 'Failed to sign in')

      await refetch()
      return json
    },
    [refetch]
  )

  const signOut = React.useCallback(async () => {
    const res = await fetch('/api/auth/sign-out', { method: 'POST' })
    if (!res.ok) throw new Error('Failed to sign out')
    await refetch()
  }, [refetch])

  const value = React.useMemo(() => {
    const sessionBase = { signIn, signOut }

    if (status === 'pending')
      return { ...sessionBase, status: 'loading', session: data }
    if (status === 'error')
      return { ...sessionBase, status: 'unauthenticated', session: null }
    return { ...sessionBase, status: 'authenticated', session: data }
  }, [data, signIn, signOut, status]) as SessionContextValue

  return <SessionContext value={value}>{children}</SessionContext>
}

export { SessionProvider, useSession }
