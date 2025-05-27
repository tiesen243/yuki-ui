import type { MetadataRoute } from 'next'

import { source } from '@/content'
import { getBaseUrl } from '@/lib/utils'

export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string => new URL(path, getBaseUrl()).toString()
  const _docs = source.getPages()

  return [
    {
      url: url('/'),
      changeFrequency: 'yearly',
      priority: 1,
    },
  ]
}
