'use client'

import * as z from 'zod/v4'

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

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default function FormDemo() {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    validator: formSchema,
    onSubmit: (data) => {
      console.log('Form submitted:', data)
    },
  })

  return (
    <Card className='min-w-md'>
      <CardHeader>
        <CardTitle>Login Form</CardTitle>
        <CardDescription>
          A simple login form example using Yuki UI and Zod for validation.
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
                  <Input type='password' />
                </form.Control>
                <form.Message />
              </div>
            )}
          />

          <Button disabled={form.state.isPending}>Log in</Button>
        </form>
      </CardContent>
    </Card>
  )
}
