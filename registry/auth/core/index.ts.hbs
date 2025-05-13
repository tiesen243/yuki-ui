import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { generateCodeVerifier, generateState, OAuth2RequestError } from 'arctic'

import type { AuthOptions, Providers, SessionResult } from '@/server/auth/types'
import { SESSION_COOKIE_NAME } from '@/server/auth/config'
import {
  createSession,
  getOrCreateUserFromOAuth,
  signIn,
  signOut,
  validateToken,
} from '@/server/auth/core/queries'

const DEFAULT_COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
}

export function Auth<TProviders extends Providers>(
  providers: AuthOptions<TProviders>,
) {
  async function auth(request?: NextRequest): Promise<SessionResult> {
    const token =
      (await cookies()).get(SESSION_COOKIE_NAME)?.value ??
      request?.headers.get('Authorization')?.replace('Bearer ', '') ??
      ''
    return validateToken(token)
  }

  const createRedirectResponse = (url: string | URL): Response =>
    new Response(null, {
      status: 302,
      headers: { location: url.toString() },
    })

  const handleOAuthStart = async (req: NextRequest): Promise<Response> => {
    const url = new URL(req.url)
    const redirectTo = url.searchParams.get('redirect_to') ?? '/'
    const providerName = String(url.pathname.split('/').pop())
    const provider = providers[providerName]
    if (!provider) throw new Error(`Provider ${providerName} is not supported`)

    // Handle mobile development redirects
    if (
      redirectTo.startsWith('exp://') &&
      process.env.NODE_ENV === 'development'
    ) {
      if (!process.env.AUTH_PROXY_URL)
        throw new Error('AUTH_PROXY_URL is not set')

      const redirectUrl = new URL(
        `https://${process.env.AUTH_PROXY_URL}${url.pathname}`,
      )
      redirectUrl.searchParams.set('redirect_to', redirectTo)
      return createRedirectResponse(redirectUrl)
    }

    // Generate OAuth parameters and create authorization URL
    const state = generateState()
    const codeVerifier = generateCodeVerifier()
    const authorizationUrl = provider.createAuthorizationURL(
      state,
      codeVerifier,
    )

    // Set cookies for the callback and create response
    const response = createRedirectResponse(authorizationUrl)
    const nextCookies = await cookies()
    const cookieOptions = { maxAge: 60 * 5 } // 5 minutes
    nextCookies.set('auth_state', state, cookieOptions)
    nextCookies.set('code_verifier', codeVerifier, cookieOptions)
    nextCookies.set('redirect_to', redirectTo, cookieOptions)

    return response
  }

  const handleOAuthCallback = async (req: NextRequest): Promise<Response> => {
    const url = new URL(req.url)
    const providerName = String(url.pathname.split('/').slice(-2, -1))
    const provider = providers[providerName]
    if (!provider) throw new Error(`Provider ${providerName} is not supported`)

    // Get parameters from URL and cookies
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = req.cookies.get('auth_state')?.value
    const storedCode = req.cookies.get('code_verifier')?.value
    const redirectTo = req.cookies.get('redirect_to')?.value ?? '/'

    if (!code || !state || !storedState || !storedCode)
      throw new Error('Missing required parameters')

    // Fetch user data and create session
    const userData = await provider.fetchUserData(code, storedCode)
    const user = await getOrCreateUserFromOAuth({
      ...userData,
      provider: providerName,
    })
    const sessionCookie = await createSession(user.id)

    // Create response and handle cross-origin redirects
    const redirectUrl = new URL(redirectTo, req.url)
    if (redirectUrl.origin !== url.origin)
      redirectUrl.searchParams.set('token', sessionCookie.sessionToken)

    const response = createRedirectResponse(redirectUrl)

    // Set session cookie and clear temporary cookies
    const nextCookies = await cookies()
    nextCookies.set(SESSION_COOKIE_NAME, sessionCookie.sessionToken, {
      ...DEFAULT_COOKIE_OPTIONS,
      expires: sessionCookie.expires,
    })

    nextCookies.delete('auth_state')
    nextCookies.delete('code_verifier')
    nextCookies.delete('redirect_to')

    return response
  }

  const handleGetRequest = async (req: NextRequest): Promise<Response> => {
    const url = new URL(req.url)
    const pathName = url.pathname

    try {
      // User session verification endpoint
      if (pathName === '/api/auth') {
        const session = await auth(req)
        return Response.json(session)
      }

      // OAuth flow endpoints
      return url.pathname.endsWith('/callback')
        ? await handleOAuthCallback(req)
        : await handleOAuthStart(req)
    } catch (error) {
      const errorMessage =
        error instanceof OAuth2RequestError
          ? { error: error.message, description: error.description }
          : error instanceof Error
            ? { error: error.message }
            : { error: 'Internal Server Error' }
      const status = error instanceof OAuth2RequestError ? 400 : 500
      return Response.json(errorMessage, { status })
    }
  }

  const handlePostRequest = async (req: NextRequest): Promise<Response> => {
    const { pathname } = new URL(req.url)
    const nextCookies = await cookies()

    try {
      // Sign-in endpoint
      if (pathname === '/api/auth/sign-in') {
        const { email, password } = (await req.json()) as {
          email: string
          password: string
        }
        const { sessionToken, expires } = await signIn({ email, password })

        const response = Response.json({ token: sessionToken }, { status: 200 })
        nextCookies.set(SESSION_COOKIE_NAME, sessionToken, {
          ...DEFAULT_COOKIE_OPTIONS,
          expires,
        })
        return response
      }

      // Sign-out endpoint
      if (pathname === '/api/auth/sign-out') {
        await signOut(req)
        const response = createRedirectResponse('/')
        nextCookies.delete(SESSION_COOKIE_NAME)
        return response
      }

      return new Response('Not Found', { status: 404 })
    } catch (error) {
      if (error instanceof Error)
        return Response.json({ error: error.message }, { status: 401 })
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }

  const withCors = (handler: (req: NextRequest) => Promise<Response>) => {
    return async (req: NextRequest) => {
      const response = await handler(req)
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Request-Method', '*')
      response.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST')
      response.headers.set('Access-Control-Allow-Headers', '*')
      return response
    }
  }

  return {
    auth,
    signIn,
    signOut,
    handlers: {
      GET: withCors(handleGetRequest),
      POST: withCors(handlePostRequest),
    },
  }
}
