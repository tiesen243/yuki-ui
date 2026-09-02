import '@/styles/globals.css'

import { Noto_Serif_Georgian, Geist, Geist_Mono } from 'next/font/google'

import { Provider } from '@/components/provider'
import { cn } from '@/lib/utils'

const georgianSerif = Noto_Serif_Georgian({ variable: '--font-serif' })
const geistSans = Geist({ variable: '--font-sans' })
const geistMono = Geist_Mono({ variable: '--font-mono' })

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col antialiased',
          georgianSerif.variable,
          geistSans.variable,
          geistMono.variable
        )}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
