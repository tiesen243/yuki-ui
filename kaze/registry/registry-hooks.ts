import type { RegistryItem } from 'shadcn/schema'

export const registryHooks = [
  {
    name: 'use-debounce',
    type: 'registry:hook',
    title: 'useDebounce Hook',
    description: 'A custom React hook for debouncing function calls',
    files: [{ path: 'registry/hooks/use-debounce.tsx', type: 'registry:hook' }],
  },
  {
    name: 'use-form',
    type: 'registry:hook',
    title: 'useForm Hook',
    description: 'A custom React hook for form state management and validation',
    files: [{ path: 'registry/hooks/use-form.tsx', type: 'registry:hook' }],
  },
] satisfies RegistryItem[]
