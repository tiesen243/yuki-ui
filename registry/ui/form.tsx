import type { StandardSchemaV1 } from '@standard-schema/spec'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

interface FormStateContextValue {
  isPending: boolean
  data: unknown
  error: { message?: string; fieldErrors: Record<string, string> }
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement>,
  ) => Promise<void> | void
}
const FormStateContext = React.createContext<FormStateContextValue>(
  {} as FormStateContextValue,
)

interface FieldValueContextValue<TSchema extends StandardSchemaV1> {
  getFieldValue: (name: keyof StandardSchemaV1.InferInput<TSchema>) => unknown
  setFieldValue: (
    name: keyof StandardSchemaV1.InferInput<TSchema>,
    value: StandardSchemaV1.InferInput<TSchema>[keyof StandardSchemaV1.InferInput<TSchema>],
  ) => void
  handleBlur: (
    event: React.FocusEvent<HTMLInputElement>,
  ) => Promise<void> | void
}
const FieldValueContext = React.createContext<
  FieldValueContextValue<StandardSchemaV1>
>({} as FieldValueContextValue<StandardSchemaV1>)

function useForm<TSchema extends StandardSchemaV1, TData = unknown>(params: {
  schema: TSchema
  defaultValues: StandardSchemaV1.InferInput<TSchema>
  submitFn: (
    values: StandardSchemaV1.InferInput<TSchema>,
  ) => Promise<TData> | TData
  onSuccess?: (data: TData) => Promise<void> | void
  onError?: (error: string) => Promise<void> | void
}) {
  const { schema, defaultValues, submitFn, onSuccess, onError } = params

  const formValuesRef = React.useRef(defaultValues)
  const [isPending, startTransition] = React.useTransition()
  const [data, setData] = React.useState<TData | undefined>(undefined)
  const [error, setError] = React.useState<FormStateContextValue['error']>({
    message: '',
    fieldErrors: {},
  })

  const getFieldValues = React.useMemo(() => () => formValuesRef.current, [])
  const getFieldValue = React.useMemo(
    () => (name: keyof StandardSchemaV1.InferInput<TSchema>) =>
      formValuesRef.current[name] as never,
    [],
  )
  const setFieldValue = React.useMemo(
    () =>
      (
        name: keyof StandardSchemaV1.InferInput<TSchema>,
        value: StandardSchemaV1.InferInput<TSchema>[keyof StandardSchemaV1.InferInput<TSchema>],
      ) => {
        ;(formValuesRef.current as never)[name] = value as never
      },
    [],
  )

  const handleBlur = React.useMemo(
    () => async (event: React.FocusEvent<HTMLInputElement>) => {
      const { name } = event.target
      const res = await schema['~standard'].validate(formValuesRef.current)
      if (res.issues)
        setError((prev) => ({
          message: 'Validation error',
          fieldErrors: {
            ...prev.fieldErrors,
            [name]:
              res.issues.find((issue) => issue.path?.at(0) === name)?.message ??
              '',
          },
        }))
      else
        setError((prev) => ({
          message: '',
          fieldErrors: {
            ...prev.fieldErrors,
            [name]: '',
          },
        }))
    },
    [schema],
  )

  const handleSubmit = React.useMemo(
    () => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      event.stopPropagation()

      startTransition(async () => {
        const parsed = await schema['~standard'].validate(formValuesRef.current)
        if (parsed.issues) {
          setError({
            message: 'Validation error',
            fieldErrors: parsed.issues.reduce<Record<string, string>>(
              (acc, issue) => ({
                ...acc,
                [issue.path as never]: issue.message,
              }),
              {},
            ) as Record<keyof StandardSchemaV1.InferInput<TSchema>, string>,
          })
          if (onError) void onError('Validation error')
          return
        }

        try {
          const data = await submitFn(parsed.value)
          setData(data)
          if (onSuccess) void onSuccess(data)
          setError({ message: '', fieldErrors: {} })
        } catch (error) {
          let message: string
          if (error instanceof Error) message = error.message
          else message = 'Unknown error'

          setData(undefined)
          setError({ message, fieldErrors: {} })
          if (onError) void onError(message)
        }
      })
    },
    [onError, onSuccess, schema, submitFn],
  )

  const reset = React.useCallback(
    () => () => {
      formValuesRef.current = defaultValues
      setError({ message: '', fieldErrors: {} })
    },
    [defaultValues],
  )

  return {
    data,
    error,
    value: getFieldValues(),
    isPending,
    getFieldValue,
    setFieldValue,
    handleBlur,
    handleSubmit,
    reset,
  }
}

function Form<T extends StandardSchemaV1>({
  className,
  form,
  ...props
}: React.ComponentProps<'form'> & { form: ReturnType<typeof useForm<T>> }) {
  const {
    isPending,
    error,
    getFieldValue,
    setFieldValue,
    handleBlur,
    handleSubmit,
  } = form

  const formStateContextValue = React.useMemo(
    () => ({ isPending, data: form.data, error, handleBlur }),
    [isPending, form.data, error, handleBlur],
  )

  const fieldValueContextValue = React.useMemo(
    () => ({ getFieldValue, setFieldValue, handleBlur }),
    [getFieldValue, handleBlur, setFieldValue],
  )

  return (
    <FormStateContext value={formStateContextValue}>
      <FieldValueContext value={fieldValueContextValue}>
        <form
          data-slot="form"
          className={cn('grid gap-4', className)}
          onSubmit={handleSubmit}
          {...props}
        />
      </FieldValueContext>
    </FormStateContext>
  )
}

interface FormFieldContextValue {
  name: string
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
    name: string
    value: string
    onChange: (
      event: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
    ) => void
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => Promise<void> | void
  }) => React.ReactNode
}) {
  const { getFieldValue, setFieldValue } = React.use(FieldValueContext)
  const { handleBlur } = React.use(FormStateContext)
  const [localValue, setLocalValue] = React.useState(() =>
    getFieldValue(name as never),
  )

  const prevNameRef = React.useRef(name)

  React.useEffect(() => {
    if (prevNameRef.current !== name) {
      setLocalValue(getFieldValue(name as never))
      prevNameRef.current = name
    }
  }, [getFieldValue, name])

  const handleChange = React.useMemo(
    () =>
      (
        event: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
      ) => {
        let newValue: unknown

        if (event && typeof event === 'object' && 'target' in event) {
          if (event.target.type === 'number')
            newValue = event.target.valueAsNumber
          else if (event.target.type === 'checkbox')
            newValue = event.target.checked
          else if (event.target.type === 'date')
            newValue = event.target.valueAsDate
          else newValue = event.target.value
        } else newValue = event

        setFieldValue(name as never, newValue as never)
        setLocalValue(newValue as never)
      },
    [name, setFieldValue],
  )

  return (
    <FormFieldContext value={{ name }}>
      {render({
        name,
        value: localValue as string,
        onChange: handleChange,
        onBlur: handleBlur,
      })}
    </FormFieldContext>
  )
}

interface FormItemContextValue {
  id: string
}
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

function FormItem({ className, ...props }: React.ComponentProps<'fieldset'>) {
  const id = React.useId()
  const { isPending } = React.use(FormStateContext)

  return (
    <FormItemContext value={{ id }}>
      <fieldset
        data-slot="form-item"
        className={cn('grid gap-2', className)}
        disabled={isPending}
        {...props}
      />
    </FormItemContext>
  )
}

function useFormField() {
  const formState = React.use(FormStateContext)
  const formField = React.use(FormFieldContext)
  const formItem = React.use(FormItemContext)

  const { id } = formItem

  return {
    id,
    name: formField.name,
    isPending: formState.isPending,
    error: formState.error.fieldErrors[formField.name],
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

function FormLabel({ className, ...props }: React.ComponentProps<'label'>) {
  const { formItemId, error } = useFormField()

  return (
    <label
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

function FormControl(props: React.ComponentProps<'input'>) {
  const { formItemId, formDescriptionId, formMessageId, isPending, error } =
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

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()

  return (
    <p
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

  if (!body) return null

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
