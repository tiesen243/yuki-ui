'use client'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { arktypeSignUp } from '@/validators/auth'

export const SignUpForm: React.FC = () => {
  const form = useForm({
    schema: arktypeSignUp,
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    submitFn: (values) => {
      return values
    },
    onSuccess: (data) =>
      toast.success('Sign up success', {
        description: <pre>{JSON.stringify(data, null, 2)}</pre>,
      }),
  })

  return (
    <Card className="w-svh max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up for an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          {fields.map(({ label, ...field }) => (
            <FormField
              key={field.name}
              name={field.name}
              render={(props) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl {...field} {...props}>
                    <Input />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button disabled={form.isPending} type="submit">
            Sign Up
          </Button>
        </Form>
      </CardContent>
    </Card>
  )
}

const fields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Yukikaze' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'yuki@kaze.vk' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
]
