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
    { url: '/api/og', alt: 'Open Graph Image' },
    ...(override.openGraph?.images
      ? Array.isArray(override.openGraph.images)
        ? override.openGraph.images
        : [override.openGraph.images]
      : []),
  ]

  return {
    ...override,
    metadataBase: new URL(baseUrl),
    applicationName: siteName,
    title,
    description,
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
    twitter: { card: 'summary_large_image', creatorId: '@tiesen243' },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-32x32.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: `${baseUrl}/manifest.webmanifest`,
    alternates: { canonical: url },
  }
}
