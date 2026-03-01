import type { BaseProvider } from '@/server/auth/core/providers/base'

export type Awaitable<T> = T | PromiseLike<T>

export interface User {
  id: string
  name: string
  email: string
  image: string | null

  createdAt: Date
  updatedAt: Date
}

export interface Account {
  userId: string

  provider: string
  providerAccountId: string

  password: string | null
}

export interface Session {
  id: string
  userId: string

  token: string
  expiresAt: Date
}

export interface SessionWithUser {
  token: string | null
  user: User | null
  expiresAt: Date
}

export interface OAuth2Token {
  access_token: string
  token_type: string
  expires_in: number
}

export interface OAuthAccount {
  id: string
  name: string
  email: string
  image: string | null
}

export interface AuthAdapter {
  createUser(user: Pick<User, 'name' | 'email' | 'image'>): Awaitable<User>
  getUser: (id: string) => Awaitable<User | null>
  getUserByEmail: (email: string) => Awaitable<User | null>
  getUserByAccount: (
    account: Pick<Account, 'provider' | 'providerAccountId'>
  ) => Awaitable<(User & { password: string | null }) | null>
  updateUser: (user: Partial<User> & Pick<User, 'id'>) => Awaitable<User | null>
  deleteUser: (id: string) => Awaitable<void>

  createSession: (
    session: Pick<Session, 'id' | 'userId' | 'token' | 'expiresAt'>
  ) => Awaitable<Session>
  getSessionWithUser: (
    id: string
  ) => Awaitable<{ session: Session; user: User } | null>
  updateSession: (
    session: Partial<Session> & Pick<Session, 'id'>
  ) => Awaitable<Session | null>
  deleteSession: (id: string) => Awaitable<void>

  getAccount: (
    provider: Account['provider'],
    providerAccountId: Account['providerAccountId']
  ) => Awaitable<Account | null>
  createAccount: (account: Account) => Awaitable<Account>
}

export interface AuthConfig {
  secret: string

  adapter: AuthAdapter
  providers: BaseProvider[]

  session: {
    expiresIn: number
    expiresThreshold: number
    accessTokenExpiresIn: number
  }

  cookies: {
    keys: {
      accessToken: string
      refreshToken: string
      state: string
      codeVerifier: string
      redirectUri: string
    }

    options: {
      Path: string
      HttpOnly: boolean
      Secure: boolean
      SameSite: 'Lax' | 'Strict' | 'None'

      Domain?: string
      Expires?: Date | string
      'Max-Age'?: number
    }
  }
}
