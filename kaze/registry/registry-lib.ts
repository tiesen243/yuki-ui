import type { RegistryItem } from 'shadcn/registry'

export const registryLib = [
  {
    name: 'env',
    type: 'registry:lib',
    title: 'Environment Variables Validation',
    description: 'A utility to validate environment variables using Zod',
    dependencies: ['zod'],
    files: [
      { path: 'registry/lib/env.tsx', type: 'registry:lib', target: 'env.ts' },
    ],
  },
] satisfies RegistryItem[]
