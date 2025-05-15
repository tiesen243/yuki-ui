import type { authOptions } from '@/server/auth/config'
import type { BaseProvider } from '@/server/auth/providers/base'
import { users } from '@/server/db/schema'

export type Providers = Record<string, BaseProvider>

export interface AuthOptions<T extends Providers = Providers> {
  cookieKey: string
  cookieOptions: {
    expires?: Date | number
    maxAge?: number
    domain?: string
    path: string
    secure: boolean
    httpOnly: boolean
    sameSite: 'strict' | 'lax' | 'none'
    priority?: 'low' | 'medium' | 'high'
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
