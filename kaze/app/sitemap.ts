import type { MetadataRoute } from 'next'

import { source } from '@/lib/source'
import { getBaseUrl } from '@/lib/utils'

export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, getBaseUrl()).toString()
  const pages = source.getPages()

  return Promise.resolve([
    {
      url: url('/'),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...pages.map((page) => ({
      url: url(page.url),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ])
}
