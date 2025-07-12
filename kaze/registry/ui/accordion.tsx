'use client'

import type { VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '@yuki/ui'
import { ChevronDownIcon } from '@yuki/ui/icons'

const AccordionContext = React.createContext<{
  currentValue: string[]
  setCurrentValue: React.Dispatch<React.SetStateAction<string[]>>
  multiple?: boolean
} | null>(null)

const useAccordion = () => {
  const context = React.use(AccordionContext)
  if (!context)
    throw new Error('useAccordion must be used within an AccordionProvider')
  return context
}

const accordionVariants = cva('px-4 pb-2', {
  variants: {
    variant: {
      default: '[&_[data-slot=accordion-item]]:border-b',
      shadow:
        'bg-card text-card-foreground rounded-xl shadow-md [&_[data-slot=accordion-item]]:not-last:border-b',
      border:
        'rounded-xl border shadow-md [&_[data-slot=accordion-item]]:not-last:border-b',
      split:
        '[&_[data-slot=accordion-item]]:bg-card space-y-4 px-0 [&_[data-slot=accordion-item]]:rounded-xl [&_[data-slot=accordion-item]]:px-4 [&_[data-slot=accordion-item]]:pt-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface AccordionProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof accordionVariants> {
  defaultValue?: string
  multiple?: boolean
}

function Accordion({
  variant,
  defaultValue,
  multiple,
  className,
  ...props
}: AccordionProps) {
  const [currentValue, setCurrentValue] = React.useState<string[]>(
    defaultValue ? [defaultValue] : [],
  )

  const contextValue = React.useMemo(
    () => ({ currentValue, setCurrentValue, multiple }),
    [currentValue, multiple],
  )

  return (
    <AccordionContext value={contextValue}>
      <div
        data-slot="accordion"
        className={cn(accordionVariants({ variant }), className)}
        {...props}
      />
    </AccordionContext>
  )
}

interface AccordionItemProps extends React.ComponentProps<'div'> {
  value: string
  title: string
  subtitle?: string
}

function AccordionItem({
  value,
  title,
  subtitle,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { currentValue, setCurrentValue, multiple } = useAccordion()
  const containerRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const isExpanded = currentValue.includes(value)

  return (
    <div
      data-slot="accordion-item"
      data-value={value}
      data-expanded={isExpanded}
      ref={containerRef}
      className={cn(
        'group/accordion-item h-(--height) overflow-hidden py-4 transition-[height] duration-200 ease-in-out',
        className,
      )}
      style={
        {
          '--height': isExpanded
            ? `${containerRef.current?.scrollHeight ?? 0}px`
            : `${(triggerRef.current?.scrollHeight ?? 0) + 24}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <button
        type="button"
        ref={triggerRef}
        data-slot="accordion-trigger"
        className="flex w-full items-start justify-between gap-2 text-start"
        onClick={() => {
          setCurrentValue((prev) => {
            if (prev.includes(value)) return prev.filter((v) => v !== value)
            else if (multiple) return [...prev, value]
            else return [value]
          })
        }}
      >
        <div>
          <p className="font-semibold">{title}</p>
          {subtitle && (
            <span className="text-muted-foreground text-sm">{subtitle}</span>
          )}
        </div>

        <ChevronDownIcon className="text-muted-foreground size-5 transition-[rotate] duration-200 ease-in-out group-data-[expanded=true]/accordion-item:rotate-180" />
      </button>

      <div data-slot="accordion-content" className="mt-6">
        {children}
      </div>
    </div>
  )
}

export { Accordion, AccordionItem }
