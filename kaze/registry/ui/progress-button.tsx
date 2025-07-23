import * as React from 'react'

import { cn } from '@yuki/ui'
import { Button } from '@yuki/ui/button'

interface ProgressButtonProps extends React.ComponentProps<typeof Button> {
  progress: number
  minProgress?: number
  maxProgress?: number
  isLoading?: boolean
}

function ProgressButton({
  progress,
  minProgress = 0,
  maxProgress = 100,
  isLoading = false,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ProgressButtonProps) {
  const { normalizedProgress, progressPercentage } = React.useMemo(() => {
    const normalizedProgress = Math.min(
      Math.max(progress, minProgress),
      maxProgress,
    )
    const progressPercentage =
      ((normalizedProgress - minProgress) / (maxProgress - minProgress)) * 100
    return { normalizedProgress, progressPercentage }
  }, [progress, minProgress, maxProgress])

  const style = React.useMemo(() => {
    if (props.variant === 'destructive')
      return {
        '--default': 'var(--destructive)',
        '--active': 'var(--default)',
        '--hover': 'color-mix(in oklab, var(--destructive) 90%, transparent)',
        background: `linear-gradient(to right, var(--active) ${progressPercentage}%, var(--secondary) ${progressPercentage}%)`,
      }
    else if (props.variant === 'secondary')
      return {
        '--default': 'var(--secondary)',
        '--hover': 'color-mix(in oklab, var(--secondary) 90%, transparent)',
        '--active': 'var(--default)',
        background: `linear-gradient(to right, var(--active) ${progressPercentage}%, var(--primary) ${progressPercentage}%)`,
      }
    else if (props.variant === 'outline')
      return {
        '--default': 'var(--background)',
        '--hover': 'var(--accent)',
        '--active': 'var(--default)',
        background: `linear-gradient(to right, var(--active) ${progressPercentage}%, var(--accent) ${progressPercentage}%)`,
      }
    else if (props.variant === 'ghost')
      return {
        '--default': 'transparent',
        '--hover': 'var(--accent)',
        '--active': ' var(--default)',
        background: `linear-gradient(to right, var(--active) ${progressPercentage}%, var(--accent) ${progressPercentage}%)`,
      }
    return {
      '--default': 'var(--primary)',
      '--hover': 'color-mix(in oklab, var(--primary) 90%, transparent)',
      '--active': 'var(--default)',
      background: `linear-gradient(to right, var(--active) ${progressPercentage}%, var(--secondary) ${progressPercentage}%)`,
    }
  }, [progressPercentage, props.variant])

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.setProperty('--active', 'var(--hover)')
      onMouseEnter?.(e)
    },
    [onMouseEnter],
  )

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.setProperty('--active', 'var(--default)')
      onMouseLeave?.(e)
    },
    [onMouseLeave],
  )

  return (
    <Button
      {...props}
      data-slot='loading-button'
      role='progressbar'
      disabled={isLoading}
      style={style}
      className={cn(
        'group/loading-button relative transition-colors',
        'disabled:text-transparent disabled:opacity-100',
        className,
      )}
      aria-busy={isLoading}
      aria-valuemin={minProgress}
      aria-valuemax={maxProgress}
      aria-valuenow={normalizedProgress}
      aria-label={
        isLoading ? `Progress: ${Math.round(progressPercentage)}%` : undefined
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span className='absolute inset-0 hidden items-center justify-center text-sm font-medium text-background mix-blend-difference group-disabled/loading-button:flex dark:text-foreground'>
        {Math.round(progressPercentage)}%
      </span>
    </Button>
  )
}

export { ProgressButton }
