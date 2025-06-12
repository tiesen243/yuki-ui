'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'
import { Tabs as TabsPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  'inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
  {
    variants: {
      variant: {
        default:
          'bg-muted *:data-[slot=tabs-trigger]:data-[state=active]:bg-background *:data-[slot=tabs-trigger]:dark:data-[state=active]:bg-input/30 *:data-[slot=tabs-trigger]:dark:data-[state=active]:border-input *:data-[slot=tabs-trigger]:rounded-md *:data-[slot=tabs-trigger]:border *:data-[slot=tabs-trigger]:data-[state=active]:shadow-sm',
        underline:
          '*:data-[slot=tabs-trigger]:data-[state=active]:border-primary *:data-[slot=tabs-trigger]:border-b',
        border:
          '*:data-[slot=tabs-trigger]:dark:data-[state=active]:bg-muted *:data-[slot=tabs-trigger]:border-border *:data-[slot=tabs-trigger]:data-[state=active]:bg-background border *:data-[slot=tabs-trigger]:rounded-md *:data-[slot=tabs-trigger]:data-[state=active]:border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface TabsListProps
  extends React.ComponentProps<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

function TabsList({ className, variant, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=active]:text-foreground focus-visible:outline-ring text-foreground dark:text-muted-foreground dark:data-[state=inactive]:hover:text-muted-foreground/60 data-[state=inactive]:hover:text-foreground/60 inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
