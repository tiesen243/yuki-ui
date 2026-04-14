import type { RegistryItem } from 'shadcn/schema'

export const registryHooks = [
  {
    name: 'use-debounce',
    type: 'registry:hook',
    title: 'useDebounce Hook',
    description: 'A custom React hook for debouncing function calls',
    files: [{ type: 'registry:hook', path: 'registry/hooks/use-debounce.ts' }],
  },
  {
    name: 'use-form',
    type: 'registry:hook',
    title: 'useForm Hook',
    description: 'A custom React hook for form state management and validation',
    registryDependencies: ['field'],
    files: [{ type: 'registry:hook', path: 'registry/hooks/use-form.tsx' }],
  },
] satisfies RegistryItem[]
