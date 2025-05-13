import type { MetadataRoute } from 'next'

import { source } from '@/content'
import { getBaseUrl } from '@/lib/utils'

export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, getBaseUrl()).toString()
  const docs = source.getPages()

  return await Promise.all(
    docs.map(
      (page) =>
        ({
          url: url(page.url),
          changeFrequency: 'weekly',
          priority: page.url === '/' ? 1 : 0.8,
        }) as MetadataRoute.Sitemap[number],
    ),
  )
}
