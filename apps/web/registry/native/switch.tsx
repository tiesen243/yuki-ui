import * as React from 'react'
import { Animated, TouchableOpacity } from 'react-native'

import { cn } from '@/lib/utils'

const SWITCH_WIDTH = 32
const THUMB_SIZE = 14
const PADDING = 2
const TRANSLATE_X = SWITCH_WIDTH - THUMB_SIZE - PADDING * 2

function Switch({
  className,
  checked: _checked = false,
  onCheckedChange,
  disabled = false,
  activeOpacity = 0.8,
  onPress,
  ...props
}: Omit<React.ComponentProps<typeof TouchableOpacity>, 'children'> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  const [localChecked, setLocalChecked] = React.useState(_checked)
  // oxlint-disable-next-line react/refs
  const translateX = React.useRef(
    new Animated.Value(_checked ? TRANSLATE_X : PADDING)
  ).current

  const isControlled = _checked !== undefined && onCheckedChange !== undefined
  const checked = isControlled ? _checked : localChecked

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<typeof onPress>>[0]) => {
      if (disabled) return

      Animated.timing(translateX, {
        toValue: checked ? PADDING : TRANSLATE_X,
        duration: 200,
        useNativeDriver: true,
      }).start()

      if (!isControlled) setLocalChecked(!checked)
      onCheckedChange?.(!checked)

      onPress?.(event)
    },
    [checked, disabled, isControlled, onCheckedChange, onPress, translateX]
  )

  return (
    <TouchableOpacity
      data-slot='switch'
      accessibilityRole='switch'
      accessibilityState={{ checked, disabled }}
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      style={{ width: SWITCH_WIDTH }}
      className={cn(
        'group/switch relative inline-flex h-5 shrink-0 flex-row items-center rounded-full border border-transparent bg-input transition-all outline-none dark:bg-input/80',
        checked && 'bg-primary dark:bg-primary',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <Animated.View
        data-slot='switch-thumb'
        style={{
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          transform: [{ translateX }],
        }}
        className={cn(
          'shrink-0 rounded-full bg-foreground',
          checked && 'bg-primary-foreground'
        )}
      />
    </TouchableOpacity>
  )
}

export { Switch }
