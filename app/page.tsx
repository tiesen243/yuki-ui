import { Typography } from '@/registry/typography'
import { ArktypeSignUpForm } from './_components/arktype'
import { ZodSignUpForm } from './_components/zod'

export default function Home() {
  return (
    <main className="container py-4">
      <Typography variant="h1" className="text-center">
        Yuki UI
      </Typography>

      <section className="flex flex-col gap-6">
        <Typography variant="h2">Form Components</Typography>

        <section className="flex flex-col gap-4 pl-6">
          <Typography variant="h3">Using Arktype</Typography>
          <ArktypeSignUpForm />
        </section>

        <section className="flex flex-col gap-4 pl-6">
          <Typography variant="h3">Using Zod</Typography>
          <ZodSignUpForm />
        </section>
      </section>
    </main>
  )
}
