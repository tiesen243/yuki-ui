import { Toaster } from '@/components/ui/sonner'
import { LoginForm } from '@/registry/blocks/login-form/components/login-form'

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <LoginForm />

      <Toaster />
    </main>
  )
}
