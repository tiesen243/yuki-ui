import type { RegistryItem } from 'shadcn/registry'

const author = 'tiesen243 <ttien56906@gmail.com>'

export const registryUI = [
  {
    name: 'accordion',
    type: 'registry:ui',
    title: 'Accordion',
    author,
    description: 'A simple accordion component',
    dependencies: ['@base-ui-components/react'],
    files: [{ path: 'registry/ui/accordion.tsx', type: 'registry:ui' }],
  },
  {
    name: 'form',
    type: 'registry:ui',
    title: 'Form',
    author,
    description:
      'A form component built from scratch that works with Standard Schema',
    dependencies: ['@radix-ui/react-slot'],
    files: [{ path: 'registry/ui/form.tsx', type: 'registry:ui' }],
  },
  {
    name: 'nvim-statusline',
    type: 'registry:ui',
    title: 'Nvim Statusline',
    author,
    description:
      'A customizable statusline component for Neovim, inspired by the nvim-lualine plugin',
    dependencies: ['@radix-ui/react-slot'],
    files: [{ path: 'registry/ui/nvim-statusline.tsx', type: 'registry:ui' }],
    cssVars: {
      light: {
        normal: 'oklch(0.533 0.188299 256.8803)',
        visual: 'oklch(0.5945 0.1522 48.09)',
        replace: 'oklch(0.5352 0.1882 2.43)',
        insert: 'oklch(0.6273 0.17 149.2)',
        terminal: 'oklch(0.4706 0.2205 304.22)',
        command: 'oklch(0.6424 0.18 45.27)',
      },
      dark: {
        normal: 'oklch(0.7178 0.1521 250.77)',
        visual: 'oklch(0.8535 0.0907 84.06)',
        replace: 'oklch(0.6931 0.1891 3.82)',
        insert: 'oklch(0.6273 0.17 149.2)',
        terminal: 'oklch(0.6986 0.1786 309.44)',
        command: 'oklch(0.8124 0.1238 55.54)',
      },
    },
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
