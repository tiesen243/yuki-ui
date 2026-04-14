'use client'

import { mergeProps } from '@base-ui/react'
import { useRender } from '@base-ui/react/use-render'
import * as React from 'react'

import { cn } from '@/lib/utils'

const MODES = [
  'normal',
  'visual',
  'replace',
  'insert',
  'terminal',
  'command',
] as const
type Mode = (typeof MODES)[number]
const BG_COLORS =
  'group-data-[mode=normal]/statusline:bg-normal group-data-[mode=visual]/statusline:bg-visual group-data-[mode=insert]/statusline:bg-insert group-data-[mode=replace]/statusline:bg-replace group-data-[mode=command]/statusline:bg-command group-data-[mode=terminal]/statusline:bg-terminal'
const TEXT_COLORS =
  'group-data-[mode=normal]/statusline:text-normal group-data-[mode=visual]/statusline:text-visual group-data-[mode=insert]/statusline:text-insert group-data-[mode=replace]/statusline:text-replace group-data-[mode=command]/statusline:text-command group-data-[mode=terminal]/statusline:text-terminal'
const FILL_COLORS =
  'group-data-[mode=normal]/statusline:fill-normal group-data-[mode=visual]/statusline:fill-visual group-data-[mode=insert]/statusline:fill-insert group-data-[mode=replace]/statusline:fill-replace group-data-[mode=command]/statusline:fill-command group-data-[mode=terminal]/statusline:fill-terminal'

interface NvimStatuslineContextValue {
  mode: Mode
  modes: typeof MODES
  setMode: (value: React.SetStateAction<Mode>) => void
}

const NvimStatuslineContext =
  React.createContext<NvimStatuslineContextValue | null>(null)

function useNvimStatusline() {
  const context = React.use(NvimStatuslineContext)
  if (context === null)
    throw new Error(
      'useNvimStatusline must be used within a NvimStatuslineProvider'
    )
  return context
}

function NvimStatuslineProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [mode, setMode] = React.useState<Mode>('normal')
  const value = React.useMemo(() => ({ mode, modes: MODES, setMode }), [mode])
  return <NvimStatuslineContext value={value}>{children}</NvimStatuslineContext>
}

function NvimStatusline({
  className,
  render,
  ...props
}: useRender.ComponentProps<'footer'>) {
  const { mode } = useNvimStatusline()

  return useRender({
    defaultTagName: 'footer',
    props: mergeProps<'footer'>(
      {
        className: cn(
          'group/statusline sticky bottom-0 left-0 z-50 flex h-6 w-full items-center justify-between gap-0 bg-border px-4 font-mono transition-colors md:bottom-4',
          "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          className
        ),
      },
      props
    ),
    render,
    state: {
      slot: 'nvim-statusline',
      mode,
    },
  })
}

function NvimStatuslineSectionA({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='nvim-statusline-section-a'
      className={cn('inline-flex h-6 items-center', className)}
      {...props}
    >
      <div
        className={cn(
          'inline-flex h-6 items-center gap-2 pr-1 pl-2 font-medium text-background',
          BG_COLORS
        )}
      >
        {children}
      </div>
      <NvimStatuslineSectionSeparator
        data-slot='nvim-statusline-section-separator-1'
        className={cn('size-6 rotate-90 bg-background', FILL_COLORS)}
      />
    </div>
  )
}

function NvimStatuslineSectionB({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='nvim-statusline-section-b'
      className={cn('inline-flex h-6 items-center', className)}
      {...props}
    >
      <div
        className={cn(
          'inline-flex h-full items-center gap-2 bg-background pr-1 whitespace-nowrap',
          TEXT_COLORS
        )}
      >
        {children}
      </div>
      <NvimStatuslineSectionSeparator
        data-slot='nvim-statusline-section-separator-2'
        className='size-6 rotate-90 bg-border fill-background'
      />
    </div>
  )
}

function NvimStatuslineSectionC({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='nvim-statusline-section-c'
      className={cn(
        'inline-flex h-full max-w-full flex-1 items-center gap-2 truncate overflow-hidden text-ellipsis whitespace-nowrap',
        className
      )}
      {...props}
    />
  )
}

function NvimStatuslineSectionX({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='nvim-statusline-section-x'
      className={cn(
        'inline-flex h-full items-center gap-2 truncate overflow-hidden text-ellipsis whitespace-nowrap',
        className
      )}
      {...props}
    />
  )
}

function NvimStatuslineSectionY({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='nvim-statusline-section-y'
      className={cn('inline-flex h-full items-center', className)}
      {...props}
    >
      <NvimStatuslineSectionSeparator
        data-slot='nvim-statusline-section-separator-2'
        className='size-6 -rotate-90 bg-border fill-background'
      />
      <div
        className={cn(
          'inline-flex h-full items-center gap-2 bg-background pl-1 whitespace-nowrap',
          TEXT_COLORS
        )}
      >
        {children}
      </div>
    </div>
  )
}

function NvimStatuslineSectionZ({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='nvim-statusline-section-z'
      className={cn('inline-flex h-full items-center', className)}
      {...props}
    >
      <NvimStatuslineSectionSeparator
        data-slot='nvim-statusline-section-separator-1'
        className={cn('size-6 -rotate-90 bg-background', FILL_COLORS)}
      />
      <div
        className={cn(
          'inline-flex h-full items-center gap-2 pr-2 pl-1 font-medium whitespace-nowrap text-background',
          BG_COLORS
        )}
      >
        {children}
      </div>
    </div>
  )
}

function NvimStatuslineSectionSeparator({
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      role='img'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
    >
      <title>Nvim Statusline Section Separator</title>
      <path d='m12 11.25 12 12.784H0Z' />
    </svg>
  )
}

export {
  NvimStatusline,
  NvimStatuslineSectionA,
  NvimStatuslineSectionB,
  NvimStatuslineSectionC,
  NvimStatuslineSectionX,
  NvimStatuslineSectionY,
  NvimStatuslineSectionZ,
  NvimStatuslineSectionSeparator,
  useNvimStatusline,
  NvimStatuslineProvider,
}
