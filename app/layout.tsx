import '@/app/globals.css'

import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
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
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
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
    image: `https://tiesen.id.vn/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
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
