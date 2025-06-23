import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

import { createMetadata } from '@/lib/metadata'

const meta = createMetadata()

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: meta.title,
  },
}
