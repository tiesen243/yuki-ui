import type { RegistryItem } from 'shadcn/schema'

import { getBaseUrl } from '@/lib/utils'

export const registryNative = [
  {
    name: 'native-avatar',
    type: 'registry:ui',
    title: 'Avatar',
    description:
      'A component for displaying user avatars with an image and fallback content.',
    registryDependencies: [`${getBaseUrl()}/r/native-typography.json`],
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
    registryDependencies: ['badge', `${getBaseUrl()}/r/native-typography.json`],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/badge.tsx',
        target: 'components/native/badge.tsx',
      },
    ],
  },
  {
    name: 'native-button',
    type: 'registry:ui',
    title: 'Button',
    description: 'A pressable button component with variants and sizes.',
    registryDependencies: [
      'button',
      `${getBaseUrl()}/r/native-typography.json`,
    ],
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
    registryDependencies: [`${getBaseUrl()}/r/native-typography.json`],
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
    registryDependencies: [`${getBaseUrl()}/r/native-typography.json`],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/checkbox.tsx',
        target: 'components/native/checkbox.tsx',
      },
    ],
  },
  {
    name: 'native-dialog',
    type: 'registry:ui',
    title: 'Dialog',
    description:
      'A bottom-sheet dialog with drag, keyboard, and modal support for React Native.',
    registryDependencies: [
      `${getBaseUrl()}/r/native-button.json`,
      `${getBaseUrl()}/r/native-typography.json`,
    ],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/dialog.tsx',
        target: 'components/native/dialog.tsx',
      },
    ],
  },
  {
    name: 'native-field',
    type: 'registry:ui',
    title: 'Field',
    description:
      'A collection of components for building accessible form fields and field groups.',
    registryDependencies: [
      `${getBaseUrl()}/r/native-separator.json`,
      `${getBaseUrl()}/r/native-typography.json`,
    ],
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
    registryDependencies: [
      `${getBaseUrl()}/r/native-separator.json`,
      `${getBaseUrl()}/r/native-typography.json`,
    ],
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
      `${getBaseUrl()}/r/native-button.json`,
      `${getBaseUrl()}/r/native-dialog.json`,
      `${getBaseUrl()}/r/native-typography.json`,
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
    registryDependencies: [`${getBaseUrl()}/r/native-typography.json`],
    files: [
      {
        type: 'registry:ui',
        path: 'registry/native/typography.tsx',
        target: 'components/native/typography.tsx',
      },
    ],
  },
] satisfies RegistryItem[]
