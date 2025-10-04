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

import { FormField, useForm } from '@/registry/ui/form'

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default function LoginForm() {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    schema: formSchema,
    onSubmit: (data) => {
      console.log('Form submitted:', data)
    },
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
          <FormField
            control={form.control}
            name='email'
            render={({ meta, field, state }) => (
              <Field data-invalid={state.hasError}>
                <FieldLabel htmlFor={meta.fieldId}>Email</FieldLabel>
                <Input {...field} type='email' placeholder='abc@example.com' />
                <FieldError id={meta.errorId} errors={state.errors} />
              </Field>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ meta, field, state }) => (
              <Field data-invalid={state.hasError}>
                <FieldLabel htmlFor={meta.fieldId}>Password</FieldLabel>
                <Input {...field} type='password' placeholder='******' />
                <FieldError id={meta.errorId} errors={state.errors} />
              </Field>
            )}
          />

          <Button disabled={form.state.isPending}>Log in</Button>
        </FieldGroup>

        <FieldSeparator className='[&>[data-slot=field-separator-content]]:bg-card'>
          or
        </FieldSeparator>

        <FieldGroup>
          <Button
            type='button'
            variant='outline'
            disabled={form.state.isPending}
          >
            Sign in with Google
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
