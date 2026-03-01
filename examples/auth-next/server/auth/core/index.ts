import type {
  AuthConfig,
  SessionWithUser,
  User,
} from '@/server/auth/core/types'

import {
  constantTimeEqual,
  decodeHex,
  encodeHex,
  generateSecureString,
  generateStateOrCode,
  hashSecret,
} from '@/server/auth/core/crypto'
import { JWT } from '@/server/auth/core/jwt'
import { Password } from '@/server/auth/core/password'

const PATH_REGEXS = {
  getSession: /^(?:\/([^/]+))?\/api\/auth\/get-session$/,
  getCurrentUser: /^(?:\/([^/]+))?\/api\/auth\/get-current-user$/,
  refreshToken: /^(?:\/([^/]+))?\/api\/auth\/refresh-token$/,

  signIn: /^(?:\/([^/]+))?\/api\/auth\/sign-in$/,
  signOut: /^(?:\/([^/]+))?\/api\/auth\/sign-out$/,

  oauth: /^(?:\/([^/]+))?\/api\/auth\/([^/]+)$/,
  oauthCallback: /^(?:\/([^/]+))?\/api\/auth\/([^/]+)\/callback$/,
} as const

const DEFAULT_SESSION_USER = {
  token: '',
  user: null,
  expiresAt: new Date(),
} satisfies SessionWithUser

class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export function createAuth(config: AuthConfig) {
  const { providers, adapter, cookies } = config

  const jwt = new JWT<{
    sub: string
  }>(config.secret)

  async function createAccessToken(userId: string): Promise<string> {
    const user = await adapter.getUser(userId)
    if (!user) throw new Error('User not found')

    const payload = { sub: userId }
    return jwt.sign(payload, {
      expiresIn: config.session.accessTokenExpiresIn * 1000,
    })
  }

  async function verifyAccessToken(token: string): Promise<{ userId: string }> {
    try {
      const { sub: userId } = await jwt.verify(token)
      return { userId }
    } catch (error) {
      throw new AuthError(
        error instanceof Error ? error.message : 'Invalid token'
      )
    }
  }

  async function createSession(
    userId: string
  ): Promise<{ accessToken: string; refreshToken: string; expiresAt: Date }> {
    const id = generateSecureString()
    const secret = generateSecureString()
    const hashedSecret = await hashSecret(secret)

    const refreshToken = `${id}.${secret}`
    const expiresAt = new Date(Date.now() + config.session.expiresIn * 1000)

    await adapter.createSession({
      id,
      userId: userId,
      token: encodeHex(hashedSecret),
      expiresAt,
    })

    const accessToken = await createAccessToken(userId)

    return { accessToken, refreshToken, expiresAt }
  }

  async function auth(opts: { headers: Headers }): Promise<SessionWithUser> {
    const token =
      parseCookie(opts.headers.get('Cookie'))[cookies.keys.refreshToken] ??
      opts.headers.get('Authorization')?.replace(/^Bearer\s+/, '')
    if (!token) return DEFAULT_SESSION_USER

    try {
      const [id, secret] = token.split('.')
      if (!id || !secret) return DEFAULT_SESSION_USER

      const result = await adapter.getSessionWithUser(id)
      if (!result) return DEFAULT_SESSION_USER
      const { session, user } = result

      const hashedSecret = await hashSecret(secret)
      const isValid = constantTimeEqual(hashedSecret, decodeHex(session.token))

      const now = Date.now()
      const expiresTime = new Date(session.expiresAt).getTime()

      if (!isValid || now >= expiresTime) {
        await adapter.deleteSession(id)
        return DEFAULT_SESSION_USER
      }

      if (now >= expiresTime - config.session.expiresThreshold * 1000) {
        const newExpiresAt = new Date(now + config.session.expiresIn * 1000)
        await adapter.updateSession({ id, expiresAt: newExpiresAt })
        session.expiresAt = newExpiresAt
      }

      return { token, user, expiresAt: session.expiresAt }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error)
      return DEFAULT_SESSION_USER
    }
  }

  async function getCurrentUser(opts: {
    headers: Headers
  }): Promise<User | null> {
    const token = parseCookie(opts.headers.get('Cookie'))[
      cookies.keys.accessToken
    ]
    if (!token) return null

    const { userId } = await verifyAccessToken(token)
    const user = await adapter.getUser(userId)
    if (!user) return null

    return user
  }

  async function signIn(opts: { email: string; password: string }) {
    const user = await adapter.getUserByAccount({
      provider: 'credentials',
      providerAccountId: opts.email,
    })
    if (!user || user.password !== opts.password)
      throw new AuthError('Invalid credentials')

    if (!(await new Password().verify(user.password, opts.password)))
      throw new AuthError('Invalid credentials')

    return createSession(user.id)
  }

  async function signOut({ headers }: { headers: Headers }): Promise<void> {
    const token =
      parseCookie(headers.get('Cookie'))['auth_token'] ??
      headers.get('Authorization')?.replace(/^Bearer\s+/, '')
    if (!token) return

    const [id] = token.split('.')
    if (id) await adapter.deleteSession(id)
  }

  async function startOAuthFlow(url: URL): Promise<Response> {
    const provider = url.pathname.match(PATH_REGEXS.oauth)?.[2]
    const instance = providers.find((p) => p.providerName === provider)
    if (!instance) throw new Error(`Provider "${provider}" not supported`)

    const state = generateStateOrCode()
    const code = generateStateOrCode()
    const redirect = url.searchParams.get('redirect_uri') ?? '/'
    const authorizationUrl = await instance.createAuthorizationUrl(state, code)

    const response = new Response(null, { status: 302 })
    response.headers.set('Location', authorizationUrl.toString())
    response.headers.append(
      'Set-Cookie',
      serializeCookie(cookies.keys.state, state, { 'Max-Age': 300 })
    )
    response.headers.append(
      'Set-Cookie',
      serializeCookie(cookies.keys.codeVerifier, code, { 'Max-Age': 300 })
    )
    response.headers.append(
      'Set-Cookie',
      serializeCookie(cookies.keys.redirectUri, redirect, { 'Max-Age': 300 })
    )

    return response
  }

  async function handleOAuthCallback(
    url: URL,
    headers: Headers
  ): Promise<Response> {
    const provider = url.pathname.match(PATH_REGEXS.oauthCallback)?.[2] ?? ''
    const instance = providers.find((p) => p.providerName === provider)
    if (!instance) throw new Error(`Provider "${provider}" not supported`)

    const cookieStore = parseCookie(headers.get('Cookie'))

    const state = url.searchParams.get('state')
    const storedState = cookieStore[cookies.keys.state]
    const code = url.searchParams.get('code') ?? ''
    const storedCode = cookieStore[cookies.keys.codeVerifier] ?? ''

    if (!state || !storedState || state !== storedState)
      throw new AuthError('Invalid state')

    const { id, ...userData } = await instance.fetchUserData(code, storedCode)
    const user = await adapter.getUserByAccount({
      provider,
      providerAccountId: id,
    })

    let userId: string
    if (user) {
      userId = user.id
    } else {
      const userByEmail = await adapter.getUserByEmail(userData.email)
      if (userByEmail) {
        await adapter.getAccount(provider, id)
        userId = userByEmail.id
      } else {
        const newUser = await adapter.createUser(userData)
        userId = newUser.id
      }
    }

    const session = await createSession(userId)
    let redirectUri = cookieStore[cookies.keys.redirectUri] ?? '/'

    const response = new Response(null, { status: 302 })
    if (['http:', 'https:', 'exp:'].some((p) => redirectUri.startsWith(p)))
      redirectUri = `${redirectUri}?access_token=${session.accessToken}&refresh_token=${session.refreshToken}`
    response.headers.set('Location', redirectUri)
    response.headers.append(
      'Set-Cookie',
      serializeCookie(cookies.keys.refreshToken, session.refreshToken, {
        ...cookies.options,
        expires: session.expiresAt.toUTCString(),
      })
    )
    response.headers.append(
      'Set-Cookie',
      serializeCookie(cookies.keys.accessToken, session.accessToken, {
        ...cookies.options,
        'Max-Age': config.session.accessTokenExpiresIn,
      })
    )

    return response
  }

  async function handleGet(req: Request): Promise<Response> {
    const url = new URL(req.url)

    if (PATH_REGEXS.getSession.test(url.pathname)) {
      const session = await auth({ headers: req.headers })
      return Response.json(session, { status: 200 })
    } else if (PATH_REGEXS.getCurrentUser.test(url.pathname)) {
      const user = await getCurrentUser({ headers: req.headers })
      return Response.json({ user }, { status: 200 })
    } else if (PATH_REGEXS.oauth.test(url.pathname)) return startOAuthFlow(url)
    else if (PATH_REGEXS.oauthCallback.test(url.pathname))
      return handleOAuthCallback(url, req.headers)

    return new Response('Not Found', { status: 404 })
  }

  async function handlePost(req: Request): Promise<Response> {
    const url = new URL(req.url)

    if (PATH_REGEXS.signIn.test(url.pathname)) {
      const { email, password } = await req.json()

      const session = await signIn({ email, password })
      const response = Response.json(session, { status: 200 })

      response.headers.append(
        'Set-Cookie',
        serializeCookie(cookies.keys.refreshToken, session.refreshToken, {
          ...cookies.options,
          expires: session.expiresAt.toUTCString(),
        })
      )
      response.headers.append(
        'Set-Cookie',
        serializeCookie(cookies.keys.accessToken, session.accessToken, {
          ...cookies.options,
          'Max-Age': config.session.accessTokenExpiresIn,
        })
      )

      return response
    } else if (PATH_REGEXS.signOut.test(url.pathname)) {
      await signOut({ headers: req.headers })
      const response = new Response(null, { status: 204 })

      response.headers.append(
        'Set-Cookie',
        serializeCookie(cookies.keys.accessToken, '', { 'Max-Age': 0 })
      )
      response.headers.append(
        'Set-Cookie',
        serializeCookie(cookies.keys.refreshToken, '', { 'Max-Age': 0 })
      )

      return response
    } else if (PATH_REGEXS.refreshToken.test(url.pathname)) {
      const session = await auth({ headers: req.headers })
      if (!session.user) throw new Error('Not authenticated')

      const newToken = await createAccessToken(session.user.id)
      const response = Response.json({ accessToken: newToken }, { status: 200 })
      response.headers.append(
        'Set-Cookie',
        serializeCookie(cookies.keys.accessToken, newToken, cookies.options)
      )

      return response
    }
    return new Response('Not Found', { status: 404 })
  }

  async function handlers(req: Request): Promise<Response> {
    let response: Response | null = null

    try {
      if (req.method === 'GET') response = await handleGet(req)
      else if (req.method === 'POST') response = await handlePost(req)
      else if (req.method === 'OPTIONS')
        response = new Response(null, { status: 204 })
      else response = new Response('Method Not Allowed', { status: 405 })
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(error)

      const _error = error instanceof Error ? error.message : 'Unknown error'
      const status = error instanceof AuthError ? 401 : 500
      response = Response.json({ error: _error }, { status })
    }

    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    )

    return response
  }

  return {
    auth,
    getCurrentUser,
    verifyAccessToken,

    signIn,
    signOut,

    handlers,
  }
}

function parseCookie(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {}

  const cookies: Record<string, string> = {}
  const pairs = cookieHeader.split(';')

  for (const pair of pairs) {
    const [key = '', value = ''] = pair.trim().split('=')
    cookies[key] = decodeURIComponent(value)
  }

  return cookies
}

function serializeCookie(
  name: string,
  value: string,
  options: Record<string, string | number | boolean> = {}
): string {
  let cookie = `${name}=${encodeURIComponent(value)}`

  for (const [key, val] of Object.entries(options)) {
    if (val === true) cookie += `; ${key}`
    else if (val !== false) cookie += `; ${key}=${val}`
  }

  return cookie
}
