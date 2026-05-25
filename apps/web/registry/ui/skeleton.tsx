import type { VariantProps } from 'class-variance-authority'

import { cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const skeletonVariants = cva(
  "relative block overflow-hidden rounded-sm before:inline-block before:content-['\\a0']",
  {
    variants: {
      variant: {
        text: 'h-auto w-full',
        circular: 'aspect-square rounded-full',
        rectangular: '',
      },
      animation: {
        pulse: 'animate-pulse bg-current',
        shimmer:
          'animate-[shimmer_2s_cubic-bezier(0.4,0,0.6,1)_infinite] bg-[linear-gradient(110deg,var(--color-secondary),35%,var(--color-border),50%,var(--color-secondary))] bg-size-[200%_100%] dark:bg-[linear-gradient(110deg,var(--color-secondary),35%,var(--color-input),50%,var(--color-secondary))]',
        solid: 'bg-muted',
      },
    },
  }
)

interface SkeletonProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({
  variant = 'rectangular',
  animation = 'shimmer',
  className,
  ...props
}: SkeletonProps) {
  const Comp = {
    text: 'span',
    circular: 'div',
    rectangular: 'div',
  }[variant ?? 'rectangular'] as React.ElementType

  return (
    <Comp
      data-slot='skeleton'
      className={cn(skeletonVariants({ variant, animation }), className)}
      {...props}
    />
  )
}

export { Skeleton }
