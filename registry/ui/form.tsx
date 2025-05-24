import type { StandardSchemaV1 } from '@standard-schema/spec'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

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
  const errorRef = React.useRef<TError | null>(null)

  const getFieldValue = React.useCallback(
    (name: keyof InferInput<TSchema>) => formValuesRef.current[name],
    [],
  )

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

  const getError = React.useCallback(
    (name: keyof InferInput<TSchema>) => errorRef.current?.field?.[name],
    [],
  )

  const setError = React.useCallback(
    (name: keyof InferInput<TSchema>, message: string) => {
      errorRef.current ??= { field: {} } as TError
      if (errorRef.current.field) errorRef.current.field[name] = message
    },
    [],
  )

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

          errorRef.current = { message: '', field: fieldErrors } as TError
          return
        }

        const result = await onSubmit(parsed.value)
        setData(result)
        errorRef.current = { message: '', field: {} } as TError
        await onSuccess?.(result)
      } catch (error) {
        let message = 'An unexpected error occurred'
        if (error instanceof Error) message = error.message

        errorRef.current = { message, field: {} } as TError
        await onError?.({ message } as TError)
      }
    })
  }, [onError, onSubmit, onSuccess, validator])

  const reset = React.useCallback(() => {
    formValuesRef.current = defaultValues
    setData(null)
    errorRef.current = { message: '', field: {} } as TError
  }, [defaultValues])

  const Field = React.useCallback(
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
        () => getError(props.name),
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
          } as InferInput<TSchema>

          const parsed = await validator['~standard'].validate({
            ...(formValuesRef.current as Record<string, unknown>),
            [name]: currentValue,
          })
          if (parsed.issues) {
            const fieldIssue = parsed.issues.find(
              (issue) => issue.path?.[0] === name,
            )
            const errorMessage = fieldIssue?.message
            setLocalError(errorMessage ?? '')
            setError(name, errorMessage ?? '')
          } else {
            setLocalError(undefined)
            setError(name, '')
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
    },
    [getError, getFieldValue, isPending, setError, setFieldValue, validator],
  )

  return React.useMemo(
    () => ({
      values: formValuesRef.current,
      setValues: setFieldValue,
      reset,
      data,
      error: errorRef.current,
      handleSubmit,
      isPending,
      Field,
    }),
    [Field, data, handleSubmit, isPending, reset, setFieldValue],
  )
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
  const formField = React.use(FormFieldContext)
  const formItem = React.use(FormItemContext)
  if (!formField || !formItem)
    throw new Error('useFormField must be used within a FormItem')

  const { name, error, isPending } = formField
  const { id } = formItem

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
  const { error, formItemId, isPending } = useFormField()

  return (
    <label
      data-slot="form-label"
      htmlFor={formItemId}
      aria-invalid={!!error}
      aria-disabled={isPending}
      className={cn(
        'text-sm leading-none font-medium',
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-70',
        'aria-invalid:text-destructive',
        className,
      )}
      {...props}
    />
  )
}

function FormControl(props: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId, isPending } =
    useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      // @ts-expect-error - Slot does not have disabled prop
      disabled={isPending}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
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

function FormMessage({
  className,
  children,
  ...props
}: React.ComponentProps<'p'>) {
  const { formMessageId, error } = useFormField()
  const body = error ? String(error) : children

  if (!body) return null

  return (
    <span
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm font-medium', className)}
      {...props}
    >
      {body}
    </span>
  )
}

export {
  useForm,
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}
