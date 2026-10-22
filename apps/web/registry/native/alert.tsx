import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'
import * as React from 'react'
import { View } from 'react-native'

import type { IconName } from '@/registry/native/icons'

import { cn } from '@/lib/utils'
import { Icon } from '@/registry/native/icons'
import { Typography, TypographyContext } from '@/registry/native/typography'

const alertVariants = cva(
  'relative w-full rounded-lg border border-border bg-card p-3',
  {
    variants: {
      variant: {
        default: 'border-border',
        destructive: 'border-destructive/30 bg-destructive/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const textVariants = {
  default: 'text-card-foreground',
  destructive: 'text-destructive',
} as const

function Alert({
  className,
  variant = 'default',
  icon,
  children,
  ...props
}: React.ComponentProps<typeof View> &
  VariantProps<typeof alertVariants> & {
    icon?: IconName
  }) {
  return (
    <TypographyContext
      // oxlint-disable-next-line typescript/no-non-null-assertion
      value={textVariants[variant!]}
    >
      <View
        data-slot='alert'
        accessibilityRole='alert'
        className={cn(
          'flex-row items-start gap-3',
          alertVariants({ variant }),
          !icon && 'flex-col',
          className
        )}
        {...props}
      >
        {icon ? (
          <>
            <Icon
              name={icon}
              className={cn(
                // oxlint-disable-next-line typescript/no-non-null-assertion
                textVariants[variant!],
                'size-4'
              )}
            />
            <View className='flex-1 gap-3'>{children}</View>
          </>
        ) : (
          children
        )}
      </View>
    </TypographyContext>
  )
}

function AlertTitle({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const style = 'text-base leading-none font-semibold tracking-tight'

  if (typeof children === 'string')
    return (
      <Typography data-slot='alert-title' className={cn(style, className)}>
        {children}
      </Typography>
    )

  return (
    <TypographyContext value={style}>
      <View data-slot='alert-title' className={className} {...props}>
        {children}
      </View>
    </TypographyContext>
  )
}

function AlertDescription({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const style = 'text-sm text-balance text-muted-foreground'

  if (typeof children === 'string')
    return (
      <Typography
        data-slot='alert-description'
        className={cn(style, className)}
      >
        {children}
      </Typography>
    )

  return (
    <TypographyContext value={style}>
      <View data-slot='alert-description' className={className} {...props}>
        {children}
      </View>
    </TypographyContext>
  )
}

function AlertAction({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='alert-action'
      className={cn('ml-auto self-start', className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
