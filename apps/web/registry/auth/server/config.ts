import type { AuthConfig } from '@/server/auth/core/types'

import { Google } from '@/registry/auth/server/core/providers/google'
import { adapter } from '@/server/auth/adapter'

export const authConfig = {
  secret: process.env.AUTH_SECRET ?? 'secret',

  adapter,

  providers: [
    new Google(
      process.env.AUTH_GOOGLE_ID ?? '',
      process.env.AUTH_GOOGLE_SECRET ?? ''
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
