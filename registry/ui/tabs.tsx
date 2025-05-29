'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva } from 'class-variance-authority'

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
        default: 'bg-muted text-muted-foreground',
        underline: 'text-muted-foreground bg-transparent',
        border: 'border',
        light: '',
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

const tabsTriggerVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=active]:text-foreground focus-visible:outline-ring text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'data-[state=active]:bg-background dark:data-[state=active]:bg-input/30 dark:data-[state=active]:border-input rounded-md border data-[state=active]:shadow-sm',
        underline:
          'data-[state=active]:border-primary data-[state=active]:border-b',
        border:
          'dark:data-[state=active]:bg-muted border-border rounded-md data-[state=active]:border dark:border-transparent',
        light:
          'dark:data-[state=active]:bg-muted border-border rounded-md data-[state=active]:border dark:border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface TabsTriggerProps
  extends React.ComponentProps<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

function TabsTrigger({ className, variant, ...props }: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant }), className)}
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
