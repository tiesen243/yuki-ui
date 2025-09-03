'use client'

import { Button } from '@yuki/ui/button'
import { toast } from '@yuki/ui/sonner'

import { FormControl, FormField, FormLabel, useForm } from '@/registry/ui/form'
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
    <form className='grid gap-4' onSubmit={form.handleSubmit}>
      <FormField
        control={form.control}
        name='password'
        render={({ field, meta }) => (
          <div id={meta.id} className='grid gap-2'>
            <FormLabel>Password</FormLabel>
            <FormControl {...field}>
              <PasswordInput placeholder='Enter your password' />
            </FormControl>
          </div>
        )}
      />

      <Button>Submit</Button>
    </form>
  )
}
