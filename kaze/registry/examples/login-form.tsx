'use client'

import { Button } from '@yuki/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yuki/ui/card'
import { Input } from '@yuki/ui/input'

import { useForm } from '@/registry/ui/form'

export default function LoginForm() {
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
    onSubmit: console.log,
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
                <div className='flex items-center justify-baseline'>
                  <form.Label>Email</form.Label>
                  <a href='#' className='text-xs hover:underline'>
                    Forgot your password?
                  </a>
                </div>
                <form.Control {...field}>
                  <Input type='email' placeholder='Enter your email' />
                </form.Control>
                <form.Message />
              </div>
            )}
          />

          <form.Field
            name='password'
            render={({ field, meta }) => (
              <div id={meta.id} className='grid gap-2'>
                <form.Label>Password</form.Label>
                <form.Control {...field}>
                  <Input type='password' placeholder='Enter your password' />
                </form.Control>
                <form.Message />
              </div>
            )}
          />

          <Button disabled={form.state.isPending}>Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}
