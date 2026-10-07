import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'
import { TouchableOpacity } from 'react-native'

import { badgeVariants } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TypographyContext } from '@/registry/native/typography'

const badgeTextVariants = cva('text-xs font-medium whitespace-nowrap', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      success: 'text-success',
      destructive: 'text-destructive',
      info: 'text-info',
      warning: 'text-warning',
      outline: 'text-foreground',
      ghost: 'text-foreground',
      link: 'text-primary underline-offset-4 active:underline',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Badge({
  className,
  variant = 'default',
  activeOpacity = 0.8,
  disabled,
  ...props
}: React.ComponentProps<typeof TouchableOpacity> &
  VariantProps<typeof badgeVariants>) {
  return (
    <TypographyContext value={cn(badgeTextVariants({ variant }))}>
      <TouchableOpacity
        data-slot='badge'
        accessibilityRole={props.onPress ? 'button' : 'text'}
        data-variant={variant}
        aria-disabled={disabled}
        disabled={disabled}
        activeOpacity={props.onPress ? activeOpacity : 1}
        className={cn(
          badgeVariants({ variant }),
          'h-6 flex-row rounded-md',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      />
    </TypographyContext>
  )
}

export { badgeVariants } from '@/components/ui/badge'
export { Badge }
