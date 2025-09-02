import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

export const registryExample = [
  {
    name: 'accordion-demo',
    type: 'registry:example',
    title: 'Accordion',
    description:
      'A simple accordion component that can be used to display FAQs or collapsible content.',
    registryDependencies: [`${getBaseUrl()}/r/accordion.json`],
    files: [
      { path: 'registry/examples/accordion.tsx', type: 'registry:example' },
    ],
  },
  {
    name: 'form-demo',
    type: 'registry:example',
    title: 'Form',
    description:
      'A simple login form example using Yuki UI and Zod for validation.',
    dependencies: ['zod'],
    registryDependencies: [
      `${getBaseUrl()}/r/form.json`,
      'button',
      'card',
      'input',
    ],
    files: [{ path: 'registry/examples/form.tsx', type: 'registry:example' }],
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
        path: 'registry/examples/nvim-statusline.tsx',
        type: 'registry:example',
      },
    ],
  },
  {
    name: 'password-input-demo',
    type: 'registry:example',
    title: 'Password Input',
    description:
      'A password input component that allows users to toggle visibility and strength indicators.',
    registryDependencies: [`${getBaseUrl()}/r/password-input.json`],
    files: [
      {
        path: 'registry/examples/password-input.tsx',
        type: 'registry:example',
      },
    ],
  },
  {
    name: 'progress-button-demo',
    type: 'registry:example',
    title: 'Progress Button',
    description:
      'A button component that shows progress, useful for loading states.',
    registryDependencies: [`${getBaseUrl()}/r/progress-button.json`],
    files: [
      {
        path: 'registry/examples/progress-button.tsx',
        type: 'registry:example',
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
      { path: 'registry/examples/typography.tsx', type: 'registry:example' },
    ],
  },

  // Auth
  {
    name: 'login-form-demo',
    type: 'registry:example',
    title: 'Login Form',
    description:
      'A simple login form example using Yuki UI and Zod for validation.',
    registryDependencies: [
      'button',
      'card',
      'input',
      `${getBaseUrl()}/r/form.json`,
    ],
    files: [
      { path: 'registry/examples/login-form.tsx', type: 'registry:example' },
    ],
  },
  {
    name: 'user-button-demo',
    type: 'registry:example',
    title: 'User Button',
    description:
      'A user button component that displays user information and actions.',
    dependencies: ['lucide-react', 'next-themes'],
    registryDependencies: ['avatar', 'dropdown-menu'],
    files: [
      { path: 'registry/examples/user-button.tsx', type: 'registry:example' },
    ],
  },
] satisfies RegistryItem[]
