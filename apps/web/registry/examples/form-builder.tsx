'use client'

import * as Effect from 'effect/Effect'
import * as Schema from 'effect/Schema'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormBuilder } from '@/registry/lib/form-builder'
import { toast } from '@/registry/ui/toast'

const registerForm = FormBuilder.empty
  .add(
    'email',
    Schema.String.check(Schema.isPattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
  )
  .add('password', Schema.String.check(Schema.isMinLength(8)))
  .add('confirmPassword', Schema.String.check(Schema.isMinLength(8)))
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })
  .make(
    Effect.fn(function* handleSubmit(values) {
      yield* Effect.sleep(1000)
      return values
    }),
    {
      defaultValues: { email: '', password: '', confirmPassword: '' },
      onSuccess: (data) =>
        toast.add({
          type: 'success',
          title: 'Registration Successful',
          description: <pre>{JSON.stringify(data, null, 2)}</pre>,
        }),
    }
  )

export default function RegisterForm() {
  return (
    <registerForm.Root
      render={() => (
        <div className='min-w-md rounded-md border bg-card p-4 text-card-foreground shadow-sm' />
      )}
    >
      <FieldSet>
        <FieldLegend>Register</FieldLegend>
        <FieldDescription>
          Please fill out the form below to create an account.
        </FieldDescription>

        <FieldGroup>
          <registerForm.Field
            name='email'
            render={({ field, meta }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={field.id}>Email</FieldLabel>
                <Input
                  {...field}
                  type='email'
                  placeholder='Enter your email'
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <registerForm.Field
            name='password'
            render={({ field, meta }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={field.id}>Password</FieldLabel>
                <Input
                  {...field}
                  type='password'
                  placeholder='Enter your password'
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <registerForm.Field
            name='confirmPassword'
            render={({ field, meta }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={field.id}>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  type='password'
                  placeholder='Confirm your password'
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <registerForm.Submit
            render={({ meta, submit }) => (
              <Field>
                <Button
                  onClick={submit}
                  form={meta.formId}
                  disabled={meta.isPending}
                >
                  {meta.isPending ? 'Registering...' : 'Register'}
                </Button>
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </registerForm.Root>
  )
}
