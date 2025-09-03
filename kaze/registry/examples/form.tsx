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

import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  useForm,
} from '@/registry/ui/form'

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
                <FormLabel>Password</FormLabel>
                <FormControl {...field}>
                  <Input type='password' />
                </FormControl>
                <FormMessage />
              </div>
            )}
          />

          <Button disabled={form.state.isPending}>Log in</Button>
        </form>
      </CardContent>
    </Card>
  )
}
