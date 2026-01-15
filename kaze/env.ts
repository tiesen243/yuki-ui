import * as z from 'zod/mini'

import { createEnv } from '@/registry/lib/create-env'

export const env = createEnv({
  shared: {
    NODE_ENV: z._default(
      z.enum(['development', 'production', 'test']),
      'development',
    ),

    // Vercel environment variables
    VERCEL: z.optional(z.string()),
    VERCEL_ENV: z.optional(z.enum(['production', 'preview', 'development'])),
    VERCEL_URL: z.optional(z.string()),
    VERCEL_PROJECT_PRODUCTION_URL: z.optional(z.string()),
  },

  server: {},

  clientPrefix: 'NEXT_PUBLIC_',
  client: {},

  runtimeEnv: { ...process.env },
  deriveEnv(env) {
    return {
      isDev: env.NODE_ENV === 'development',
      isProd: env.NODE_ENV === 'production',
      isTest: env.NODE_ENV === 'test',
    }
  },

  emptyStringAsUndefined: true,
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === 'lint',
})
