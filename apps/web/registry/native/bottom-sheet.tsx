// oxlint-disable react/refs

import * as React from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  PanResponder,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { cn } from '@/lib/utils'
import { Button } from '@/registry/native/button'
import { Typography, TypographyContext } from '@/registry/native/typography'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const DEFAULT_SNAP_POINTS = [0.33, 0.67, 1]
const DISMISS_DISTANCE = 240
const DISMISS_VELOCITY = 3.6

interface BottomSheetContextValue {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  sheetHeight: Animated.Value & { _value: number }
  snapPoints: number[]
}

const BottomSheetContext = React.createContext<BottomSheetContextValue | null>(
  null
)

const useBottomSheet = () => {
  const context = React.use(BottomSheetContext)
  if (!context)
    throw new Error('useBottomSheet must be used within a BottomSheetProvider')
  return context
}

interface BottomSheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  snapPoints?: number[]
  defaultSnapPoint?: number
  children: React.ReactNode
}

function BottomSheet({
  children,
  snapPoints = DEFAULT_SNAP_POINTS,
  defaultSnapPoint = 0,
  ...props
}: BottomSheetProps) {
  const [localIsOpen, setLocalIsOpen] = React.useState(props.open ?? false)
  const sheetHeight = React.useRef(new Animated.Value(0)).current

  const isControlled =
    props.open !== undefined && props.onOpenChange !== undefined
  const isOpen = isControlled ? props.open : localIsOpen
  const _setIsOpen = isControlled ? props.onOpenChange : setLocalIsOpen

  const [isVisible, setIsVisible] = React.useState(isOpen)

  const animatedOpen = React.useCallback(() => {
    setIsVisible(true)
    sheetHeight.setOffset(0)

    const targetPoint = snapPoints[defaultSnapPoint] ?? snapPoints[0] ?? 0.33

    Animated.timing(sheetHeight, {
      toValue: SCREEN_HEIGHT * targetPoint,
      duration: 300,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start()
  }, [sheetHeight, snapPoints, defaultSnapPoint])

  const animatedClose = React.useCallback(
    (onComplete?: () => void) =>
      Animated.timing(sheetHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start(() => {
        setIsVisible(false)
        onComplete?.()
      }),
    [sheetHeight]
  )

  React.useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    if (isOpen) animatedOpen()
    else animatedClose()
  }, [isOpen, animatedOpen, animatedClose])

  const setIsOpen = React.useCallback(
    (open: boolean | ((prev: boolean) => boolean)) => {
      const nextOpen = typeof open === 'function' ? open(isOpen ?? false) : open
      if (nextOpen === isOpen || !_setIsOpen) return

      if (nextOpen) _setIsOpen(true)
      else animatedClose(() => _setIsOpen(false))
    },
    [isOpen, _setIsOpen, animatedClose]
  )

  const memoizedValue = React.useMemo(
    () => ({ isOpen: isVisible, setIsOpen, sheetHeight, snapPoints }),
    [isVisible, setIsOpen, sheetHeight, snapPoints]
  ) as BottomSheetContextValue

  return (
    <BottomSheetContext data-slot='bottom-sheet' value={memoizedValue}>
      {children}
    </BottomSheetContext>
  )
}

function BottomSheetTrigger({
  onPress,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setIsOpen } = useBottomSheet()

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<typeof onPress>>[0]) => {
      setIsOpen(true)
      onPress?.(event)
    },
    [setIsOpen, onPress]
  )

  return (
    <Button data-slot='bottom-sheet-trigger' onPress={handlePress} {...props} />
  )
}

function BottomSheetClose({
  onPress,
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setIsOpen } = useBottomSheet()

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<typeof onPress>>[0]) => {
      setIsOpen(false)
      onPress?.(event)
    },
    [setIsOpen, onPress]
  )

  return (
    <Button
      data-slot='bottom-sheet-close'
      variant={variant}
      onPress={handlePress}
      {...props}
    />
  )
}

function BottomSheetContent({
  className,
  ...props
}: React.ComponentProps<typeof Animated.View>) {
  const { isOpen, setIsOpen, sheetHeight } = useBottomSheet()

  const borderRadius = sheetHeight.interpolate({
    inputRange: [SCREEN_HEIGHT * 0.9, SCREEN_HEIGHT],
    outputRange: [16, 0],
    extrapolate: 'clamp',
  })

  const border = sheetHeight.interpolate({
    inputRange: [SCREEN_HEIGHT * 0.9, SCREEN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  return (
    <Modal
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
      animationType='fade'
      transparent
    >
      <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
        <View className='absolute inset-0 flex-1 bg-black/30' />
      </TouchableWithoutFeedback>

      <TypographyContext value='text-sm text-popover-foreground'>
        <Animated.View
          data-slot='bottom-sheet-content'
          style={{
            height: sheetHeight,
            borderWidth: border,
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
          }}
          className={cn(
            'absolute bottom-0 flex min-h-0 w-full flex-col rounded-t-xl border-b-0 border-border bg-popover',
            className
          )}
          {...props}
        />
      </TypographyContext>
    </Modal>
  )
}

function BottomSheetHeader({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const { setIsOpen, sheetHeight, snapPoints } = useBottomSheet()

  const dragAnim = React.useRef(new Animated.Value(0)).current
  const startHeight = React.useRef(0)

  const animateIndicator = (dragging: boolean) =>
    Animated.timing(dragAnim, {
      toValue: dragging ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start()

  const scaleX = dragAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  })

  const opacity = dragAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.8],
  })

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 4,

      onPanResponderGrant: () => {
        animateIndicator(true)
        startHeight.current = sheetHeight._value
      },

      onPanResponderMove: (_, gestureState) => {
        const newHeight = Math.max(0, startHeight.current - gestureState.dy)
        sheetHeight.setValue(newHeight)
      },

      onPanResponderRelease: (_, gestureState) => {
        animateIndicator(false)

        const finalHeight =
          sheetHeight._value ?? startHeight.current - gestureState.dy
        const maxSnapHeight = SCREEN_HEIGHT * (snapPoints.at(-1) ?? 1)

        const isDraggedDownDeep = gestureState.dy > DISMISS_DISTANCE
        const isFlickedDownFast = gestureState.vy > DISMISS_VELOCITY
        if (isDraggedDownDeep || isFlickedDownFast) return setIsOpen(false)

        const projectedHeight = finalHeight - gestureState.vy * 30

        let [closestSnap = 0] = snapPoints
        let minDiff = Infinity

        for (const point of snapPoints) {
          const targetH = SCREEN_HEIGHT * point
          const diff = Math.abs(targetH - projectedHeight)
          if (diff < minDiff) {
            minDiff = diff
            closestSnap = point
          }
        }

        const targetHeight = Math.min(
          SCREEN_HEIGHT * closestSnap,
          maxSnapHeight
        )

        Animated.spring(sheetHeight, {
          toValue: targetHeight,
          velocity: -gestureState.vy,
          useNativeDriver: false,
          bounciness: 2,
        }).start()
      },

      onPanResponderTerminate: () => animateIndicator(false),
    })
  ).current

  return (
    <View
      data-slot='bottom-sheet-header'
      className={cn(
        'relative flex shrink-0 flex-col gap-0.5 px-4 pt-6 pb-0',
        className
      )}
      {...panResponder.panHandlers}
      {...props}
    >
      <Animated.View
        style={{ transform: [{ scaleX }], opacity }}
        className='absolute inset-0 top-2 left-1/2 h-1.5 w-12 translate-x-1/2 self-center rounded-full bg-muted-foreground'
      />

      {children}
    </View>
  )
}

function BottomSheetFooter({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='bottom-sheet-footer'
      className={cn('mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0', className)}
      {...props}
    />
  )
}

function BottomSheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot='bottom-sheet-title'
      className={cn('text-base font-medium text-foreground', className)}
      {...props}
    />
  )
}

function BottomSheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot='bottom-sheet-description'
      className={cn('text-sm text-balance text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
}
