'use client'

import { Field as FieldPrimitive } from '@base-ui/react/field'
import { Fieldset as FieldsetPrimitive } from '@base-ui/react/fieldset'
import { Form as FormPrimitive } from '@base-ui/react/form'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface RootProps<
  TSchema extends StandardSchemaV1,
  TData,
  TError = Error,
> extends Omit<FormPrimitive.Props, 'onSubmit' | 'onError'> {
  schema: TSchema
  onSubmit: (
    data: StandardSchemaV1.InferInput<TSchema>,
  ) => TData | Promise<TData>
  onSuccess?: (data: TData) => void
  onError?: (error: TError) => void
}

const FormContext = React.createContext<{
  errors: Record<string, string>
  isPending: boolean
} | null>(null)

const useFormContext = () => {
  const context = React.useContext(FormContext)
  if (!context)
    throw new Error('useFormContext must be used within a FormProvider')
  return context
}

function Form<TSchema extends StandardSchemaV1, TData, TError = Error>({
  schema,
  onSubmit,
  onSuccess,
  onError,
  ...props
}: RootProps<TSchema, TData, TError>) {
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isPending, startTransition] = React.useTransition()

  return (
    <FormContext value={{ errors, isPending }}>
      <FormPrimitive
        {...props}
        data-slot='form'
        errors={errors}
        onFormSubmit={(data) =>
          startTransition(async () => {
            try {
              const parsed = await schema['~standard'].validate(data)
              if (parsed.issues) {
                const fieldErrors = parsed.issues.reduce(
                  (acc, issue) => {
                    acc[issue.path?.[0] as string] = issue.message
                    return acc
                  },
                  {} as Record<string, string>,
                )
                return setErrors(fieldErrors)
              }
              const result = await onSubmit(parsed.value)
              if (onSuccess) onSuccess(result)
            } catch (error) {
              if (onError) onError(error as TError)
            }
          })
        }
      />
    </FormContext>
  )
}

function Fieldset({
  className,
  ...props
}: React.ComponentProps<typeof FieldsetPrimitive.Root>) {
  return (
    <FieldsetPrimitive.Root
      data-slot='field-set'
      className={cn(
        'gap-4 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3 flex flex-col',
        className,
      )}
      {...props}
    />
  )
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<typeof FieldsetPrimitive.Legend> & {
  variant?: 'legend' | 'label'
}) {
  return (
    <FieldsetPrimitive.Legend
      data-slot='field-legend'
      data-variant={variant}
      className={cn(
        'mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
        className,
      )}
      {...props}
    />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-group'
      className={cn(
        'gap-5 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4 group/field-group @container/field-group flex w-full flex-col',
        className,
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  'data-[invalid=true]:text-destructive gap-2 group/field flex w-full data-disabled:opacity-50 data-disabled:pointer-events-none',
  {
    variants: {
      orientation: {
        vertical: 'flex-col [&>*]:w-full [&>.sr-only]:w-auto',
        horizontal:
          'flex-row items-center [&>[data-slot=field-label]]:flex-auto has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        responsive:
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto @md/field-group:[&>[data-slot=field-label]]:flex-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Root> &
  VariantProps<typeof fieldVariants>) {
  const { isPending } = useFormContext()

  return (
    <FieldPrimitive.Root
      role='group'
      data-slot='field'
      data-disabled={isPending}
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-content'
      className={cn(
        'gap-0.5 group/field-content flex flex-1 flex-col leading-snug',
        className,
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Label>) {
  return (
    <FieldPrimitive.Label
      data-slot='field-label'
      className={cn(
        'has-data-checked:bg-primary/5 has-data-checked:border-primary dark:has-data-checked:bg-primary/10 gap-2 group-data-[disabled=true]/field:opacity-50 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-2.5 group/field-label peer/field-label flex w-fit leading-snug',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        'data-invalid:text-destructive',
        className,
      )}
      {...props}
    />
  )
}

function FieldControl({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Control>) {
  return (
    <FieldPrimitive.Control
      data-slot='field-control'
      className={cn('w-full', className)}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-title'
      className={cn(
        'gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50 flex w-fit items-center leading-snug',
        className,
      )}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Description>) {
  return (
    <FieldPrimitive.Description
      data-slot='field-description'
      className={cn(
        'text-muted-foreground text-left text-sm [[data-variant=legend]+&]:-mt-1.5 leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot='field-separator'
      data-content={!!children}
      className={cn(
        '-my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2 relative',
        className,
      )}
      {...props}
    >
      <Separator className='absolute inset-0 top-1/2' />
      {children && (
        <span
          className='text-muted-foreground px-2 bg-background relative mx-auto block w-fit'
          data-slot='field-separator-content'
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  className,
  ...props
}: React.ComponentProps<typeof FieldPrimitive.Error>) {
  return (
    <FieldPrimitive.Error
      data-slot='field-error'
      role='alert'
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    />
  )
}

export {
  Form,
  Fieldset,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldControl,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
}

/** The Standard Schema interface. */
export interface StandardSchemaV1<Input = unknown, Output = Input> {
  /** The Standard Schema properties. */
  readonly '~standard': StandardSchemaV1.Props<Input, Output>
}

export declare namespace StandardSchemaV1 {
  /** The Standard Schema properties interface. */
  export interface Props<Input = unknown, Output = Input> {
    /** The version number of the standard. */
    readonly version: 1
    /** The vendor name of the schema library. */
    readonly vendor: string
    /** Validates unknown input values. */
    readonly validate: (
      value: unknown,
      options?: StandardSchemaV1.Options | undefined,
    ) => Result<Output> | Promise<Result<Output>>
    /** Inferred types associated with the schema. */
    readonly types?: Types<Input, Output> | undefined
  }

  /** The result interface of the validate function. */
  export type Result<Output> = SuccessResult<Output> | FailureResult

  /** The result interface if validation succeeds. */
  export interface SuccessResult<Output> {
    /** The typed output value. */
    readonly value: Output
    /** A falsy value for `issues` indicates success. */
    readonly issues?: undefined
  }

  export interface Options {
    /** Explicit support for additional vendor-specific parameters, if needed. */
    readonly libraryOptions?: Record<string, unknown> | undefined
  }

  /** The result interface if validation fails. */
  export interface FailureResult {
    /** The issues of failed validation. */
    readonly issues: ReadonlyArray<Issue>
  }

  /** The issue interface of the failure output. */
  export interface Issue {
    /** The error message of the issue. */
    readonly message: string
    /** The path of the issue, if any. */
    readonly path?: ReadonlyArray<PropertyKey | PathSegment> | undefined
  }

  /** The path segment interface of the issue. */
  export interface PathSegment {
    /** The key representing a path segment. */
    readonly key: PropertyKey
  }

  /** The Standard Schema types interface. */
  export interface Types<Input = unknown, Output = Input> {
    /** The input type of the schema. */
    readonly input: Input
    /** The output type of the schema. */
    readonly output: Output
  }

  /** Infers the input type of a Standard Schema. */
  export type InferInput<Schema extends StandardSchemaV1> = NonNullable<
    Schema['~standard']['types']
  >['input']

  /** Infers the output type of a Standard Schema. */
  export type InferOutput<Schema extends StandardSchemaV1> = NonNullable<
    Schema['~standard']['types']
  >['output']
}
