import { Button } from '@yuki/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import { Input } from '@yuki/ui/input'

import { useSession } from '@/hooks/use-session'
import { useForm } from '@/registry/ui/form'
import { PasswordInput } from '@/registry/ui/password-input'

export const LoginForm: React.FC = () => {
  const { signIn } = useSession()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    validator: (value) => {
      const issues: { path: string[]; message: string }[] = []
      if (value.email.trim() === '')
        issues.push({ path: ['email'], message: 'Email is required' })
      if (value.password.trim() === '')
        issues.push({ path: ['password'], message: 'Password is required' })
      if (issues.length > 0) return { issues }
      return { value }
    },
    onSubmit: (value) => signIn('credentials', value),
  })

  return (
    <Card className='min-w-md'>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Please enter your email and password to log in.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className='grid gap-4'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.Field
            name='email'
            render={({ field, meta }) => (
              <div id={meta.id} className='grid gap-2'>
                <form.Label>Email</form.Label>
                <form.Control {...field}>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    tabIndex={1}
                  />
                </form.Control>
                <form.Message />
              </div>
            )}
          />

          <form.Field
            name='password'
            render={({ field, meta }) => (
              <div id={meta.id} className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <form.Label>Password</form.Label>
                  <a href='#' tabIndex={5} className='text-xs hover:underline'>
                    Forgot your password?
                  </a>
                </div>
                <form.Control {...field}>
                  <PasswordInput
                    type='password'
                    placeholder='Enter your password'
                    tabIndex={2}
                  />
                </form.Control>
                <form.Message />
              </div>
            )}
          />

          <Button tabIndex={4} disabled={form.state.isPending}>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
