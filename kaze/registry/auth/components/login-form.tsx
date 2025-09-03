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

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  useForm,
} from '@/registry/ui/form'
import { PasswordInput } from '@/registry/ui/password-input'

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
        <form className='grid gap-4' onSubmit={form.handleSubmit}>
          <FormField
            control={form.control}
            name='email'
            render={({ field, meta }) => (
              <div id={meta.id} className='grid gap-2'>
                <FormLabel>Email</FormLabel>
                <FormControl {...field}>
                  <Input type='email' placeholder='Enter your email' />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field, meta }) => (
              <div id={meta.id} className='grid gap-2'>
                <div className='flex items-center justify-between'>
                  <FormLabel>Password</FormLabel>
                  <a href='#' tabIndex={-1} className='text-xs hover:underline'>
                    Forgot your password?
                  </a>
                </div>
                <FormControl {...field}>
                  <PasswordInput placeholder='Enter your password' />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <Button disabled={form.state.isPending}>Login</Button>
        </form>
      </CardContent>
    </Card>
  )
}
