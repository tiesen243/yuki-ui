import '@/app/globals.css'

import { RootProvider } from 'fumadocs-ui/provider/next'
import { Geist, Geist_Mono } from 'next/font/google'

import { createMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import { ToastProvider } from '@/registry/ui/toast'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
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
          geistMono.variable
        )}
      >
        <RootProvider>
          <ToastProvider>{children}</ToastProvider>
        </RootProvider>
      </body>
    </html>
  )
}

export const metadata = createMetadata()
