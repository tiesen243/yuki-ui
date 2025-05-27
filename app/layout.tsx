import '@/app/globals.css'

import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { RootProvider } from 'fumadocs-ui/provider'

import { Toaster } from '@/components/ui/sonner'
import { cn, getBaseUrl } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head>
      <body
        className={cn(
          'flex min-h-dvh flex-col font-sans antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <RootProvider>
          {children}
          <Toaster />
        </RootProvider>

        <Analytics />
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
    siteName: title,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tiesen243',
  },
}
