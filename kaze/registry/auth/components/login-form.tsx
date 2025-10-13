'use client'

import * as z from 'zod'

import { Button } from '@yuki/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@yuki/ui/field'
import { Input } from '@yuki/ui/input'

import { useForm } from '@/registry/hooks/use-form'
import { useSession } from '@/registry/hooks/use-session'

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default function LoginForm() {
  const { signIn } = useSession()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    schema: formSchema,
    onSubmit: (data) => signIn('credentials', data),
  })

  return (
    <form
      className='min-w-lg rounded-xl border bg-card p-6 text-card-foreground shadow-sm'
      onSubmit={form.handleSubmit}
    >
      <FieldSet>
        <FieldLegend>Login </FieldLegend>
        <FieldDescription>
          Enter your email and password to log in to your account.
        </FieldDescription>

        <FieldGroup>
          <form.Field
            name='email'
            render={({ meta, field }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={meta.fieldId}>Email</FieldLabel>
                <Input {...field} type='email' placeholder='abc@example.com' />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name='password'
            render={({ meta, field }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={meta.fieldId}>Password</FieldLabel>
                <Input {...field} type='password' placeholder='******' />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <Field>
            <Button disabled={form.state.isPending}>Log in</Button>
          </Field>
        </FieldGroup>

        <FieldSeparator className='[&>[data-slot=field-separator-content]]:bg-card'>
          or
        </FieldSeparator>

        <Field>
          <Button
            type='button'
            variant='outline'
            disabled={form.state.isPending}
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </Button>
        </Field>
      </FieldSet>
    </form>
  )
}
