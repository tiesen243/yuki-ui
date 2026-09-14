// oxlint-disable unicorn/throw-new-error
'use client'

import { useAtomValue } from '@effect/atom-react'
import { Effect, Random } from 'effect'
import * as Schema from 'effect/Schema'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormBuilder } from '@/registry/lib/form-builder'
import { toast } from '@/registry/ui/toast'

const loginForm = FormBuilder.empty
  .add(
    'email',
    Schema.String.check(Schema.isPattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/u))
  )
  .add('password', Schema.String.check(Schema.isMinLength(8)))
  .make()

export default function FormBuilderDemo() {
  return (
    <loginForm.Provider defaultValues={{ email: '', password: '' }}>
      <Form>
        <FieldLegend>Login</FieldLegend>
        <FieldDescription>
          Fill in the form below to log in. The form will validate your input
          and display any errors.
        </FieldDescription>

        <loginForm.Field
          name='email'
          render={({ field, meta, helpers: { handleChange } }) => (
            <Field data-invalid={meta.errors.length > 0}>
              <FieldLabel htmlFor={field.id}>Email</FieldLabel>

              <Input
                {...field}
                type='email'
                onChange={(e) => handleChange(e.target.value)}
              />

              <FieldDescription id={meta.descriptionId}>
                Please enter your email address.
              </FieldDescription>

              <FieldError id={meta.errorId} errors={meta.errors} />
            </Field>
          )}
        />

        <loginForm.Field
          name='password'
          render={({ field, meta, helpers: { handleChange } }) => (
            <Field data-invalid={meta.errors.length > 0}>
              <FieldLabel htmlFor={field.id}>Password</FieldLabel>

              <Input
                {...field}
                type='password'
                onChange={(e) => handleChange(e.target.value)}
              />

              <FieldDescription id={meta.descriptionId}>
                Please enter your password.
              </FieldDescription>

              <FieldError id={meta.errorId} errors={meta.errors} />
            </Field>
          )}
        />

        <Field>
          <Button type='submit'>Login</Button>
        </Field>
      </Form>
    </loginForm.Provider>
  )
}

class FormError extends Schema.TaggedError<FormError>()('FormError', {
  message: Schema.String,
}) {}

const Form = ({ children }: { children: React.ReactNode }) => {
  const form = loginForm.use()

  const formId = useAtomValue(form, (s) => s.formId)
  const isPending = useAtomValue(form, (s) => s.isPending)

  const handleSubmit = loginForm.useSubmit(
    Effect.fn(function* login(values) {
      const random = yield* Random.next

      if (random < 0.5)
        return yield* Effect.fail(
          new FormError({
            message: 'Form submission failed. Please try again.',
          })
        )

      return yield* Effect.succeed(values)
    }),
    {
      onSuccess: (values) => {
        toast.add({
          type: 'success',
          title: 'Form submitted successfully',
          description: <pre>{JSON.stringify(values, null, 2)}</pre>,
        })
      },
      onError: (error) =>
        error.match({
          FormError: (e) => toast.add({ type: 'error', title: e.message }),
        }),
    }
  )

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <FieldSet disabled={isPending}>{children}</FieldSet>
    </form>
  )
}
