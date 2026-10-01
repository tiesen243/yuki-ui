import type { VariantProps } from 'class-variance-authority'
import type { AccessibilityRole } from 'react-native'

import * as React from 'react'
import { Text } from 'react-native'

import { cn } from '@/lib/utils'
import { typographyVariants } from '@/registry/ui/typography'

const TypographyContext = React.createContext('')

type TypographyProps = VariantProps<typeof typographyVariants>

const ROLES = {
  h1: 'header',
  h2: 'header',
  h3: 'header',
  h4: 'header',
} as const satisfies Partial<
  Record<NonNullable<TypographyProps['variant']>, AccessibilityRole>
>

const LEVELS = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
} as const satisfies Partial<
  Record<NonNullable<TypographyProps['variant']>, number>
>

function Typography({
  className,
  variant = 'p',
  ...props
}: React.ComponentProps<typeof Text> &
  VariantProps<typeof typographyVariants>) {
  const classCtx = React.use(TypographyContext)

  return (
    <Text
      data-slot='typography'
      accessibilityRole={ROLES[variant as keyof typeof ROLES] ?? 'text'}
      aria-level={LEVELS[variant as keyof typeof LEVELS]}
      className={cn(
        'text-base font-normal text-foreground',
        typographyVariants({ variant }),
        classCtx,
        className
      )}
      {...props}
    />
  )
}

export { typographyVariants } from '@/registry/ui/typography'
export { TypographyContext, Typography }
