'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/registry/ui/form'

export const LoginForm = () => {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    validator: (value) => {
      const issues = []
      if (!value.email)
        issues.push({ path: ['email'], message: 'Email is required' })
      if (!value.password)
        issues.push({ path: ['password'], message: 'Password is required' })

      if (issues.length > 0) return { issues }
      return { value }
    },
    onSubmit: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return values
    },
    onError: (e) => toast.error(e.message),
    onSuccess: (data) =>
      toast('Login successful', {
        description: (
          <pre className="bg-background mt-2 w-[calc(100svh-37rem)] overflow-x-auto rounded-md p-4 md:w-[320px]">
            <code className="text-foreground">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        ),
      }),
  })

  return (
    <Card className="w-svh max-w-md overflow-hidden">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.Field
            name="email"
            render={(field) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="yuki@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <form.Field
            name="password"
            render={(field) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="https://youtube.com/watch?v=dQw4w9WgXcQ"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.isPending} type="submit">
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>

        <p>
          Don&apos;t have an account?{' '}
          <Button variant="link" className="p-0">
            Sign Up
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
