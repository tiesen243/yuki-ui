import type { RegistryItem } from 'shadcn/schema'

export const registryUI = [
  {
    name: 'form',
    type: 'registry:ui',
    title: 'Form',
    description:
      'A form component built from scratch that works with Standard Schema',
    dependencies: ['@radix-ui/react-slot'],
    files: [{ path: 'registry/ui/form.tsx', type: 'registry:ui' }],
  },
  {
    name: 'nvim-statusline',
    type: 'registry:ui',
    title: 'Nvim Statusline',
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
    name: 'open-graph',
    type: 'registry:ui',
    title: 'Open Graph',
    description: 'A component to generate Open Graph images',
    files: [
      {
        path: 'registry/ui/open-graph.tsx',
        target: 'app/api/og/route.tsx',
        type: 'registry:ui',
      },
    ],
  },
  {
    name: 'password-input',
    type: 'registry:ui',
    title: 'Password Input',
    description:
      'A password input component with a toggle to show/hide the password',
    files: [{ path: 'registry/ui/password-input.tsx', type: 'registry:ui' }],
  },
  {
    name: 'progress-button',
    type: 'registry:ui',
    title: 'Progress Button',
    description:
      'A button component that shows progress, useful for loading states',
    registryDependencies: ['button'],
    files: [{ path: 'registry/ui/progress-button.tsx', type: 'registry:ui' }],
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
