import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'

import { Button } from '@/components/ui/button'
import {
  FieldLegend,
  FieldDescription,
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Password } from '@/server/auth/core/password'
import { accounts, users } from '@/server/drizzle/schema'
import { db } from '@/server/drizzle'

export default function RegisterPage() {
  const register = async (formData: FormData) => {
    'use server'

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
    if (user) throw new Error('User already exists')

    const [{ id }] = await db
      .insert(users)
      .values({ name, email })
      .returning({ id: users.id })

    await db.insert(accounts).values({
      userId: id,
      provider: 'credentials',
      accountId: id,
      password: await new Password().hash(password),
    })

    redirect('/login')
  }

  return (
    <main className='container py-6'>
      <form action={register} className='bg-card p-6 rounded-md border'>
        <FieldSet>
          <FieldLegend>Register</FieldLegend>
          <FieldDescription>
            Create a new account to get started.
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input id='name' name='name' required />
            </Field>

            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input type='email' id='email' name='email' required />
            </Field>

            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input type='password' id='password' name='password' required />
            </Field>

            <Field>
              <Button type='submit'>Register</Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </main>
  )
}
