import type { LucidePropsWithClassName } from 'lucide-uniwind'
import type { LayoutChangeEvent } from 'react-native'

import {
  CheckCircleIcon,
  CircleAlertIcon,
  InfoIcon,
  TriangleAlertIcon,
} from 'lucide-uniwind'
import * as React from 'react'
import { Animated, Easing, PanResponder, Text, View } from 'react-native'

import { cn } from '@/lib/utils'

type ToastType = 'default' | 'success' | 'info' | 'error' | 'warning'

interface ToastOptions {
  icon?: (props: LucidePropsWithClassName) => React.ReactNode
  duration?: number
}

interface ToastItem {
  id: string
  type: ToastType
  title: string
  description?: string
  options?: ToastOptions
}

type ToastListener = (toast: ToastItem) => void
const listeners = new Set<ToastListener>()

const emitToast = (toast: Omit<ToastItem, 'id'>) => {
  const item: ToastItem = {
    ...toast,
    id: Math.random().toString(36).slice(2, 9),
  }

  for (const listener of listeners) listener(item)
}

const toast = {
  show: (title: string, description?: string, options?: ToastOptions) =>
    emitToast({ type: 'default', title, description, options }),
  success: (title: string, description?: string, options?: ToastOptions) =>
    emitToast({ type: 'success', title, description, options }),
  error: (title: string, description?: string, options?: ToastOptions) =>
    emitToast({ type: 'error', title, description, options }),
  info: (title: string, description?: string, options?: ToastOptions) =>
    emitToast({ type: 'info', title, description, options }),
  warning: (title: string, description?: string, options?: ToastOptions) =>
    emitToast({ type: 'warning', title, description, options }),
}

interface ToasterContextValue {
  toast: typeof toast
  dismiss: (id: string) => void
}

const ToasterContext = React.createContext<ToasterContextValue | null>(null)

const useToast = () => {
  const ctx = React.use(ToasterContext)
  if (!ctx) throw new Error('useToast must be used within a ToasterProvider')
  return ctx
}

const toastVariants = {
  default: {
    icon: null,
    root: 'bg-popover border-border',
    title: 'text-popover-foreground',
    description: 'text-popover-foreground/80',
  },
  success: {
    icon: CheckCircleIcon,
    root: 'bg-[color-mix(in_oklab,var(--success)_10%,var(--popover))] border-success/30',
    title: 'text-success',
    description: 'text-success/80',
  },
  error: {
    icon: CircleAlertIcon,
    root: 'bg-[color-mix(in_oklab,var(--destructive)_10%,var(--popover))] border-destructive/30',
    title: 'text-destructive',
    description: 'text-destructive/80',
  },
  info: {
    icon: InfoIcon,
    root: 'bg-[color-mix(in_oklab,var(--info)_10%,var(--popover))] border-info/30',
    title: 'text-info',
    description: 'text-info/80',
  },
  warning: {
    icon: TriangleAlertIcon,
    root: 'bg-[color-mix(in_oklab,var(--warning)_10%,var(--popover))] border-warning/30',
    title: 'text-warning',
    description: 'text-warning/80',
  },
}

function ToastCard({
  item,
  position,
  onDismiss,
}: Readonly<{
  item: ToastItem
  position: 'top' | 'bottom'
  onDismiss: (id: string) => void
}>) {
  const initialTranslateY = position === 'top' ? -50 : 50
  const exitTranslateY = position === 'top' ? -20 : 20

  const translateY = React.useMemo(
    () => new Animated.Value(initialTranslateY),
    [initialTranslateY]
  )
  const translateX = React.useMemo(() => new Animated.Value(0), [])
  const opacity = React.useMemo(() => new Animated.Value(0), [])

  const toastWidthRef = React.useRef<number>(0)

  const variant = toastVariants[item.type] ?? toastVariants.default
  const Icon = item.options?.icon ?? variant.icon

  const dismiss = React.useCallback(
    (direction: 'up/down' | 'left' | 'right' = 'up/down') => {
      let toValueX = 0
      let toValueY = 0

      if (direction === 'left') toValueX = -400
      else if (direction === 'right') toValueX = 400
      else toValueY = exitTranslateY

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: toValueX,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: toValueY,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => onDismiss(item.id))
    },
    [exitTranslateY, item.id, onDismiss, opacity, translateX, translateY]
  )

  const panResponder = React.useMemo(
    () =>
      // oxlint-disable-next-line react/refs
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 5,
        onPanResponderMove: (_, gestureState) =>
          translateX.setValue(gestureState.dx),
        onPanResponderRelease: (_, gestureState) => {
          const width = toastWidthRef.current
          const threshold = width ? width * 0.4 : 120

          if (gestureState.dx > threshold) dismiss('right')
          else if (gestureState.dx < -threshold) dismiss('left')
          else
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
              bounciness: 8,
            }).start()
        },
      }),
    [dismiss, translateX]
  )

  const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
    toastWidthRef.current = event.nativeEvent.layout.width
  }, [])

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start()

    const timer = setTimeout(() => dismiss(), item.options?.duration ?? 3000)

    return () => clearTimeout(timer)
  }, [dismiss, item.options?.duration, opacity, translateY])

  const Content = (
    <>
      <Text className={cn('text-base font-medium', variant.title)}>
        {item.title}
      </Text>

      {!!item.description && (
        <Text className={cn('text-sm font-medium', variant.description)}>
          {item.description}
        </Text>
      )}
    </>
  )

  return (
    <Animated.View
      onLayout={handleLayout}
      {...panResponder.panHandlers}
      style={{ transform: [{ translateY }, { translateX }], opacity }}
      className={cn(
        'my-1.5 rounded-xl border p-3 shadow-md',
        Icon ? 'flex-row gap-2' : 'flex-col gap-1',
        variant.root
      )}
    >
      {Icon && <Icon className={cn('mt-1 size-4', variant.title)} />}
      {Icon ? <View className='flex-col gap-1'>{Content}</View> : Content}
    </Animated.View>
  )
}

interface ToasterProviderProps {
  children: React.ReactNode
  position?: 'top' | 'bottom'
}

function ToasterProvider({ children, position = 'top' }: ToasterProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  React.useEffect(() => {
    const handleNewToast = (newToast: ToastItem) => {
      setToasts((prev) => [newToast, ...prev])
    }

    listeners.add(handleNewToast)
    return () => {
      listeners.delete(handleNewToast)
    }
  }, [])

  const contextValue = React.useMemo(() => ({ toast, dismiss }), [dismiss])

  return (
    <ToasterContext value={contextValue}>
      {children}

      <View
        pointerEvents='box-none'
        className={cn(
          'absolute right-4 left-4 z-9999',
          position === 'top' ? 'top-4' : 'bottom-4'
        )}
      >
        {toasts.map((item) => (
          <ToastCard
            key={item.id}
            item={item}
            onDismiss={dismiss}
            position={position}
          />
        ))}
      </View>
    </ToasterContext>
  )
}

export { ToasterProvider, useToast, toast }
