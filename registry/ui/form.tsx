import type { StandardSchemaV1 } from '@standard-schema/spec'
import * as React from 'react'

import { cn } from '@/lib/utils'

type InferInput<TSchema extends StandardSchemaV1> =
  StandardSchemaV1.InferInput<TSchema>
interface FieldError<TSchema extends StandardSchemaV1 = StandardSchemaV1> {
  message?: string
  field?: Record<keyof InferInput<TSchema>, string>
}

interface UseFormParams<
  TSchema extends StandardSchemaV1,
  TData = unknown,
  TError extends FieldError<TSchema> = FieldError<TSchema>,
> {
  validator: TSchema
  defaultValues: InferInput<TSchema>
  onSubmit: (values: InferInput<TSchema>) => Promise<TData> | TData
  onSuccess?: (data: TData) => unknown
  onError?: (error: TError) => unknown
}

const FormFieldContext = React.createContext<{
  name: string
  value: unknown
  error?: string
  isPending: boolean
} | null>(null)

function useForm<
  TSchema extends StandardSchemaV1,
  TData = unknown,
  TError extends FieldError<TSchema> = FieldError<TSchema>,
>({
  validator,
  defaultValues,
  onSubmit,
  onSuccess,
  onError,
}: UseFormParams<TSchema, TData, TError>) {
  const formValuesRef = React.useRef<InferInput<TSchema>>(defaultValues)
  const prevFormValuesRef = React.useRef<InferInput<TSchema>>(defaultValues)

  const [isPending, startTransition] = React.useTransition()
  const [data, setData] = React.useState<TData | null>(null)
  const [error, setError] = React.useState<TError | null>(null)

  const handleSubmit = React.useCallback(() => {
    startTransition(async () => {
      try {
        const parsed = await validator['~standard'].validate(
          formValuesRef.current,
        )

        if (parsed.issues) {
          const fieldErrors = parsed.issues.reduce<Record<string, string>>(
            (acc, issue) => {
              acc[String(issue.path?.[0] as unknown)] = issue.message
              return acc
            },
            {},
          )

          setError({ field: fieldErrors } as TError)
          return
        }

        const result = await onSubmit(parsed.value)
        setData(result)
        setError(null)
        await onSuccess?.(result)
      } catch (error) {
        const formError = error as TError
        setError(formError)
        await onError?.(formError)
      }
    })
  }, [onError, onSubmit, onSuccess, validator])

  const getFieldValue = React.useCallback((name: keyof InferInput<TSchema>) => {
    return formValuesRef.current[name]
  }, [])

  const getFieldValues = React.useCallback(() => {
    return formValuesRef.current
  }, [])

  const setFieldValue = React.useCallback(
    (
      name: keyof InferInput<TSchema>,
      value: InferInput<TSchema>[typeof name],
    ) => {
      formValuesRef.current = {
        ...(formValuesRef.current as Record<string, unknown>),
        [name]: value,
      } as InferInput<TSchema>
    },
    [],
  )

  const reset = React.useCallback(() => {
    formValuesRef.current = defaultValues
    setData(null)
    setError(null)
  }, [defaultValues])

  function Field<TName extends keyof InferInput<TSchema>>(props: {
    name: TName
    render: (field: {
      name: TName
      value: InferInput<TSchema>[TName]
      error?: string
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
      onBlur: (event: React.FocusEvent<HTMLInputElement>) => Promise<void>
    }) => React.ReactNode
  }) {
    const [localValue, setLocalValue] = React.useState<
      InferInput<TSchema>[TName]
    >(() => getFieldValue(props.name) as InferInput<TSchema>[TName])
    const [localError, setLocalError] = React.useState<string | undefined>(
      error?.field?.[props.name],
    )

    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = (
          event.currentTarget.type === 'number'
            ? event.currentTarget.valueAsNumber
            : event.currentTarget.value
        ) as InferInput<TSchema>[TName]

        setLocalValue(newValue)
        React.startTransition(() => {
          setFieldValue(props.name, newValue)
        })
      },
      [props.name],
    )

    const handleBlur = React.useCallback(
      async (event: React.FocusEvent<HTMLInputElement>) => {
        const { name } = event.target as unknown as {
          name: keyof InferInput<TSchema>
        }
        const currentValue = formValuesRef.current[name]

        if (prevFormValuesRef.current[name] === currentValue) return

        prevFormValuesRef.current = {
          ...(prevFormValuesRef.current as Record<string, unknown>),
          [name]: currentValue,
        }

        const testData = {
          ...(formValuesRef.current as Record<string, unknown>),
          [name]: currentValue,
        }
        const parsed = await validator['~standard'].validate(testData)
        if (parsed.issues) {
          const fieldIssue = parsed.issues.find(
            (issue) => issue.path?.[0] === name,
          )
          setLocalError(fieldIssue?.message)
        }
      },
      [],
    )

    const contextValue = React.useMemo(
      () => ({
        name: String(props.name),
        value: localValue,
        error: localError,
        isPending,
      }),
      [props.name, localValue, localError],
    )

    return (
      <FormFieldContext value={contextValue}>
        {props.render({
          name: props.name,
          value: localValue,
          error: localError,
          onChange: handleChange,
          onBlur: handleBlur,
        })}
      </FormFieldContext>
    )
  }

  return {
    values: getFieldValues(),
    setValues: setFieldValue,
    reset,
    data,
    error,
    handleSubmit,
    isPending,
    Field,
  }
}

const FormItemContext = React.createContext<{ id: string } | null>(null)

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-1', className)}
        {...props}
      />
    </FormItemContext>
  )
}

const useFormField = () => {
  const formItem = React.use(FormItemContext)
  const formField = React.use(FormFieldContext)
  if (!formItem || !formField)
    throw new Error('useFormField must be used within a FormItem')

  const { id } = formItem
  const { name, error, isPending } = formField

  return React.useMemo(
    () => ({
      id,
      name,
      error,
      isPending,
      formItemId: `${id}-form-item`,
      formDescriptionId: `${id}-form-item-description`,
      formMessageId: `${id}-form-item-message`,
    }),
    [id, name, error, isPending],
  )
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

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
  const { formMessageId, error } = useFormField()
  const body = error ? String(error) : children

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
  useFormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
}
