import Link from 'next/link'

import { Button } from '@yuki/ui/button'
import { Typography } from '@yuki/ui/typography'

export default function HomePage() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-16">
      <Typography variant="h2" component="h1" className="text-center">
        Welcome to Yuki UI
      </Typography>

      <Typography variant="h3" component="h2" className="mt-4 text-center">
        A modern UI component library for React built on top of shadcn/ui
      </Typography>

      <Button size="lg" asChild>
        <Link href="/docs/introduction">Get Started</Link>
      </Button>
    </main>
  )
}
