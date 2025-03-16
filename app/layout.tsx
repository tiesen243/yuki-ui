import '@/app/globals.css'

import { Geist } from 'next/font/google'
import Image from 'next/image'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { RootProvider } from 'fumadocs-ui/provider'

import { Toaster } from '@/components/ui/sonner'
import { source } from '@/content'
import { cn, getBaseUrl } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-dvh font-sans antialiased', geistSans.variable)}
      >
        <RootProvider>
          <DocsLayout
            tree={source.pageTree}
            nav={{
              title: (
                <>
                  <Image
                    src="/logo.svg"
                    alt="Yuki UI"
                    width={32}
                    height={32}
                    className="dark:invert"
                  />
                  <span className="text-xl font-bold">Yuki UI</span>
                </>
              ),
            }}
          >
            {children}
          </DocsLayout>
          <Toaster />
        </RootProvider>
      </body>
    </html>
  )
}

const url = getBaseUrl()
const title = 'Yuki UI'
const description =
  'A collection of reusable React components built with a focus on customization, accessibility, and developer experience.'

export const metadata = {
  metadataBase: new URL(url),
  title,
  description,
  alternates: { canonical: url },
  facebook: { appId: '523462826928110' },
  manifest: `https://tiesen.id.vn/manifest.webmanifest`,
  keywords: [
    'tiesen243',
    'Yuki UI',
    'React',
    'Tailwind CSS',
    'Component Library',
  ],
  openGraph: {
    url,
    images: [
      `https://tiesen.id.vn/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
    ],
    siteName: title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tiesen243',
  },
  icons: {
    icon: 'https://tiesen.id.vn/favicon.ico',
    shortcut: 'https://tiesen.id.vn/favicon-16x16.png',
    apple: 'https://tiesen.id.vn/apple-touch-icon.png',
  },
}
