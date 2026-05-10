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

  {
    name: 'use-immer',
    type: 'registry:hook',
    title: 'useImmer Hook',
    description:
      'A custom React hook that integrates Immer for immutable state management',
    files: [{ type: 'registry:hook', path: 'registry/hooks/use-immer.ts' }],
  },

  {
    name: 'use-isomorphic-layout-effect',
    type: 'registry:hook',
    title: 'useIsomorphicLayoutEffect Hook',
    description:
      'A custom React hook that behaves like useLayoutEffect on the client and useEffect on the server',
    files: [
      {
        type: 'registry:hook',
        path: 'registry/hooks/use-isomorphic-layout-effect.ts',
      },
    ],
  },
] satisfies RegistryItem[]
