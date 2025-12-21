import type { Registry } from 'shadcn/schema'

// @ts-ignore
import { registryAuth } from '@/registry/auth/_registry'
import { registryExamples } from '@/registry/examples/_registry'
import { registryHooks } from '@/registry/hooks/_registry'
import { registryLib } from '@/registry/lib/_registry'
import { registryUI } from '@/registry/ui/_registry'

export const registry = {
  name: 'Yuki UI',
  homepage: 'https://yuki-ui.vercel.app',
  items: [
    ...registryAuth,
    ...registryExamples,
    ...registryHooks,
    ...registryLib,
    ...registryUI,
  ].map((item) => ({
    ...item,
    author: 'tiesen243 <ttien56906@gmail.com>',
  })),
} satisfies Registry
