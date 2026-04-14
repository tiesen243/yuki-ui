import type { MetadataRoute } from 'next'

import { source } from '@/lib/source'
import { getBaseUrl } from '@/lib/utils'

export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string => new URL(path, getBaseUrl()).toString()

  const pages = source.getPages()

  return [
    {
      changeFrequency: 'yearly',
      priority: 1,
      url: url('/'),
    },
    ...pages.map((page) => ({
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      url: url(page.url),
    })),
  ]
}
