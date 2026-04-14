import { cache } from 'react'

import { authConfig } from '@/server/auth/config'
import { createAuth } from '@/server/auth/core'

const {
  auth: uncachedAuth,
  currentUser: uncachedCurrentUser,
  verifyAccessToken,

  signIn,
  signOut,

  handlers,
} = createAuth(authConfig)

/**
 * This will de-duplicate all calls to auth's default `auth()` function and only
 * call it once per request
 */
const auth = cache(uncachedAuth)
const currentUser = cache(uncachedCurrentUser)

export { auth, currentUser, verifyAccessToken, handlers, signIn, signOut }
