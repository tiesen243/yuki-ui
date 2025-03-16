import { Typography } from '@/registry/typography'
import { LoginForm } from './page.client'

export default function Home() {
  return (
    <main className="container py-4">
      <Typography variant="h1" className="text-center">
        Yuki UI
      </Typography>

      <section className="mt-8 flex flex-col items-center justify-center gap-6">
        <Typography variant="h2">Form Components</Typography>
        <LoginForm />
      </section>
    </main>
  )
}
