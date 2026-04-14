import type { Registry } from 'shadcn/schema'

import { appName } from '@/lib/shared'
import { getBaseUrl } from '@/lib/utils'
import { registryAuth } from '@/registry/auth/_registry'
import { registryExamples } from '@/registry/examples/_registry'
import { registryHooks } from '@/registry/hooks/_registry'
import { registryLib } from '@/registry/lib/_registry'
import { registryUI } from '@/registry/ui/_registry'

export const registry = {
  name: appName,
  homepage: getBaseUrl(),
  items: [
    ...registryAuth,
    ...registryExamples,
    ...registryHooks,
    ...registryLib,
    ...registryUI,
  ].map((item) =>
    Object.assign(item, {
      author: 'tiesen243 <tiesen243@tiesen.id.vn>',
    })
  ),
} satisfies Registry
