import { Geist } from 'next/font/google'

import { Providers } from '@/app/layout.client'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
})

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={geist.className}>
      <body style={styles.body}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

const styles = {
  body: {
    margin: 0,
    padding: 0,
    background: '#000000',
    color: '#ffffff',
  },
} satisfies Record<string, React.CSSProperties>
