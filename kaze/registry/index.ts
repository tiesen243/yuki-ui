import type { Registry } from 'shadcn/registry'

import { registryExample } from './registry-example'
import { registryUI } from './registry-ui'

export const registry = {
  name: 'Yuki UI',
  homepage: 'https://yuki-ui.vercel.app',
  items: [...registryUI, ...registryExample],
} satisfies Registry
