import { cache } from 'react'

import { authConfig } from '@/server/auth/config'
import { Auth } from '@/server/auth/core'

const { auth: uncachedAuth, signIn, signOut, handler } = Auth(authConfig)

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to auth's default `auth()` function and only call it once per request
 */
const auth = cache(uncachedAuth)

export { auth, signIn, signOut, handler }
