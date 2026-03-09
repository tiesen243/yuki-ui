'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as React from 'react'

import type { SessionWithUser } from '@/server/auth/core/types'

const QUERY_KEY = [['auth', 'current-user'], { type: 'query' }]

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
  signIn: (opts: {
    email: string
    password: string
  }) => Promise<{ accessToken: string; refreshToken: string }>
  signOut: () => Promise<void>
  refreshToken: () => Promise<void>
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
  const queryClient = useQueryClient()

  const { data, status } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/auth/current-user')
      if (!res.ok) throw new Error('Failed to fetch session')
      return res.json() as Promise<SessionWithUser>
    },
    retry(failureCount, error) {
      if (error.message === 'Failed to fetch session') {
        if (failureCount > 1) return false // Don't retry more than once for session fetch errors
        fetch('/api/auth/refresh-token', { method: 'POST' })
        return true
      }

      return false
    },
  })

  const { mutateAsync: signIn } = useMutation({
    mutationKey: [['auth', 'sign-in'], { type: 'mutation' }],
    mutationFn: async (opts: Parameters<SessionContextValue['signIn']>[0]) => {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts),
      })

      if (!res.ok) throw new Error(await res.text())
      return res.json() as ReturnType<SessionContextValue['signIn']>
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })

  const { mutateAsync: signOut } = useMutation({
    mutationKey: [['auth', 'sign-out'], { type: 'mutation' }],
    mutationFn: async () => {
      const res = await fetch('/api/auth/sign-out', { method: 'POST' })
      if (!res.ok) throw new Error(await res.text())
    },
    onSuccess: () => queryClient.setQueriesData({ queryKey: QUERY_KEY }, null),
  })

  const { mutateAsync: refreshToken } = useMutation({
    mutationKey: [['auth', 'refresh-token'], { type: 'mutation' }],
    mutationFn: async () => {
      const res = await fetch('/api/auth/refresh-token', { method: 'POST' })
      if (!res.ok) throw new Error(await res.text())
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })

  const value = React.useMemo(() => {
    const sessionBase = { signIn, signOut, refreshToken }

    if (status === 'pending')
      return { ...sessionBase, status: 'loading', session: data }
    if (status === 'error' || !data?.user)
      return { ...sessionBase, status: 'unauthenticated', session: null }
    return { ...sessionBase, status: 'authenticated', session: data }
  }, [data, status, signIn, signOut, refreshToken]) as SessionContextValue

  return <SessionContext value={value}>{children}</SessionContext>
}

export { SessionProvider, useSession }
