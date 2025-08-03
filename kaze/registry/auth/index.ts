import { cache } from 'react'

import { authOptions } from '@/server/auth/config'
import { Auth } from '@/server/auth/core'

const { auth: uncachedAuth, signIn, signOut, handlers } = Auth(authOptions)

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to auth's default `auth()` function and only call it once per request
 */
const auth = cache(uncachedAuth)

export type { Session, SessionResult, User } from '@/server/auth/core/types'
export {
  validateSessionToken,
  invalidateSessionToken,
} from '@/server/auth/config'
export { Password } from '@/server/auth/core/password'
export { auth, signIn, signOut, handlers }
