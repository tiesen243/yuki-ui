import type { RegistryItem } from 'shadcn/registry'

import { getBaseUrl } from '@/lib/utils'

export const registryExample = [
  {
    name: 'accordion-demo',
    type: 'registry:example',
    title: 'Accordion',
    description:
      'A simple accordion component that can be used to display FAQs or collapsible content.',
    files: [
      { path: 'registry/examples/accordion.tsx', type: 'registry:example' },
    ],
    registryDependencies: [`${getBaseUrl()}/r/accordion.json`],
  },
  {
    name: 'form-demo',
    type: 'registry:example',
    title: 'Form',
    description:
      'A simple login form example using Yuki UI and Zod for validation.',
    files: [{ path: 'registry/examples/form.tsx', type: 'registry:example' }],
    dependencies: ['zod'],
    registryDependencies: [
      `${getBaseUrl()}/r/form.json`,
      'button',
      'card',
      'input',
    ],
  },
  {
    name: 'nvim-statusline-demo',
    type: 'registry:example',
    title: 'Nvim Statusline',
    description:
      'A customizable statusline component for Neovim, inspired by the nvim-lualine plugin.',
    files: [
      {
        path: 'registry/examples/nvim-statusline.tsx',
        type: 'registry:example',
      },
    ],
    registryDependencies: [`${getBaseUrl()}/r/nvim-statusline.json`],
  },
  {
    name: 'typography-demo',
    type: 'registry:example',
    title: 'Typography',
    description: 'A simple typography example using Yuki UI.',
    files: [
      { path: 'registry/examples/typography.tsx', type: 'registry:example' },
    ],
    registryDependencies: [`${getBaseUrl()}/r/typography.json`],
  },
] satisfies RegistryItem[]
