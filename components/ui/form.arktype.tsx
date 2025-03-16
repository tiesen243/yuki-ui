import type { ArkError, Type } from 'arktype'
import * as React from 'react'
import { Label } from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { type } from 'arktype'

import { cn } from '@/lib/utils'

const useForm = <TValue = unknown, TData = void>({
  schema,
  defaultValues,
  submitFn,
  onSuccess,
  onError,
  isReset,
}: {
  schema: Type<TValue>
  defaultValues: TValue
  submitFn: (values: TValue) => Promise<TData> | TData
  onSuccess?: (data: TData) => void
  onError?: (error: unknown) => void
  isReset?: boolean
}) => {
  const [values, setValues] = React.useState<TValue>(defaultValues)
  const [isPending, startTransition] = React.useTransition()
  const [errors, setErrors] = React.useState<
    Record<string, string | undefined>
  >({})

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      startTransition(async () => {
        e.preventDefault()
        e.stopPropagation()

        const parsed = schema(values)
        console.log(parsed)

        if (parsed instanceof type.errors)
          setErrors(formatErrors(parsed.byPath))
        else
          try {
            const data = await submitFn(values)
            if (onSuccess) onSuccess(data)
            if (isReset) setValues(defaultValues)
            setErrors({})
          } catch (error) {
            if (onError) onError(error)
          }
      })
    },
    [defaultValues, isReset, onError, onSuccess, schema, submitFn, values],
  )

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      if (typeof e === 'string') {
        return
      } else {
        setValues((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
    },
    [],
  )

  const handleBlur = React.useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const parsed = schema(values)
      if (parsed instanceof type.errors) {
        const errors = formatErrors(parsed.byPath)
        setErrors((prev) => ({
          ...prev,
          [e.target.name]: errors[e.target.name],
        }))
      } else {
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
      }
    },
    [schema, values],
  )

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    isPending,
    values,
    errors,
  }
}

type FormContextValue<T> = ReturnType<typeof useForm<T>>

const FormContext = React.createContext<FormContextValue<unknown>>(
  {} as FormContextValue<unknown>,
)

function Form<T>({
  className,
  form,
  ...props
}: React.ComponentProps<'form'> & { form: FormContextValue<T> }) {
  return (
    <FormContext.Provider value={form}>
      <form
        {...props}
        data-slot="form"
        className={cn('flex flex-col gap-4', className)}
        onSubmit={form.handleSubmit}
      />
    </FormContext.Provider>
  )
}

interface FormFieldContextValue {
  name: string
  value?: string
  error?: string
  isPending?: boolean
  formItemId?: string
  formDescriptionId?: string
  formMessageId?: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

function FormField({
  name,
  render,
}: {
  name: string
  render: (props: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  }) => React.ReactNode
}) {
  const form = React.use(FormContext)

  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({
        value: (form.values as never)[name],
        onChange: form.handleChange,
        onBlur: form.handleBlur,
      })}
    </FormFieldContext.Provider>
  )
}

interface FormItemContextValue {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<'fieldset'>) {
  const { isPending } = React.use(FormContext)
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <fieldset
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        disabled={isPending}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

const useFormField = () => {
  const formContext = React.use(FormContext)
  const fieldContext = React.use(FormFieldContext)
  const itemContext = React.use(FormItemContext)

  return {
    id: itemContext.id,
    name: fieldContext.name,
    value: (formContext.values as never)[fieldContext.name],
    error: formContext.errors[fieldContext.name],
    isPending: formContext.isPending,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
  }
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { formItemId, error } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      htmlFor={formItemId}
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        'data-[error=true]:text-destructive',
        className,
      )}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, isPending, formItemId, formDescriptionId, formMessageId } =
    useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      aria-disabled={isPending}
      {...props}
    />
  )
}

function FormDescription({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const { formDescriptionId } = useFormField()

  return (
    <span
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { formMessageId, error } = useFormField()

  const body = error ? String(error) : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useForm,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}

const formatErrors = (errors: Record<string, ArkError>) =>
  Object.entries(errors).reduce<Record<string, string>>((acc, [key, value]) => {
    switch (value.code) {
      case 'pattern':
        acc[key] = `${key} is invalid`
        break
      case 'required':
        acc[key] = `${key} is required`
        break
      default:
        acc[key] = value.description ?? value.message
    }
    return acc
  }, {})
