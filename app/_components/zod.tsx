'use client'

import { toast } from 'sonner'
import { z } from 'zod'

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
} from '@/registry/form/zod'

const signUpSchema = z
  .object({
    name: z.string().min(4, { message: 'Name must be at least 4 characters' }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const ZodSignUpForm: React.FC = () => {
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
        <CardTitle>Zod Form Demo</CardTitle>
        <CardDescription>Validate form with Zod</CardDescription>
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
