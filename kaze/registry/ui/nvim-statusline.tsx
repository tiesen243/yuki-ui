'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@yuki/ui'

const MODES = [
  'normal',
  'visual',
  'replace',
  'insert',
  'terminal',
  'command',
] as const
type Mode = (typeof MODES)[number]

interface NvimStatuslineContextValue {
  mode: Mode
  modes: typeof MODES
  setMode: React.Dispatch<React.SetStateAction<Mode>>
}

const NvimStatuslineContext =
  React.createContext<NvimStatuslineContextValue | null>(null)

function useNvimStatusline() {
  const context = React.useContext(NvimStatuslineContext)
  if (context === null)
    throw new Error(
      'useNvimStatusline must be used within a NvimStatuslineProvider',
    )
  return context
}

function NvimStatuslineProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mode, setMode] = React.useState<Mode>('normal')
  const value = React.useMemo(() => ({ mode, modes: MODES, setMode }), [mode])

  return (
    <NvimStatuslineContext value={value}>
      <Slot data-mode={mode} className="group">
        {children}
      </Slot>
    </NvimStatuslineContext>
  )
}

function NvimStatusline({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'footer'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'footer'

  return (
    <Comp
      data-slot="nvim-statusline"
      className={cn(
        'bg-secondary text-secondary-foreground sticky bottom-0 left-0 z-50 flex h-6 w-full items-center justify-between gap-0 px-4 font-mono md:bottom-4',
        "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function NvimStatuslineSectionA({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="nvim-statusline-section-a"
      className={cn('inline-flex h-full shrink-0 items-center', className)}
      {...props}
    >
      <div className="group-data-[mode=terminal]:bg-terminal group-data-[mode=command]:bg-command group-data-[mode=normal]:bg-normal group-data-[mode=insert]:bg-insert group-data-[mode=replace]:bg-replace group-data-[mode=visual]:bg-visual text-background inline-flex h-full items-center gap-2 px-2">
        {children}
      </div>
      <NvimStatuslineSectionSeparator className="group-data-[mode=terminal]:fill-terminal group-data-[mode=command]:fill-command group-data-[mode=normal]:fill-normal group-data-[mode=insert]:fill-insert group-data-[mode=replace]:fill-replace group-data-[mode=visual]:fill-visual bg-background size-6 rotate-90" />
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
      data-slot="nvim-statusline-section-b"
      className={cn(
        'inline-flex h-full items-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div className="bg-background group-data-[mode=terminal]:text-terminal group-data-[mode=command]:text-command group-data-[mode=normal]:text-normal group-data-[mode=insert]:text-insert group-data-[mode=replace]:text-replace group-data-[mode=visual]:text-visual inline-flex h-full items-center gap-2 pr-2 whitespace-nowrap">
        {children}
      </div>
      <NvimStatuslineSectionSeparator className="fill-background bg-secondary size-6 rotate-90" />
    </div>
  )
}

function NvimStatuslineSectionC({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="nvim-statusline-section-c"
      className={cn(
        'bg-secondary text-secondary-foreground inline-flex h-full max-w-full flex-1 items-center gap-2 truncate overflow-hidden pr-2 text-ellipsis whitespace-nowrap',
        className,
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
      data-slot="nvim-statusline-section-x"
      className={cn(
        'bg-secondary text-secondary-foreground inline-flex h-full items-center gap-2 truncate overflow-hidden pl-2 text-ellipsis whitespace-nowrap',
        className,
      )}
      {...props}
    />
  )
}

function NvimStatuslineSectionY({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="nvim-statusline-section-y"
      className={cn(
        'inline-flex h-full items-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <NvimStatuslineSectionSeparator className="fill-background bg-secondary size-6 rotate-270" />
      <div className="bg-background group-data-[mode=terminal]:text-terminal group-data-[mode=command]:text-command group-data-[mode=normal]:text-normal group-data-[mode=insert]:text-insert group-data-[mode=replace]:text-replace group-data-[mode=visual]:text-visual inline-flex h-full items-center gap-2 pl-2 whitespace-nowrap">
        {props.children}
      </div>
    </div>
  )
}

function NvimStatuslineSectionZ({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="nvim-statusline-section-z"
      className={cn('inline-flex h-full shrink-0 items-center', className)}
      {...props}
    >
      <NvimStatuslineSectionSeparator className="group-data-[mode=terminal]:fill-terminal group-data-[mode=command]:fill-command group-data-[mode=normal]:fill-normal group-data-[mode=insert]:fill-insert group-data-[mode=replace]:fill-replace group-data-[mode=visual]:fill-visual bg-background size-6 rotate-270" />
      <div className="group-data-[mode=terminal]:bg-terminal group-data-[mode=command]:bg-command group-data-[mode=normal]:bg-normal group-data-[mode=insert]:bg-insert group-data-[mode=replace]:bg-replace group-data-[mode=visual]:bg-visual text-background inline-flex h-full items-center gap-2 px-2 whitespace-nowrap">
        {props.children}
      </div>
    </div>
  )
}

const NvimStatuslineSectionSeparator = (props: React.ComponentProps<'svg'>) => {
  return (
    <svg
      {...props}
      role="img"
      viewBox="0 0 24 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Nvim Statusline Section Separator</title>
      <path d="m12 3.4 12 10.784H0Z" />
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
