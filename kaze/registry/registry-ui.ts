import type { RegistryItem } from 'shadcn/registry'

export const registryUI = [
  {
    name: 'form',
    type: 'registry:ui',
    title: 'Form',
    author: 'tiesen243 <ttien56906@gmail.com>',
    description:
      'A form component built from scratch that works with Standard Schema',
    dependencies: ['@radix-ui/react-slot'],
    files: [{ path: 'registry/ui/form.tsx', type: 'registry:ui' }],
  },
  {
    name: 'nvim-statusline',
    type: 'registry:ui',
    title: 'Nvim Statusline',
    author: 'tiesen243 <ttien56906@gmail.com>',
    description:
      'A customizable statusline component for Neovim, inspired by the nvim-lualine plugin',
    dependencies: ['@radix-ui/react-slot'],
    files: [{ path: 'registry/ui/nvim-statusline.tsx', type: 'registry:ui' }],
  },
  {
    name: 'typography',
    type: 'registry:ui',
    title: 'Typography',
    author: 'tiesen243 <ttien56906@gmail.com>',
    description: 'A simple typography component',
    files: [{ path: 'registry/ui/typography.tsx', type: 'registry:ui' }],
  },
] satisfies RegistryItem[]
