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
const BG_COLORS =
  'group-data-[mode=normal]/statusline:bg-normal group-data-[mode=visual]/statusline:bg-visual group-data-[mode=insert]/statusline:bg-insert group-data-[mode=replace]/statusline:bg-replace group-data-[mode=command]/statusline:bg-command group-data-[mode=terminal]/statusline:bg-terminal'
const TEXT_COLORS =
  'group-data-[mode=normal]/statusline:text-normal group-data-[mode=visual]/statusline:text-visual group-data-[mode=insert]/statusline:text-insert group-data-[mode=replace]/statusline:text-replace group-data-[mode=command]/statusline:text-command group-data-[mode=terminal]/statusline:text-terminal'
const FILL_COLORS =
  'group-data-[mode=normal]/statusline:fill-normal group-data-[mode=visual]/statusline:fill-visual group-data-[mode=insert]/statusline:fill-insert group-data-[mode=replace]/statusline:fill-replace group-data-[mode=command]/statusline:fill-command group-data-[mode=terminal]/statusline:fill-terminal'

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

  return <NvimStatuslineContext value={value}>{children}</NvimStatuslineContext>
}

function NvimStatusline({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'footer'> & { asChild?: boolean }) {
  const { mode } = useNvimStatusline()
  const Comp = asChild ? Slot : 'footer'

  return (
    <Comp
      data-slot="nvim-statusline"
      data-mode={mode}
      className={cn(
        'group/statusline bg-secondary text-secondary-foreground sticky bottom-0 left-0 z-50 flex h-6 w-full items-center justify-between gap-0 px-4 font-mono md:bottom-4',
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
      <div
        className={cn(
          'text-background inline-flex h-full items-center gap-2 px-2',
          BG_COLORS,
        )}
      >
        {children}
      </div>
      <NvimStatuslineSectionSeparator
        data-slot="nvim-statusline-section-a-separator"
        className={cn('bg-background size-6 rotate-90', FILL_COLORS)}
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
      data-slot="nvim-statusline-section-b"
      className={cn(
        'inline-flex h-full items-center overflow-hidden',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'bg-background inline-flex h-full items-center gap-2 pr-2 whitespace-nowrap',
          TEXT_COLORS,
        )}
      >
        {children}
      </div>
      <NvimStatuslineSectionSeparator
        data-slot="nvim-statusline-section-b-separator"
        className="fill-background bg-secondary size-6 rotate-90"
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
      <NvimStatuslineSectionSeparator
        data-slot="nvim-statusline-section-y-separator"
        className="fill-background bg-secondary size-6 rotate-270"
      />
      <div
        className={cn(
          'bg-background inline-flex h-full items-center gap-2 pl-2 whitespace-nowrap',
          TEXT_COLORS,
        )}
      >
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
      <NvimStatuslineSectionSeparator
        data-slot="nvim-statusline-section-z-separator"
        className={cn('bg-background size-6 rotate-270', FILL_COLORS)}
      />
      <div
        className={cn(
          'text-background inline-flex h-full items-center gap-2 px-2 whitespace-nowrap',
          BG_COLORS,
        )}
      >
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
