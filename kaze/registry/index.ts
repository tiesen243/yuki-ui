import type { Registry } from 'shadcn/registry'

import { registryAuth } from '@/registry/registry-auth'
import { registryLib } from '@/registry/registry-lib'
import { registryBlocks } from './registry-blocks'
import { registryExample } from './registry-example'
import { registryHooks } from './registry-hooks'
import { registryUI } from './registry-ui'

export const registry = {
  name: 'Yuki UI',
  homepage: 'https://yuki-ui.vercel.app',
  items: [
    ...registryAuth,
    ...registryBlocks,
    ...registryExample,
    ...registryHooks,
    ...registryLib,
    ...registryUI,
  ].map((item) => ({
    ...item,
    author: 'tiesen243 <ttien56906@gmail.com>',
  })),
} satisfies Registry
