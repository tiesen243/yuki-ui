import type { RegistryItem } from 'shadcn/schema'

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
] satisfies RegistryItem[]
