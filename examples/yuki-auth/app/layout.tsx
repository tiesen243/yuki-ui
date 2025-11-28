import '@/app/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Providers } from '@/components/providers'
import { cn } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Yuki Auth',
  description: 'A simple authentication system built from scratch.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'flex flex-col min-h-dvh font-sans antialiased',
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
