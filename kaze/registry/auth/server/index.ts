import { cache } from 'react'

import { authConfig } from '@/server/auth/config'
import { createAuth } from '@/server/auth/core'

const {
  auth: uncachedAuth,
  getCurrentUser,
  verifyAccessToken,
  handlers,
  signIn,
  signOut,
} = createAuth(authConfig)

const auth = cache(uncachedAuth)

export { auth, getCurrentUser, verifyAccessToken, handlers, signIn, signOut }
