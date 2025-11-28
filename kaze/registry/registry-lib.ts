import type { RegistryItem } from 'shadcn/schema'

export const registryLib = [
  {
    name: 'env',
    type: 'registry:lib',
    title: 'Environment Variables Validation',
    description: 'A utility to validate environment variables using Zod',
    dependencies: ['zod'],
    files: [
      { type: 'registry:lib', path: 'registry/lib/env.ts', target: 'env.ts' },
    ],
  },
] satisfies RegistryItem[]
