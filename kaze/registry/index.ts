import type { Registry } from 'shadcn/registry'

import { registryBlocks } from './registry-blocks'
import { registryExample } from './registry-example'
import { registryHooks } from './registry-hooks'
import { registryUI } from './registry-ui'

export const registry = {
  name: 'Yuki UI',
  homepage: 'https://yuki-ui.vercel.app',
  items: [
    ...registryBlocks,
    ...registryExample,
    ...registryHooks,
    ...registryUI,
  ],
} satisfies Registry
