import type { Metadata as NextMetadata } from 'next'

import { appDescription, appName } from '@/lib/shared'
import { getBaseUrl } from '@/lib/utils'

export interface Metadata extends NextMetadata {
  title?: string
  keywords?: string[]
}

export function createMetadata(override: Metadata = {}): Metadata {
  const baseUrl = getBaseUrl()

  const title = override.title ? `${override.title} | ${appName}` : appName
  const description = override.description ?? appDescription
  const url = override.openGraph?.url
    ? `${baseUrl}${override.openGraph.url}`
    : baseUrl

  return {
    ...override,
    metadataBase: new URL(baseUrl),
    applicationName: appName,
    title,
    description,
    authors: { name: 'Tiesen', url: 'https://tiesen.id.vn' },
    keywords: ['yuki-ui', ...(override.keywords ?? [])],
    openGraph: {
      ...override.openGraph,
      title,
      description,
      siteName: appName,
      url,
    },
    twitter: {
      ...override.twitter,
      card: 'summary_large_image',
      creatorId: '@tiesen243',
    },
    icons: {
      apple: '/apple-touch-icon.png',
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
    },
    manifest: `${baseUrl}/manifest.json`,
    verification: { google: 'dfsGgsTDdq4IwdTzb4p69XHyrPXvzFNmUMRxpuV4M8Q' },
    alternates: { canonical: url, ...override.alternates },
  }
}
