import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native'

import { cn } from '@/lib/utils'
import { Separator } from '@/registry/native/separator'
import { Typography } from '@/registry/native/typography'

function FieldSet({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof ScrollView> & {
  containerClassName?: string
}) {
  return (
    <KeyboardAvoidingView
      data-slot='field-set'
      className={cn('flex-1', containerClassName)}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        data-slot='field-set-content'
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        contentContainerClassName={cn('grow flex-col gap-4', className)}
        {...props}
      />
    </KeyboardAvoidingView>
  )
}

function FieldLegend({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Typography>, 'variant'>) {
  return (
    <Typography
      data-slot='field-legend'
      className={cn('mb-1.5 text-base font-medium', className)}
      {...props}
    />
  )
}

function FieldGroup({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='field-group'
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  'group/field flex w-full gap-2 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
        horizontal:
          'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        responsive:
          'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
)

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof View> & VariantProps<typeof fieldVariants>) {
  return (
    <View
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role='group'
      data-slot='field'
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

function FieldContent({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='field-content'
      className={cn(
        'group/field-content flex flex-1 flex-col gap-0.5 leading-snug',
        className
      )}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Typography>, 'variant'>) {
  return (
    <Typography
      data-slot='field-label'
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 group-data-disabled:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Typography>, 'variant'>) {
  return (
    <Typography
      data-slot='field-label'
      className={cn(
        'flex w-fit items-center gap-2 text-sm font-medium group-data-[disabled=true]/field:opacity-50',
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Typography>, 'variant'>) {
  return (
    <Typography
      data-slot='field-description'
      className={cn(
        'text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5',
        'last:mt-0 nth-last-2:-mt-1',
        '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<typeof View> & { children?: React.ReactNode }) {
  return (
    <View
      data-slot='field-separator'
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className
      )}
      {...props}
    >
      <Separator className='absolute inset-0 top-1/2' />
      {children && (
        <View
          className='relative mx-auto block w-fit bg-background px-2 text-muted-foreground'
          data-slot='field-separator-content'
        >
          {children}
        </View>
      )}
    </View>
  )
}

function FieldError({
  children,
  errors,
  ...props
}: React.ComponentProps<typeof View> & {
  errors?: ({ message?: string } | undefined)[]
}) {
  const content = useMemo(() => {
    if (children) return children

    if (!errors?.length) return null

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length === 1)
      return (
        <Typography className='text-sm font-normal text-destructive'>
          {uniqueErrors[0]?.message}
        </Typography>
      )

    return (
      <View className='flex flex-col gap-1'>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && (
              <Typography
                key={index}
                className='text-sm font-normal text-destructive'
              >
                {error.message}
              </Typography>
            )
        )}
      </View>
    )
  }, [children, errors])

  if (!content) return null

  return (
    <View role='alert' data-slot='field-error' {...props}>
      {content}
    </View>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
