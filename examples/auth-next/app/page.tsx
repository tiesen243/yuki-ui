import { headers } from 'next/headers'

import { Auth } from '@/app/page.client'
import { auth } from '@/server/auth'

export default async function HomePage() {
  const session = await auth({ headers: await headers() })

  return (
    <main style={styles.main}>
      <pre style={styles.pre}>{JSON.stringify(session, null, 2)}</pre>

      <Auth />
    </main>
  )
}

const styles = {
  main: {},

  pre: {
    background: '#0c0c0c',
  },
} satisfies Record<string, React.CSSProperties>
