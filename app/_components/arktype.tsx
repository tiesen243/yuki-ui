'use client'

import { type } from 'arktype'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
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
} from '@/registry/form/arktype-form'

const signUpSchema = type({
  name: 'string >= 4',
  email: 'string.email',
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  confirmPassword: 'string >= 8',
}).narrow((data, ctx) => {
  if (data.password !== data.confirmPassword)
    return ctx.reject({
      path: ['confirmPassword'],
      message: 'Passwords do not match',
    })
  return true
})

export const ArktypeSignUpForm: React.FC = () => {
  const form = useForm({
    schema: signUpSchema,
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
        <CardTitle>Arktype Form Demo</CardTitle>
        <CardDescription>Validate form with Arktype</CardDescription>
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
