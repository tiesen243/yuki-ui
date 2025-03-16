import { LoginForm } from '@/registry/blocks/login-form'
import { Typography } from '@/registry/typography'

export default function Home() {
  return (
    <main className="container py-4">
      <Typography variant="h1" className="text-center">
        Yuki UI
      </Typography>

      <section className="my-8 grid place-items-center">
        <LoginForm />
      </section>
    </main>
  )
}
