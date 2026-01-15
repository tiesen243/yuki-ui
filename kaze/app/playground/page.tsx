'use client'

import { HomeLayout } from 'fumadocs-ui/layouts/home'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { env } from '@/env'
import {
  Form,
  Fieldset,
  FieldLegend,
  FieldGroup,
  Field,
  FieldLabel,
  FieldControl,
  FieldError,
} from '@/registry/ui/form'

export default function PlaygroundPage() {
  return (
    <HomeLayout>
      <main className='container py-12'>
        {env.VERCEL_URL}
        <Form
          schema={z.object({ email: z.email(), password: z.string().min(6) })}
          onSubmit={async (data) => {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            return data
          }}
          onSuccess={(data) =>
            toast.success('Form submitted successfully!', {
              description: JSON.stringify(data),
            })
          }
          onError={({ message }) =>
            toast.error('Form submission failed', { description: message })
          }
        >
          <Fieldset>
            <FieldLegend>Login Form</FieldLegend>

            <FieldGroup>
              <Field name='email'>
                <FieldLabel>Email</FieldLabel>
                <FieldControl render={<Input />} />
                <FieldError />
              </Field>

              <Field name='password'>
                <FieldLabel>Password</FieldLabel>
                <FieldControl render={<Input type='password' />} />
                <FieldError />
              </Field>

              <Field>
                <Button type='submit'>Submit</Button>
              </Field>
            </FieldGroup>
          </Fieldset>
        </Form>
      </main>
    </HomeLayout>
  )
}
