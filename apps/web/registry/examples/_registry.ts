import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

export const registryExamples = [
  {
    name: 'editor-demo',
    type: 'registry:example',
    title: 'Markdown Editor',
    description: 'A markdown editor example using Marked.js and Yuki UI.',
    registryDependencies: [`${getBaseUrl()}/r/editor.json`],
    files: [{ type: 'registry:example', path: 'registry/examples/editor.tsx' }],
  },

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
    name: 'open-graph-demo',
    type: 'registry:example',
    title: 'Open Graph Image',
    description: 'A simple example demonstrating the Open Graph component.',
    registryDependencies: [`${getBaseUrl()}/r/open-graph.json`],
    files: [
      { type: 'registry:example', path: 'registry/examples/open-graph.tsx' },
    ],
  },

  {
    name: 'skeleton-demo',
    type: 'registry:example',
    title: 'Skeleton',
    description: 'A simple skeleton loading example using Yuki UI.',
    registryDependencies: [`${getBaseUrl()}/r/skeleton.json`],
    files: [
      { type: 'registry:example', path: 'registry/examples/skeleton.tsx' },
    ],
  },

  {
    name: 'toast-demo',
    type: 'registry:example',
    title: 'Toast Notifications',
    description: 'An example demonstrating toast notifications using Yuki UI.',
    registryDependencies: [`${getBaseUrl()}/r/toast.json`],
    files: [{ type: 'registry:example', path: 'registry/examples/toast.tsx' }],
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

  {
    name: 'use-immer-demo',
    type: 'registry:example',
    title: 'useImmer',
    description:
      'A simple counter example demonstrating the useImmer hook for immutable state management.',
    registryDependencies: [`${getBaseUrl()}/r/use-immer.json`],
    files: [
      { type: 'registry:example', path: 'registry/examples/use-immer.tsx' },
    ],
  },
] satisfies RegistryItem[]
