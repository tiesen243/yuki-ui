import type { Metadata as NextMetadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

type Metadata = Omit<NextMetadata, 'title' | 'keywords'> & {
  title: string
  keywords: string[]
}

export const createMetadata = (override: Partial<Metadata> = {}): Metadata => {
  const siteName = 'Yuki Toolkit'
  const title = override.title ? `${override.title} | ${siteName}` : siteName
  const description =
    override.description ??
    'A comprehensive collection of copy-paste React components and UI libraries built with shadcn/ui. Install components instantly using the shadcn CLI with a focus on customization, accessibility, and developer experience.'
  const {
    title: _,
    description: __,
    keywords = [],
    openGraph,
    ...restOverride
  } = override
  const { images: ogImages, url: ogUrl, ...restOpenGraph } = openGraph ?? {}
  const url = `${getBaseUrl()}${ogUrl ?? ''}`

  return {
    metadataBase: new URL(getBaseUrl()),
    applicationName: siteName,
    title,
    description,
    authors: { name: 'Tiesen', url: getBaseUrl() },
    manifest: `${getBaseUrl()}/manifest.webmanifest`,
    keywords: [
      ...keywords,
      'yuki ui',
      'react',
      'nextjs',
      'components',
      'ui',
      'design system',
      'tailwindcss',
      'typescript',
      'accessible',
      'customizable',
      'developer experience',
      'open source',
    ],
    openGraph: {
      url,
      title,
      description,
      siteName,
      type: 'website',
      images: Array.isArray(ogImages) ? ogImages : ogImages ? [ogImages] : [],
      ...restOpenGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creatorId: '@tiesen243',
      ...override.twitter,
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': [
          { title: 'Yuki UI', url: `${getBaseUrl()}/rss.xml` },
        ],
      },
      ...override.alternates,
    },
    facebook: { appId: '625246206988524' },
    assets: '/assets',
    verification: {
      google: 'IxxbL_t4Uj36PsfajteCHNpV6Ln9fr7WCkxmzFjW_ms',
    },
    ...restOverride,
  }
}
