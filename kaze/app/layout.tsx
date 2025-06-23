import '@/app/globals.css'

import { Geist, Geist_Mono } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider'

import { cn } from '@yuki/ui'

import { createMetadata } from '@/lib/metadata'

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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-dvh flex-col font-sans antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <RootProvider search={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  )
}

export const metadata = createMetadata()
