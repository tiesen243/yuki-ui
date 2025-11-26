import '@/app/globals.css'

import { Geist, Geist_Mono, Yuji_Syuku } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'

import { cn } from '@yuki/ui'
import { Toaster } from '@yuki/ui/sonner'

import { createMetadata } from '@/lib/metadata'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const yujiSyuky = Yuji_Syuku({
  variable: '--font-yuji-syuku',
  subsets: ['latin'],
  weight: '400',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-dvh flex-col font-sans antialiased',
          geistSans.variable,
          yujiSyuky.variable,
          geistMono.variable,
        )}
      >
        <RootProvider>
          {children}
          <Toaster />
        </RootProvider>
      </body>
    </html>
  )
}

export const metadata = createMetadata()
