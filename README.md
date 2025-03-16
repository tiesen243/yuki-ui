# Yuki Form

A lightweight, flexible form component library for React applications with built-in validation support for ArkType and Zod schema validators. Built with a Shadcn UI-inspired composable component approach.

## Features

- 🚀 Simple and intuitive API
- 🔍 First-class validation with ArkType and Zod
- ⚡️ Performant form state management
- 🧩 Composable form components with Shadcn UI styling principles
- 📱 Fully responsive and accessible
- 🔄 Smart form rerendering
- 🎨 Unstyled components with Tailwind CSS integration
- 🧰 Copy-paste component pattern like Shadcn UI

## Styling Philosophy

Yuki Form follows Shadcn UI's "not a component library" approach:

- Components are shipped as source code for you to customize
- Use with Tailwind CSS for styling
- No complicated component APIs, just simple React components
- Style with CSS variables for theming
- No runtime overhead for unused components

## Quick Start

```tsx
'use client'

import { type } from 'arktype'
import { toast } from 'sonner'
// or
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const SignUpForm: React.FC = () => {
  // Using ArkType
  const signUpArktype = type({
    email: 'string.email',
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  })

  // Or using Zod
  const signUpZod = z.object({
    email: z.string().email(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
  })

  const form = useForm({
    schema: signUpArktype, // or signUpZod
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    submitFn: (values) => {
      return values
    },
    onSuccess: (data) =>
      toast.success('Sign up success', {
        description: <pre>{JSON.stringify(data, null, 2)}</pre>,
      }),
  })

  return (
    <Card className="w-svh max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up for an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form form={form}>
          {fields.map(({ label, ...field }) => (
            <FormField
              key={field.name}
              name={field.name}
              render={(props) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl {...field} {...props}>
                    <Input />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button disabled={form.isPending} type="submit">
            Sign Up
          </Button>
        </Form>
      </CardContent>
    </Card>
  )
}

const fields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
]
```

## Composable Components

Yuki Form provides base components that you can customize and compose:

```tsx
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

function MyForm() {
  const form = useForm({
    schema: signUpArktype // or signUpZod
    defaultValues: { name: '' },
    submitFn: (values) => values,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.error(error),
  })

  return (
    <Form form={form}>
      <FormField
        control={form.control}
        name="name"
        render={(field) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl {...field}>
              <Input /> {/* or add {...field} to Input is also fine */}
            </FormControl>
            <FormDescription>Enter your name</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button>Submit</button>
    </Form>
  )
}
```

## API Reference

### useForm

The main hook to create and manage forms.

```tsx
const { handleSubmit, handleChange, handleBlur, isPending, values, errors } =
  useForm({
    schema: schema, // ArkType or Zod schema
    defaultValues: {},
    submitFn: (values) => values,
    onSuccess: (data) => {},
    onError: (error) => {},
  })
```

### Form

The main form component that wraps all form fields.

```tsx
const form = useForm(options)

<Form form={form}>{/* Form fields */}</Form>
```

### FormField

A form field component that wraps a form control.

```tsx
<FormField
  name="name"
  render={({ value, onChange, onBlur }) => (
    <FormItem>
      <FormLabel>Name</FormLabel>
      <FormControl value={value} onChange={onChange} onBlur={onBlur}>
        <Input />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

- `name`: The name of the field
- `render`: A render prop function that receives `value`, `onChange`, and `onBlur` props
  - `value`: The field value `string | number`
  - `onChange`: The change handler function `(event: React.ChangeEvent<HTMLInputElement> | string) => void`
  - `onBlur`: The blur handler function `() => void`

## License

MIT
