import type { GestureResponderEvent, LayoutChangeEvent } from 'react-native'

import * as React from 'react'
import {
  View,
  Animated,
  Dimensions,
  Easing,
  Modal,
  TouchableWithoutFeedback,
  PanResponder,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native'

import { cn } from '@/lib/utils'
import { Button } from '@/registry/native/button'
import { Typography, TypographyContext } from '@/registry/native/typography'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const DEFAULT_MAX_MIN_HEIGHT = SCREEN_HEIGHT / 3
const MAX_SHEET_HEIGHT = SCREEN_HEIGHT * 0.75

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  translateY: Animated.Value
  sheetHeight: Animated.Value
  minSheetHeight: React.RefObject<number>
  onContentLayout: (event: LayoutChangeEvent) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

const useDialogContext = () => {
  const context = React.use(DialogContext)
  if (!context)
    throw new Error('useDialogContext must be used within a DialogProvider')
  return context
}

function Dialog({
  children,
  open: openProp,
  onOpenChange,
}: Readonly<{
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

  const isControlled = openProp !== undefined
  const isOpen = isControlled ? openProp : uncontrolledOpen

  const [mounted, setMounted] = React.useState(isOpen)

  const minSheetHeight = React.useRef(DEFAULT_MAX_MIN_HEIGHT)
  const isMeasured = React.useRef(false)

  // oxlint-disable-next-line react/refs
  const translateY = React.useRef(new Animated.Value(SCREEN_HEIGHT)).current
  // oxlint-disable-next-line react/refs
  const sheetHeight = React.useRef(
    new Animated.Value(DEFAULT_MAX_MIN_HEIGHT)
  ).current

  const onContentLayout = React.useCallback(
    (event: LayoutChangeEvent) => {
      if (isMeasured.current) return

      const { height } = event.nativeEvent.layout
      if (height > 0) {
        const calculatedMin = Math.min(height, DEFAULT_MAX_MIN_HEIGHT)
        minSheetHeight.current = calculatedMin
        sheetHeight.setValue(calculatedMin)
        isMeasured.current = true
      }
    },
    [sheetHeight]
  )

  React.useEffect(() => {
    if (isOpen) {
      // oxlint-disable-next-line react/set-state-in-effect
      setMounted(true)
      isMeasured.current = false
      translateY.setValue(SCREEN_HEIGHT)

      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start()
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.ease),
      }).start(() => setMounted(false))
    }
  }, [isOpen, translateY])

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setUncontrolledOpen(nextOpen)
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const memoizedValue = React.useMemo(
    () => ({
      open: mounted,
      setOpen,
      translateY,
      sheetHeight,
      minSheetHeight,
      onContentLayout,
    }),
    [mounted, setOpen, translateY, sheetHeight, onContentLayout]
  )

  return (
    // oxlint-disable-next-line react/refs
    <DialogContext data-slot='dialog' value={memoizedValue}>
      {children}
    </DialogContext>
  )
}

function DialogTrigger({
  onPress,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setOpen } = useDialogContext()

  const handlePress = React.useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event)
      setOpen(true)
    },
    [setOpen, onPress]
  )

  return <Button data-slot='dialog-trigger' onPress={handlePress} {...props} />
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Modal>) {
  const {
    open,
    setOpen,
    translateY,
    sheetHeight,
    minSheetHeight,
    onContentLayout,
  } = useDialogContext()
  const previousHeight = React.useRef(DEFAULT_MAX_MIN_HEIGHT)

  React.useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    const showSub = Keyboard.addListener(showEvent, (e) => {
      previousHeight.current =
        (sheetHeight as { _value?: number })._value || minSheetHeight.current

      const keyboardHeight = e.endCoordinates.height
      const availableSpace = SCREEN_HEIGHT - keyboardHeight - 20

      if (previousHeight.current > availableSpace)
        Animated.timing(sheetHeight, {
          toValue: availableSpace,
          duration: 250,
          useNativeDriver: false,
        }).start()
    })

    const hideSub = Keyboard.addListener(hideEvent, () =>
      Animated.spring(sheetHeight, {
        toValue: previousHeight.current,
        bounciness: 4,
        useNativeDriver: false,
      }).start()
    )

    return () => {
      showSub.remove()
      hideSub.remove()
    }
  }, [sheetHeight, minSheetHeight])

  return (
    <Modal
      data-slot='select-content'
      animationType='fade'
      visible={open}
      onRequestClose={() => setOpen(false)}
      transparent
      {...props}
    >
      <TouchableWithoutFeedback onPress={() => setOpen(false)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className='inset-0 z-50 flex-1 justify-end bg-black/10'
        >
          <TouchableWithoutFeedback>
            <Animated.View
              onLayout={onContentLayout}
              style={{
                height: sheetHeight,
                maxHeight: MAX_SHEET_HEIGHT,
                transform: [{ translateY }],
              }}
              className={cn(
                'w-full gap-4 rounded-t-xl bg-popover p-4 pt-0 ring-1 ring-foreground/20',
                className
              )}
            >
              <TypographyContext value='text-sm text-popover-foreground'>
                {children}
              </TypographyContext>
            </Animated.View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

function DialogClose({
  onPress,
  variant = 'outline',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setOpen } = useDialogContext()

  const handlePress = React.useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event)
      setOpen(false)
    },
    [setOpen, onPress]
  )

  return (
    <Button
      data-slot='dialog-close'
      variant={variant}
      onPress={handlePress}
      {...props}
    />
  )
}

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  const { setOpen, translateY, sheetHeight, minSheetHeight } =
    useDialogContext()
  const startHeight = React.useRef(DEFAULT_MAX_MIN_HEIGHT)
  const isExpanded = React.useRef(false)

  // oxlint-disable-next-line react/refs
  const dragAnim = React.useRef(new Animated.Value(0)).current

  const animateIndicator = (dragging: boolean) => {
    Animated.timing(dragAnim, {
      toValue: dragging ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  // oxlint-disable-next-line react/refs
  const scaleX = dragAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  })

  // oxlint-disable-next-line react/refs
  const opacity = dragAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  })

  const panResponder = React.useRef(
    // oxlint-disable-next-line react/refs
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        animateIndicator(true)
        startHeight.current =
          (sheetHeight as { _value?: number })._value || minSheetHeight.current
        isExpanded.current = startHeight.current >= MAX_SHEET_HEIGHT - 10
      },

      onPanResponderMove: (_, gestureState) => {
        const { dy } = gestureState
        const minH = minSheetHeight.current

        if (!isExpanded.current) {
          if (dy < 0) {
            translateY.setValue(0)
            const newHeight = Math.min(MAX_SHEET_HEIGHT, minH - dy)
            return sheetHeight.setValue(newHeight)
          }

          return translateY.setValue(dy)
        }

        translateY.setValue(0)

        if (dy < 0) {
          const overdrag = Math.abs(dy) / 3
          return sheetHeight.setValue(MAX_SHEET_HEIGHT + overdrag)
        }

        const newHeight = Math.max(minH, MAX_SHEET_HEIGHT - dy)
        sheetHeight.setValue(newHeight)
      },

      onPanResponderRelease: (_, gestureState) => {
        animateIndicator(false)
        const { dy, vy } = gestureState
        const minH = minSheetHeight.current
        const expandDistance = MAX_SHEET_HEIGHT - minH

        if (!isExpanded.current) {
          if (dy >= 0) {
            if (dy > 80 || vy > 0.5) return setOpen(false)

            return Animated.spring(translateY, {
              toValue: 0,
              bounciness: 4,
              useNativeDriver: false,
            }).start()
          }

          const isOver50Percent = Math.abs(dy) > expandDistance * 0.5
          const isFlickUp = vy < -0.5
          const targetHeight =
            isOver50Percent || isFlickUp ? MAX_SHEET_HEIGHT : minH

          return Animated.spring(sheetHeight, {
            toValue: targetHeight,
            bounciness: 4,
            useNativeDriver: false,
          }).start()
        }

        if (dy < 0)
          return Animated.spring(sheetHeight, {
            toValue: MAX_SHEET_HEIGHT,
            bounciness: 6,
            useNativeDriver: false,
          }).start()

        const isOver30Percent = dy > expandDistance * 0.3
        const isFlickDown = vy > 0.3
        const targetHeight =
          isOver30Percent || isFlickDown ? minH : MAX_SHEET_HEIGHT

        Animated.spring(sheetHeight, {
          toValue: targetHeight,
          bounciness: 4,
          useNativeDriver: false,
        }).start()
      },
      onPanResponderTerminate: () => animateIndicator(false),
    })
  ).current

  return (
    <View
      data-slot='dialog-header'
      // oxlint-disable-next-line react/refs
      {...panResponder.panHandlers}
    >
      <View
        // oxlint-disable-next-line react/refs
        className='items-center justify-center pt-3'
      >
        <Animated.View
          style={{ transform: [{ scaleX }], opacity }}
          className='h-1.5 w-12 rounded-full bg-muted-foreground'
        />
      </View>

      <View className={cn('flex flex-col gap-2', className)} {...props}>
        {props.children}
      </View>
    </View>
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<typeof View> & {
  showCloseButton?: boolean
}) {
  return (
    <View
      data-slot='dialog-footer'
      className={cn('flex flex-row justify-end gap-2', className)}
      {...props}
    >
      {showCloseButton && <DialogClose>Close</DialogClose>}

      {children}
    </View>
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot='dialog-title'
      className={cn(
        'font-heading text-base leading-none font-medium',
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot='dialog-description'
      className={cn(
        'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
