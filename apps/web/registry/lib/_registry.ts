import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

export const registryLib = [
  {
    name: 'create-env',
    type: 'registry:lib',
    title: 'Environment Variables Validation',
    description: 'A utility to validate environment variables using Zod',
    dependencies: ['zod'],
    files: [{ type: 'registry:lib', path: 'registry/lib/create-env.ts' }],
  },

  {
    name: 'create-id',
    type: 'registry:lib',
    title: 'Custom ID Generator',
    description: 'A utility to generate unique IDs similar to CUIDs',
    dependencies: [],
    files: [{ type: 'registry:lib', path: 'registry/lib/create-id.ts' }],
  },

  {
    name: 'create-safe-context',
    type: 'registry:lib',
    title: 'Safe React Context',
    description: 'A utility to create a safe React context with error handling',
    dependencies: ['react'],
    files: [
      { type: 'registry:lib', path: 'registry/lib/create-safe-context.ts' },
    ],
  },

  {
    name: 'crypto',
    type: 'registry:lib',
    title: 'Cryptography Utilities',
    description:
      'A collection of cryptography utilities for encoding and decoding data',
    dependencies: [],
    files: [{ type: 'registry:lib', path: 'registry/lib/crypto.ts' }],
  },

  {
    name: 'password',
    type: 'registry:lib',
    title: 'Password Hashing and Verification',
    description:
      'A utility for hashing and verifying passwords using the scrypt algorithm',
    dependencies: [],
    registryDependencies: [`${getBaseUrl()}/r/crypto.json`],
    files: [{ type: 'registry:lib', path: 'registry/lib/password.ts' }],
  },
] satisfies RegistryItem[]
