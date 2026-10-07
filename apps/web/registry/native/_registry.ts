import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

const native = (name: string) => `${getBaseUrl()}/r/native-${name}.json`

export const registryNative = [
  {
    name: 'native-avatar',
    type: 'registry:ui',
    title: 'Avatar',
    description:
      'A component for displaying user avatars with an image and fallback content.',
    registryDependencies: [native('typography')],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/avatar.tsx',
        target: 'components/native/avatar.tsx',
      },
    ],
  },
  {
    name: 'native-badge',
    type: 'registry:ui',
    title: 'Badge',
    description:
      'A small status indicator for highlighting labels, states, and categories.',
    registryDependencies: ['badge', native('typography')],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/badge.tsx',
        target: 'components/native/badge.tsx',
      },
    ],
  },
  {
    name: 'native-bottom-sheet',
    type: 'registry:ui',
    title: 'Bottom Sheet',
    description:
      'A bottom-sheet with drag, keyboard, and modal support for React Native.',
    registryDependencies: [native('button'), native('typography')],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/bottom-sheet.tsx',
        target: 'components/native/bottom-sheet.tsx',
      },
    ],
  },
  {
    name: 'native-button',
    type: 'registry:ui',
    title: 'Button',
    description: 'A pressable button component with variants and sizes.',
    registryDependencies: ['button', native('typography')],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/button.tsx',
        target: 'components/native/button.tsx',
      },
    ],
  },
  {
    name: 'native-card',
    type: 'registry:ui',
    title: 'Card',
    description:
      'A set of components for grouping related content into a card layout.',
    registryDependencies: [native('typography')],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/card.tsx',
        target: 'components/native/card.tsx',
      },
    ],
  },
  {
    name: 'native-checkbox',
    type: 'registry:ui',
    title: 'Checkbox',
    description:
      'A pressable checkbox with controlled and uncontrolled state support.',
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/checkbox.tsx',
        target: 'components/native/checkbox.tsx',
      },
    ],
  },
  {
    name: 'native-field',
    type: 'registry:ui',
    title: 'Field',
    description:
      'A collection of components for building accessible form fields and field groups.',
    registryDependencies: [native('separator'), native('typography')],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/field.tsx',
        target: 'components/native/field.tsx',
      },
    ],
  },
  {
    name: 'native-input',
    type: 'registry:ui',
    title: 'Input',
    description:
      'A styled native text input that follows the shadcn visual language.',
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/input.tsx',
        target: 'components/native/input.tsx',
      },
    ],
  },
  {
    name: 'native-item',
    type: 'registry:ui',
    title: 'Item',
    description:
      'A flexible list item component with media, content, actions, and supporting text.',
    registryDependencies: [native('separator'), native('typography')],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/item.tsx',
        target: 'components/native/item.tsx',
      },
    ],
  },
  {
    name: 'native-radio-group',
    type: 'registry:ui',
    title: 'Radio Group',
    description: 'A group of mutually exclusive radio options.',
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/radio-group.tsx',
        target: 'components/native/radio-group.tsx',
      },
    ],
  },
  {
    name: 'native-select',
    type: 'registry:ui',
    title: 'Select',
    description:
      'A select component implemented as a native bottom-sheet picker, with single and multiple selection support.',
    registryDependencies: [
      native('bottom-sheet'),
      native('button'),
      native('typography'),
    ],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/select.tsx',
        target: 'components/native/select.tsx',
      },
    ],
  },
  {
    name: 'native-separator',
    type: 'registry:ui',
    title: 'Separator',
    description:
      'A visual divider for separating content horizontally or vertically.',
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/separator.tsx',
        target: 'components/native/separator.tsx',
      },
    ],
  },
  {
    name: 'native-switch',
    type: 'registry:ui',
    title: 'Switch',
    description: 'A native switch control for toggling a boolean value.',
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/switch.tsx',
        target: 'components/native/switch.tsx',
      },
    ],
  },
  {
    name: 'native-toast',
    type: 'registry:ui',
    title: 'Toast',
    description:
      'Toast notifications for React Native with an imperative API and swipe-to-dismiss gestures.',
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/toast.tsx',
        target: 'components/native/toast.tsx',
      },
    ],
  },
  {
    name: 'native-typography',
    type: 'registry:ui',
    title: 'Typography',
    description:
      'A typography component with semantic variants and consistent text styling.',
    registryDependencies: ['typography'],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/typography.tsx',
        target: 'components/native/typography.tsx',
      },
    ],
  },
] satisfies RegistryItem[]
