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
  FieldSet,
} from '@yuki/ui/field'
import { Input } from '@yuki/ui/input'

import { FormField, useForm } from '@/registry/ui/form'

const formSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export default function FormDemo() {
  const form = useForm({
    defaultValues: { email: '', password: '' },
    schema: formSchema,
    onSubmit: (data) => {
      console.log('Form submitted:', data)
    },
  })

  return (
    <form
      className='rounded-xl border bg-card p-6 text-card-foreground shadow-sm'
      onSubmit={form.handleSubmit}
    >
      <FieldSet>
        <FieldLegend>Login Form</FieldLegend>
        <FieldDescription>
          A simple login form example using Yuki UI and Zod for validation.
        </FieldDescription>

        <FieldGroup>
          <FormField
            control={form.control}
            name='email'
            render={({ meta, field, state }) => (
              <Field data-invalid={state.hasError}>
                <FieldLabel htmlFor={meta.fieldId}>Email</FieldLabel>
                <Input type='email' {...field} />
                <FieldError id={meta.errorId} errors={state.errors} />
              </Field>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ meta, field, state }) => (
              <Field data-invalid={state.hasError} className='mt-4'>
                <FieldLabel htmlFor={meta.fieldId}>Password</FieldLabel>
                <Input type='password' {...field} />
                <FieldError id={meta.errorId} errors={state.errors} />
              </Field>
            )}
          />

          <Button disabled={form.state.isPending}>Log in</Button>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
