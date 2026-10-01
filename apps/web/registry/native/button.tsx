import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'
import { Pressable } from 'react-native'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Typography, TypographyContext } from '@/registry/native/typography'

const buttonTextVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      outline: 'text-foreground',
      secondary: 'text-secondary-foreground',
      ghost: 'text-foreground',
      success: 'text-success',
      destructive: 'text-destructive',
      info: 'text-info',
      warning: 'text-warning',
      link: 'text-primary underline-offset-4 group-active/button:underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof Pressable> &
  VariantProps<typeof buttonVariants>) {
  return (
    <TypographyContext value={cn(buttonTextVariants({ variant }))}>
      <Pressable
        data-slot='button'
        className={cn(
          buttonVariants({ variant, size, className }),
          'flex-row active:opacity-80'
        )}
        {...props}
      >
        {typeof children === 'string' ? (
          <Typography>{children}</Typography>
        ) : (
          children
        )}
      </Pressable>
    </TypographyContext>
  )
}

export { buttonVariants } from '@/components/ui/button'
export { Button }
