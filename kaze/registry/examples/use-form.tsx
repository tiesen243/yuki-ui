'use client'

import * as z from 'zod'

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
import { useForm } from '@/registry/hooks/use-form'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  age: z
    .number('Age must be a number')
    .min(7, 'Age nust be between 7 and 12')
    .max(12, 'Age nust be between 7 and 12'),
})

export default function UseFormDemo() {
  const form = useForm({
    defaultValues: { name: '', age: 0 },
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
          <form.Field
            name='name'
            render={({ meta, field }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={meta.fieldId}>Name</FieldLabel>
                <Input {...field} placeholder='Enter your name' />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <form.Field
            name='age'
            render={({ meta, field }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={meta.fieldId}>Age</FieldLabel>
                <Input {...field} type='number' placeholder='Enter your age' />
                <FieldError id={meta.errorId} errors={meta.errors} />
              </Field>
            )}
          />

          <Field>
            <Button type='submit' disabled={form.state.isPending}>
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  )
}
