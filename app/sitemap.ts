import type { MetadataRoute } from 'next'

import { source } from '@/content'
import { getBaseUrl } from '@/lib/utils'

export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string): string => new URL(path, getBaseUrl()).toString()
  const docs = source.getPages()

  return [
    ...docs.map((doc) => ({
      url: url(doc.url),
      changeFrequency:
        doc.url === '/' ? ('yearly' as const) : ('monthly' as const),
      priority: doc.url === '/' ? 1 : 0.7,
      lastModified: new Date(doc.data.lastModified ?? ''),
    })),
  ]
}
