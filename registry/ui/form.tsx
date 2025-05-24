import type { StandardSchemaV1 } from '@standard-schema/spec'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/lib/utils'

type InferInput<TSchema extends StandardSchemaV1> =
  StandardSchemaV1.InferInput<TSchema>
interface FormError<TValue extends Record<string, unknown>> {
  message?: string
  issues?: Record<keyof TValue, string>
}

const FormFieldContext = React.createContext<{
  name: string
  value: unknown
  error?: string
  isPending: boolean
} | null>(null)

function useForm<
  TValue extends Record<string, unknown>,
  TSchema extends StandardSchemaV1 | ((value: TValue) => TValue) =
    | StandardSchemaV1
    | ((value: TValue) => TValue),
  TData = unknown,
  TError extends FormError<TValue> = FormError<TValue>,
>({
  defaultValues,
  validator,
  onSubmit,
  onSuccess,
  onError,
}: {
  defaultValues: TValue
  validator?: TSchema extends StandardSchemaV1
    ? InferInput<TSchema> extends TValue
      ? TSchema
      : { [K in keyof TValue]: TValue[K] }
    : (value: TValue) => StandardSchemaV1.Result<TValue>
  onSubmit: (value: TValue) => Promise<TData> | TData
  onSuccess?: (data: TData) => unknown
  onError?: (error: TError) => unknown
}) {
  const formValueRef = React.useRef<TValue>(defaultValues)
  const formErrorRef = React.useRef<TError>(null)

  const [formData, setFormData] = React.useState<TData | null>(null)
  const [isPending, startTransition] = React.useTransition()

  const validate = React.useCallback(
    async <TKey extends keyof TValue>(
      key?: TKey,
      value?: TValue[TKey],
    ): Promise<
      | { isSuccess: true; value: TValue }
      | { isSuccess: false; errors: Record<keyof TValue, string> }
    > => {
      let result: StandardSchemaV1.Result<TValue> | null = null
      const val = key
        ? { ...formValueRef.current, [key]: value }
        : formValueRef.current

      if (typeof validator === 'function') {
        result = validator(val)
      } else if (validator) {
        result = await (validator as StandardSchemaV1<TValue>)[
          '~standard'
        ].validate(val)
      }
      if (result?.issues) {
        const errors = result.issues.reduce(
          (acc, issue) => {
            acc[issue.path as unknown as keyof TValue] = issue.message
            return acc
          },
          {} as Record<keyof TValue, string>,
        )
        return { isSuccess: false, errors }
      } else
        return { isSuccess: true, value: result?.value ?? formValueRef.current }
    },
    [formValueRef, validator],
  )

  const handleSubmit = React.useCallback(() => {
    startTransition(async () => {
      const results = await validate()
      if (!results.isSuccess) {
        formErrorRef.current = { issues: results.errors } as TError
        return
      }
      formErrorRef.current = null

      try {
        const result = await onSubmit(results.value)
        setFormData(result)
        onSuccess?.(result)
      } catch (error) {
        setFormData(null)
        const message = error instanceof Error ? error.message : 'Unknown error'
        formErrorRef.current = { message } as TError
        onError?.({ message } as TError)
      }
    })
  }, [onError, onSubmit, onSuccess, validate])

  const Field = React.useCallback(
    function FormField<TName extends keyof TValue>({
      name,
      render,
    }: {
      name: TName
      render: (props: {
        name: TName
        value: TValue[TName]
        onChange: (
          event:
            | React.ChangeEvent<HTMLInputElement>
            | string
            | number
            | boolean,
        ) => void
        onBlur: (
          event: React.FocusEvent<HTMLInputElement>,
        ) => Promise<void> | void
      }) => React.ReactNode
    }) {
      const [value, setValue] = React.useState<TValue[TName]>(
        formValueRef.current[name],
      )
      const prevValue = React.useRef<TValue[TName]>(value)
      const [error, setError] = React.useState<string>(
        formErrorRef.current?.issues?.[name] ?? '',
      )

      const parseValue = React.useCallback(
        (controller: React.ChangeEvent<HTMLInputElement>['currentTarget']) => {
          let parsedValue = controller.value as TValue[TName]
          if (controller.type === 'number')
            parsedValue = controller.valueAsNumber as TValue[TName]
          else if (controller.type === 'checkbox')
            parsedValue = controller.checked as TValue[TName]
          else if (controller.type === 'date')
            parsedValue = controller.valueAsDate as TValue[TName]
          return parsedValue
        },
        [],
      )

      const handleChange = React.useCallback(
        (
          event:
            | React.ChangeEvent<HTMLInputElement>
            | string
            | number
            | boolean,
        ) => {
          const newValue =
            typeof event === 'object' && 'target' in event
              ? parseValue(event.currentTarget)
              : (event as TValue[TName])

          setValue(newValue)

          React.startTransition(() => {
            formValueRef.current[name] = newValue
          })
        },
        [name, parseValue],
      )

      const handleBlur = React.useCallback(async () => {
        if (prevValue.current === value) return
        prevValue.current = value

        const results = await validate(name, value)
        if (!results.isSuccess) setError(results.errors[name])
        else setError('')
      }, [name, value])

      return (
        <FormFieldContext
          value={{ name: String(name), value, error, isPending }}
        >
          {render({
            name,
            value,
            onChange: handleChange,
            onBlur: handleBlur,
          })}
        </FormFieldContext>
      )
    },
    [isPending, validate],
  )

  const reset = React.useCallback(() => {
    formValueRef.current = defaultValues
    formErrorRef.current = null
    setFormData(null)
  }, [defaultValues])

  return React.useMemo(
    () => ({
      isPending,
      data: formData,
      error: formErrorRef.current,
      value: formValueRef.current,

      Field,
      handleSubmit,
      reset,
    }),
    [Field, formData, handleSubmit, isPending, reset],
  )
}

const FormItemContext = React.createContext<{ id: string } | null>(null)

function useFormField() {
  const formField = React.use(FormFieldContext)
  const formItem = React.useContext(FormItemContext)
  if (!formField || !formItem)
    throw new Error('useFormField must be used within a FormField')

  const { id } = formItem
  return {
    ...formField,
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
  }
}

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn('grid gap-1', className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: React.ComponentProps<'label'>) {
  const { formItemId, error, isPending } = useFormField()

  return (
    <label
      data-slot="form-label"
      htmlFor={formItemId}
      aria-disabled={isPending}
      aria-invalid={!!error}
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

function FormControl({
  className,
  ...props
}: React.ComponentProps<typeof Slot>) {
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
      aria-disabled={isPending}
      className={cn(
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

function FormDescription({
  children,
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
    >
      {children}
    </span>
  )
}

function FormMessage({
  children,
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error) : children

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
