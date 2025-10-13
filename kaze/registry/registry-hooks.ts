import type { RegistryItem } from 'shadcn/schema'

export const registryHooks = [
  {
    name: 'use-form',
    type: 'registry:hook',
    title: 'useForm Hook',
    description: 'A custom React hook for form state management and validation',
    files: [{ path: 'registry/hooks/use-form.tsx', type: 'registry:hook' }],
  },
] satisfies RegistryItem[]
