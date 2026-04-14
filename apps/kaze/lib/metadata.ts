import type { Metadata as NextMetadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

export interface Metadata extends NextMetadata {
  title?: string
  keywords?: string[]
}

export function createMetadata(override: Metadata = {}): Metadata {
  const siteName = 'Yuki UI'
  const baseUrl = getBaseUrl()

  const title = override.title ? `${override.title} | ${siteName}` : siteName
  const description =
    'A modern UI component library for React built on top of shadcn/ui. Beautiful, accessible, and customizable components for your next project.'
  const url = override.openGraph?.url
    ? `${baseUrl}${override.openGraph.url}`
    : baseUrl

  const images = [
    // oxlint-disable-next-line no-nested-ternary
    ...(override.openGraph?.images
      ? // oxlint-disable-next-line unicorn/no-nested-ternary
        Array.isArray(override.openGraph.images)
        ? override.openGraph.images
        : [override.openGraph.images]
      : []),
    { url: '/api/og', alt: 'Open Graph Image' },
  ]

  return {
    ...override,
    metadataBase: new URL(baseUrl),
    applicationName: siteName,
    title,
    description,
    authors: { name: 'Tiesen', url: 'https://tiesen.id.vn' },
    openGraph: {
      ...override.openGraph,
      title,
      description,
      siteName,
      url,
      images,
    },
    keywords: [
      'react',
      'ui components',
      'shadcn/ui',
      'tailwindcss',
      'accessible components',
      'customizable components',
      ...(override.keywords ?? []),
    ],
    twitter: {
      ...override.twitter,
      card: 'summary_large_image',
      creatorId: '@tiesen243',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    facebook: { appId: '625246206988524' },
    verification: { google: 'IxxbL_t4Uj36PsfajteCHNpV6Ln9fr7WCkxmzFjW_ms' },
    manifest: `${baseUrl}/site.webmanifest`,
    alternates: { ...override.alternates, canonical: url },
  }
}
