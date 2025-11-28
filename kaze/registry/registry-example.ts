import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

export const registryExample = [
  {
    name: 'nvim-statusline-demo',
    type: 'registry:example',
    title: 'Nvim Statusline',
    description:
      'A customizable statusline component for Neovim, inspired by the nvim-lualine plugin.',
    registryDependencies: [`${getBaseUrl()}/r/nvim-statusline.json`],
    files: [
      {
        type: 'registry:example',
        path: 'registry/examples/nvim-statusline.tsx',
      },
    ],
  },

  {
    name: 'typography-demo',
    type: 'registry:example',
    title: 'Typography',
    description: 'A simple typography example using Yuki UI.',
    registryDependencies: [`${getBaseUrl()}/r/typography.json`],
    files: [
      { type: 'registry:example', path: 'registry/examples/typography.tsx' },
    ],
  },

  {
    name: 'use-debounce-demo',
    type: 'registry:example',
    title: 'useDebounce',
    description:
      'A simple search input example demonstrating the useDebounce hook.',
    registryDependencies: [
      `${getBaseUrl()}/r/use-debounce.json`,
      'input',
      'label',
    ],
    files: [
      { type: 'registry:example', path: 'registry/examples/use-debounce.tsx' },
    ],
  },

  {
    name: 'use-form-demo',
    type: 'registry:example',
    title: 'useForm',
    description:
      'A simple login form example using Yuki UI and Zod for validation.',
    dependencies: ['zod'],
    registryDependencies: [
      `${getBaseUrl()}/r/use-form.json`,
      'button',
      'field',
      'input',
    ],
    files: [
      { type: 'registry:example', path: 'registry/examples/use-form.tsx' },
    ],
  },
] satisfies RegistryItem[]
