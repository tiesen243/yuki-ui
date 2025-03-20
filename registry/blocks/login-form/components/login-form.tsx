'use client'

import { toast } from 'sonner'
import { z } from 'zod'

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/registry/ui/form'

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Password is too weak',
    ),
})

export const LoginForm = () => {
  const form = useForm({
    schema: loginSchema,
    defaultValues: { email: '', password: '' },
    submitFn: async (values) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return values
    },
    onError: (e) => {
      toast.error(e)
    },
    onSuccess: (data) => {
      toast('Login successful', {
        description: (
          <pre className="bg-background mt-2 w-[calc(100svh-37rem)] overflow-x-auto rounded-md p-4 md:w-[320px]">
            <code className="text-foreground">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        ),
      })
    },
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
        <Form form={form}>
          <FormField
            name="email"
            render={(props) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl {...props}>
                  <Input type="email" placeholder="yuki@gmail.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={(props) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>

                  <a className="text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <FormControl {...props}>
                  <Input type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={form.isPending} type="submit">
            Login
          </Button>
        </Form>
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
