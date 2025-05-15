import type { authOptions } from '@/server/auth/config'
import type { BaseProvider } from '@/server/auth/providers/base'
import { users } from '@/server/db/schema'

export type Providers = Record<string, BaseProvider>

export interface AuthOptions<T extends Providers = Providers> {
  cookieKey: string
  cookieOptions: {
    path: string
    httpOnly: boolean
    secure: boolean
    sameSite: 'strict' | 'lax' | 'none'
    [key: string]: unknown
  }
  session: {
    expires: number
    expiresThreshold: number
  }
  providers: T
}

export interface SessionResult {
  user?: typeof users.$inferSelect
  expires: Date
}

export type Options = typeof authOptions
