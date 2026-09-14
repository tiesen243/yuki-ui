'use client'

import type { ToastManagerAddOptions } from '@base-ui/react/toast'

import { Toast as ToastPrimitive } from '@base-ui/react/toast'
import { cn } from 'cn'
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  Loader2Icon,
} from 'lucide-react'
import * as React from 'react'

const toastManager = ToastPrimitive.createToastManager()

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

const ICONS = {
  loading: Loader2Icon,
  success: CheckCircleIcon,
  error: AlertCircleIcon,
  info: InfoIcon,
  warning: AlertTriangleIcon,
} as const

function ToastList({
  position = 'bottom-right',
}: Readonly<{ position?: ToastPosition }>) {
  const { toasts } = ToastPrimitive.useToastManager()

  const swipeDirection = React.useMemo(() => {
    const directions: ('up' | 'down' | 'left' | 'right')[] = []
    if (!position) return directions
    if (position.includes('top')) directions.push('up')
    if (position.includes('bottom')) directions.push('down')
    if (position.includes('left')) directions.push('left')
    if (position.includes('right')) directions.push('right')
    return directions
  }, [position])

  return toasts.map((toast) => {
    const Icon = toast.type
      ? ICONS[toast.type as keyof typeof ICONS]
      : undefined

    return (
      <ToastPrimitive.Root
        key={toast.id}
        toast={toast}
        data-slot='toast'
        data-position={position}
        data-type={toast.type ?? 'default'}
        swipeDirection={swipeDirection}
        className={cn(
          'group/toast z-[calc(1000-var(--toast-index))] [--gap:0.5rem] [--height:var(--toast-frontmost-height,var(--toast-height))] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))] [--peek:0.75rem] [--scale:calc(max(0,1-(var(--toast-index)*0.1)))] [--shrink:calc(1-var(--scale))]',
          'absolute h-(--height) w-full rounded-md border bg-popover text-popover-foreground shadow-sm select-none [transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s] data-expanded:h-(--toast-height)',
          "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-[''] data-ending-style:opacity-0 data-limited:opacity-0",

          /* Global Base Transforms theo Top vs Bottom */
          'data-[position^=top]:transform-[translateX(calc(var(--toast-swipe-movement-x)+var(--x-offset,0px)))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',
          'data-[position^=bottom]:transform-[translateX(calc(var(--toast-swipe-movement-x)+var(--x-offset,0px)))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]',

          'data-[position^=top]:top-0 data-[position^=top]:bottom-auto data-[position^=top]:origin-top',
          'data-[position^=bottom]:top-auto data-[position^=bottom]:bottom-0 data-[position^=bottom]:origin-bottom',
          'data-[position*=right]:right-0 data-[position*=right]:left-auto data-[position*=right]:mr-0',
          'data-[position*=left]:right-auto data-[position*=left]:left-0 data-[position*=left]:ml-0',

          /* Global Expanded Styles */
          'data-[position^=top]:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)*-1))]',
          'data-[position^=bottom]:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--offset-y)))]',

          /* Global Ending/Starting Styles */
          'data-[position^=top]:data-starting-style:transform-[translateY(-150%)]',
          'data-[position^=top]:[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(-150%)]',
          'data-[position^=bottom]:data-starting-style:transform-[translateY(150%)]',
          'data-[position^=bottom]:[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:transform-[translateY(150%)]',

          /* Global Swipe / Ending Directions */
          'data-[position^=top]:data-ending-style:transform-[translateY(calc(var(--toast-swipe-movement-y)-150%))]',
          'data-[position^=bottom]:data-ending-style:transform-[translateY(calc(var(--toast-swipe-movement-y)+150%))]',
          'data-[position*=left]:data-ending-style:transform-[translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]',
          'data-[position*=right]:data-ending-style:transform-[translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]',

          /* Variants */
          'data-[type=success]:border-green-600 data-[type=success]:bg-[color-mix(in_oklab,var(--color-green-600)_10%,var(--color-popover))] data-[type=success]:text-green-600 dark:data-[type=success]:border-green-400 dark:data-[type=success]:bg-[color-mix(in_oklab,var(--color-green-400)_10%,var(--color-popover))] dark:data-[type=success]:text-green-400',
          'data-[type=error]:border-red-600 data-[type=error]:bg-[color-mix(in_oklab,var(--color-red-600)_10%,var(--color-popover))] data-[type=error]:text-red-600 dark:data-[type=error]:border-red-400 dark:data-[type=error]:bg-[color-mix(in_oklab,var(--color-red-400)_10%,var(--color-popover))] dark:data-[type=error]:text-red-400',
          'data-[type=info]:border-blue-600 data-[type=info]:bg-[color-mix(in_oklab,var(--color-blue-600)_10%,var(--color-popover))] data-[type=info]:text-blue-600 dark:data-[type=info]:border-blue-400 dark:data-[type=info]:bg-[color-mix(in_oklab,var(--color-blue-400)_10%,var(--color-popover))] dark:data-[type=info]:text-blue-400',
          'data-[type=warning]:border-yellow-600 data-[type=warning]:bg-[color-mix(in_oklab,var(--color-yellow-600)_10%,var(--color-popover))] data-[type=warning]:text-yellow-600 dark:data-[type=warning]:border-yellow-400 dark:data-[type=warning]:bg-[color-mix(in_oklab,var(--color-yellow-400)_10%,var(--color-popover))] dark:data-[type=warning]:text-yellow-400'
        )}
      >
        <ToastPrimitive.Content
          data-slot='toast-content'
          className='flex flex-row items-center gap-2 overflow-hidden p-3'
        >
          {Icon && (
            <Icon
              className='size-4 shrink-0 text-current group-data-[type=loading]/toast:animate-spin'
              aria-hidden='true'
            />
          )}

          <div className='flex flex-1 flex-col gap-1 overflow-hidden'>
            <ToastPrimitive.Title
              data-slot='toast-title'
              className='text-sm leading-snug font-medium'
            />

            <ToastPrimitive.Description
              data-slot='toast-description'
              className='text-xs text-current/80'
            />
          </div>

          <ToastPrimitive.Action
            data-slot='toast-action'
            className='inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-md bg-current/10 bg-clip-padding px-2 text-xs font-medium whitespace-nowrap outline-none select-none hover:bg-current/20'
          />
        </ToastPrimitive.Content>
      </ToastPrimitive.Root>
    )
  })
}

function ToastProvider({
  position = 'bottom-right',
  timeout = 5000,
  limit = 3,
  children,
}: Omit<
  React.ComponentProps<typeof ToastPrimitive.Provider>,
  'toastManager'
> & { position?: ToastPosition }) {
  return (
    <ToastPrimitive.Provider
      toastManager={toastManager}
      timeout={timeout}
      limit={limit}
    >
      {children}

      <ToastPrimitive.Portal data-slot='toast-portal'>
        <ToastPrimitive.Viewport
          data-slot='toast-viewport'
          data-position={position}
          className={cn(
            'fixed z-9999 mx-auto w-[calc(100vw-var(--toast-inset)*2)] [--toast-inset:--spacing(4)] sm:w-90',
            'data-[position^=top]:top-(--toast-inset) data-[position^=top]:bottom-auto',
            'data-[position^=bottom]:top-auto data-[position^=bottom]:bottom-(--toast-inset)',
            'data-[position*=left]:left-(--toast-inset)',
            'data-[position*=right]:right-(--toast-inset)'
          )}
        >
          <ToastList position={position} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  )
}

const useToast = ToastPrimitive.useToastManager

const toast = {
  ...toastManager,
  show: (
    title: React.ReactNode,
    options?: Omit<ToastManagerAddOptions<object>, 'title'>
  ) => toastManager.add({ type: 'default', title, ...options }),
  success: (
    title: React.ReactNode,
    options?: Omit<ToastManagerAddOptions<object>, 'title'>
  ) => toastManager.add({ type: 'success', title, ...options }),
  error: (
    title: React.ReactNode,
    options?: Omit<ToastManagerAddOptions<object>, 'title'>
  ) => toastManager.add({ type: 'error', title, ...options }),
  info: (
    title: React.ReactNode,
    options?: Omit<ToastManagerAddOptions<object>, 'title'>
  ) => toastManager.add({ type: 'info', title, ...options }),
  warning: (
    title: React.ReactNode,
    options?: Omit<ToastManagerAddOptions<object>, 'title'>
  ) => toastManager.add({ type: 'warning', title, ...options }),
}

export { ToastProvider, toast, useToast }
