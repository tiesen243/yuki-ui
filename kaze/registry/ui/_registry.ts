import type { RegistryItem } from 'shadcn/schema'

export const registryUI = [
  {
    name: 'nvim-statusline',
    type: 'registry:ui',
    title: 'Nvim Statusline',
    description:
      'A customizable statusline component for Neovim, inspired by the nvim-lualine plugin',
    dependencies: ['@base-ui/react'],
    files: [{ type: 'registry:ui', path: 'registry/ui/nvim-statusline.tsx' }],
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
        type: 'registry:ui',
        path: 'registry/ui/open-graph.tsx',
        target: 'app/api/og/route.tsx',
      },
    ],
  },

  {
    name: 'tiptap',
    type: 'registry:ui',
    title: 'Tiptap Editor',
    description: 'A rich text editor component using Tiptap',
    dependencies: [
      '@tiptap/extension-blockquote',
      '@tiptap/extension-bold',
      '@tiptap/extension-document',
      '@tiptap/extension-hard-break',
      '@tiptap/extension-heading',
      '@tiptap/extension-italic',
      '@tiptap/extension-list',
      '@tiptap/extension-paragraph',
      '@tiptap/extension-strike',
      '@tiptap/extension-text',
      '@tiptap/extension-underline',
      '@tiptap/extensions',
      '@tiptap/react',
      'lucide-react',
    ],

    files: [{ type: 'registry:ui', path: 'registry/ui/tiptap.tsx' }],
  },

  {
    name: 'toast',
    type: 'registry:ui',
    title: 'Toast Notifications',
    description: 'A toast notification system',
    dependencies: ['@base-ui/react'],
    files: [{ type: 'registry:ui', path: 'registry/ui/toast.tsx' }],
  },

  {
    name: 'typography',
    type: 'registry:ui',
    title: 'Typography',
    description: 'A simple typography component',
    dependencies: ['@base-ui/react'],
    files: [{ type: 'registry:ui', path: 'registry/ui/typography.tsx' }],
  },
] satisfies RegistryItem[]
