import type { Text } from 'react-native'

import * as React from 'react'
import { View } from 'react-native'

import { cn } from '@/lib/utils'
import { Typography, TypographyContext } from '@/registry/native/typography'

function Card({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <TypographyContext value='text-card-foreground text-sm'>
      <View
        data-slot='card'
        className={cn(
          'group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 ring-1 ring-foreground/10',
          className
        )}
        {...props}
      />
    </TypographyContext>
  )
}

function CardHeader({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='card-header'
      className={cn(
        'group/card-header flex flex-col items-start gap-1 rounded-t-xl px-4',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Typography
      data-slot='card-title'
      className={cn(
        'text-base leading-none font-semibold text-card-foreground',
        className
      )}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Typography
      data-slot='card-description'
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardAction({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='card-action'
      className={cn('self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='card-content'
      className={cn('px-4', className)}
      {...props}
    />
  )
}

function CardFooter({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='card-footer'
      className={cn('flex items-center rounded-b-xl px-4', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
