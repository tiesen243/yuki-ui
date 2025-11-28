import { Button } from '@/components/ui/button'
import {
  FieldLabel,
  FieldSet,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
  Field,
  FieldLegend,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  return (
    <main className='container py-6'>
      <form method='POST' className='bg-card border rounded-lg p-6 shadow-sm'>
        <FieldSet>
          <FieldLegend>Login</FieldLegend>
          <FieldDescription>
            Welcome back! Please sign in to your account.
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input type='email' id='email' name='email' required />
            </Field>

            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <Input type='password' id='password' name='password' required />
            </Field>

            <Field>
              <Button formAction='/api/auth/sign-in'>Login</Button>
            </Field>
          </FieldGroup>

          <FieldSeparator>or</FieldSeparator>

          <Field orientation='horizontal' className='grid sm:grid-cols-2'>
            <Button
              variant='outline'
              formAction='/api/auth/discord'
              formNoValidate
            >
              Sign in with Discord
            </Button>
            <Button
              variant='outline'
              formAction='/api/auth/facebook'
              formNoValidate
            >
              Sign in with Facebook
            </Button>
            <Button
              variant='outline'
              formAction='/api/auth/figma'
              formNoValidate
            >
              Sign in with Figma
            </Button>
            <Button
              variant='outline'
              formAction='/api/auth/google'
              formNoValidate
            >
              Sign in with Google
            </Button>
            <Button
              variant='outline'
              formAction='/api/auth/github'
              formNoValidate
            >
              Sign in with GitHub
            </Button>
            <Button
              variant='outline'
              formAction='/api/auth/vercel'
              formNoValidate
            >
              Sign in with Vercel
            </Button>
          </Field>
        </FieldSet>
      </form>
    </main>
  )
}
