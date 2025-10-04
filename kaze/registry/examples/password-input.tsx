'use client'

import { Button } from '@yuki/ui/button'
import { Field, FieldError, FieldLabel } from '@yuki/ui/field'
import { toast } from '@yuki/ui/sonner'

import { FormField, useForm } from '@/registry/ui/form'
import { PasswordInput } from '@/registry/ui/password-input'

export default function PasswordInputDemo() {
  const form = useForm({
    defaultValues: { password: '' },
    onSubmit: (data) => {
      toast('Form submitted', {
        description: <pre>{JSON.stringify(data, null, 2)}</pre>,
      })
    },
  })

  return (
    <form onSubmit={form.handleSubmit}>
      <Field>
        <FormField
          control={form.control}
          name='password'
          render={({ meta, field, state }) => (
            <Field data-invalid={state.hasError}>
              <FieldLabel htmlFor={meta.fieldId}>Password</FieldLabel>
              <PasswordInput placeholder='Enter your password' {...field} />
              <FieldError id={meta.errorId} errors={state.errors} />
            </Field>
          )}
        />

        <Button>Submit</Button>
      </Field>
    </form>
  )
}
