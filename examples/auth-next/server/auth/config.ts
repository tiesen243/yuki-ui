// oxlint-disable node/no-process-env

import fs from 'node:fs'
import path from 'node:path'

import type {
  Account,
  AuthAdapter,
  AuthConfig,
  Session,
  User,
} from '@/server/auth/core/types'

import { Vercel } from '@/server/auth/core/providers/vercel'

const dataDir = path.join(process.cwd(), '.next')
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })

const AUTH_FILE = path.join(dataDir, 'auth.json')

interface AuthData {
  users: User[]
  accounts: Account[]
  sessions: Session[]
}

const readData = (): AuthData => {
  try {
    if (fs.existsSync(AUTH_FILE)) {
      const data = fs.readFileSync(AUTH_FILE, 'utf8')
      const parsed = JSON.parse(data)
      return {
        users: parsed.users || [],
        accounts: parsed.accounts || [],
        sessions: parsed.sessions || [],
      }
    }
  } catch (error) {
    console.error(`Error reading ${AUTH_FILE}:`, error)
  }
  return { users: [], accounts: [], sessions: [] }
}

const writeData = (data: AuthData): void => {
  try {
    fs.writeFileSync(AUTH_FILE, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(`Error writing to ${AUTH_FILE}:`, error)
  }
}

const memoryAdapter = {
  createUser(user) {
    const data = readData()

    const newUser = {
      id: (data.users.length + 1).toString(),
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    data.users.push(newUser)
    writeData(data)

    return Promise.resolve(newUser)
  },
  getUser(id) {
    const { users } = readData()
    const user = users.find((u) => u.id === id) ?? null
    return Promise.resolve(user)
  },
  getUserByEmail(email) {
    const { users } = readData()
    const user = users.find((u) => u.email === email) ?? null
    return Promise.resolve(user)
  },
  getUserByAccount({ provider, providerAccountId }) {
    const { accounts, users } = readData()
    const account = accounts.find(
      (a) =>
        a.provider === provider && a.providerAccountId === providerAccountId
    )
    if (!account) return Promise.resolve(null)

    const user = users.find((u) => u.id === account.userId)
    if (!user) return Promise.resolve(null)

    return Promise.resolve({ ...user, password: account.password })
  },
  updateUser(user) {
    const data = readData()
    const index = data.users.findIndex((u) => u.id === user.id)
    if (index === -1) return Promise.resolve(null)

    const updatedUser = {
      ...data.users[index],
      ...user,
      updatedAt: new Date(),
    } as User
    data.users[index] = updatedUser
    writeData(data)

    return Promise.resolve(updatedUser)
  },
  deleteUser(id) {
    const data = readData()
    const index = data.users.findIndex((u) => u.id === id)
    if (index === -1) return Promise.resolve()

    data.users.splice(index, 1)
    writeData(data)
  },

  createSession(session) {
    const data = readData()
    data.sessions.push(session)
    writeData(data)

    return Promise.resolve(session)
  },
  getSessionWithUser(id) {
    const { sessions, users } = readData()

    const session = sessions.find((s) => s.id === id) ?? null
    if (!session) return Promise.resolve(null)

    const user = users.find((u) => u.id === session.userId) ?? null
    if (!user) return Promise.resolve(null)

    return Promise.resolve({ session, user })
  },
  updateSession(session) {
    const data = readData()

    const index = data.sessions.findIndex((s) => s.id === session.id)
    if (index === -1) return Promise.resolve(null)

    const updatedSession = {
      ...data.sessions[index],
      ...session,
    } as Session
    data.sessions[index] = updatedSession
    writeData(data)

    return Promise.resolve(updatedSession)
  },
  deleteSession(id) {
    const data = readData()

    const index = data.sessions.findIndex((s) => s.id === id)
    if (index === -1) return Promise.resolve()

    data.sessions.splice(index, 1)
    writeData(data)
  },

  getAccount(provider, providerAccountId) {
    const { accounts } = readData()
    const account =
      accounts.find(
        (a) =>
          a.provider === provider && a.providerAccountId === providerAccountId
      ) ?? null

    return Promise.resolve(account)
  },
  createAccount(account) {
    const data = readData()

    data.accounts.push(account)
    writeData(data)

    return Promise.resolve(account)
  },
} satisfies AuthAdapter

export const authConfig = {
  secret: process.env.AUTH_SECRET ?? 'secret',

  adapter: memoryAdapter,

  providers: [
    new Vercel(
      process.env.AUTH_VERCEL_ID ?? '',
      process.env.AUTH_VERCEL_SECRET ?? ''
    ),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    expiresThreshold: 60 * 60 * 24, // 1 day
    accessTokenExpiresIn: 60 * 15, // 15 minutes
  },

  cookies: {
    keys: {
      accessToken: 'auth.access_token',
      refreshToken: 'auth.refresh_token',
      state: 'auth.state',
      codeVerifier: 'auth.code',
      redirectUri: 'auth.redirect_uri',
    },

    options: {
      Path: '/',
      HttpOnly: true,
      Secure: process.env.NODE_ENV === 'production',
      SameSite: 'Lax',
    },
  },
} satisfies AuthConfig
