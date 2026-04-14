import '@/styles/globals.css'

import { Geist, Geist_Mono } from 'next/font/google'

import { Provider } from '@/components/provider'
import { cn } from '@/lib/utils'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          geist.variable,
          geistMono.variable,
          'flex min-h-screen flex-col font-sans antialiased'
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
