'use client'

import { type } from 'arktype'

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

export default function PlaygroundPage() {
  const { formId, FormField, handleSubmit, state } = useForm({
    defaultValues: { name: '', age: 0 },
    schema: type({
      name: '2<string<255',
      age: '2<number<150',
    }),
    onSubmit: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      return data
    },
  })

  return (
    <main className='container py-12'>
      <form id={formId} onSubmit={handleSubmit}>
        <FieldSet>
          <FieldLegend>Playground</FieldLegend>
          <FieldDescription>
            This is the playground page for testing components and hooks.
          </FieldDescription>

          <FieldGroup>
            <FormField
              name='name'
              render={({ field, meta }) => (
                <Field data-invalid={meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.id}>Name</FieldLabel>
                  <Input {...field} placeholder='Enter something...' />
                  <FieldDescription id={meta.descriptionId}>
                    Please enter your full name.
                  </FieldDescription>
                  <FieldError id={meta.erorrId} errors={meta.errors} />
                </Field>
              )}
            />

            <FormField
              name='age'
              render={({ field, meta }) => (
                <Field data-invalid={meta.errors.length > 0}>
                  <FieldLabel htmlFor={field.id}>Age</FieldLabel>
                  <Input
                    {...field}
                    type='number'
                    placeholder='Enter your age...'
                  />
                  <FieldDescription id={meta.descriptionId}>
                    Please enter your age in years.
                  </FieldDescription>
                  <FieldError id={`${field.name}-error`} errors={meta.errors} />
                </Field>
              )}
            />

            <Field>
              <Button type='submit' disabled={state.isPending}>
                Submit
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </main>
  )
}
