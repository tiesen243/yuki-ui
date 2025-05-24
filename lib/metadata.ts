import type { Metadata } from 'next'
import { createMetadataImage } from 'fumadocs-core/server'

import { source } from '@/content'
import { getBaseUrl } from '@/lib/utils'

export const createMetadata = (
  slug: string[],
  override: Omit<Metadata, 'title'> & { title?: string },
): Metadata => {
  const siteName = 'Yuki UI'
  const description =
    'A collection of reusable React components built with a focus on customization, accessibility, and developer experience. Works with your favorite framework.'
  const url = override.openGraph?.url
    ? `${getBaseUrl()}${override.openGraph.url}`
    : getBaseUrl()

  return createMetadataImage({
    imageRoute: '/api/og',
    source,
  }).withImage(slug, {
    ...override,
    metadataBase: new URL(getBaseUrl()),
    title: override.title ? `${override.title} | ${siteName}` : siteName,
    description: override.description ?? description,
    alternates: { canonical: url },
    manifest: `${getBaseUrl()}/manifest.webmanifest`,
    keywords: [
      'react',
      'nextjs',
      'components',
      'ui',
      'design',
      'library',
      'typescript',
      ...(override.keywords
        ? typeof override.keywords === 'string'
          ? [override.keywords]
          : override.keywords
        : []),
    ],
    openGraph: {
      url: url,
      siteName,
      type: 'website',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@tiesen243',
      ...override.twitter,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
  })
}
