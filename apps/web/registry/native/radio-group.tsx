import type { GestureResponderEvent } from 'react-native'

import * as React from 'react'
import { Pressable, View } from 'react-native'

import { cn } from '@/lib/utils'

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
  disabled: boolean
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
)

interface RadioGroupProps extends React.ComponentProps<typeof View> {
  value: string
  onValueChange: (value: string) => void
  defaultValue?: string
  disabled?: boolean
}

function RadioGroup({
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled = false,
  children,
  ...props
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')

  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : internalValue

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val)
      onValueChange?.(val)
    },
    [isControlled, onValueChange]
  )

  const memoizedValue = React.useMemo(
    () => ({ value, onValueChange: handleValueChange, disabled }),
    [value, handleValueChange, disabled]
  )

  return (
    <RadioGroupContext.Provider value={memoizedValue}>
      <View
        data-slot='radio-group'
        accessibilityRole='radiogroup'
        className={cn('flex w-full flex-col gap-3', className)}
        {...props}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}

interface RadioGroupItemProps extends React.ComponentProps<typeof Pressable> {
  value: string
  disabled?: boolean
}

function RadioGroupItem({
  className,
  value: itemValue,
  disabled: itemDisabled,
  onPress,
  children,
  ...props
}: RadioGroupItemProps) {
  const ctx = React.use(RadioGroupContext)
  if (!ctx) throw new Error('RadioGroupItem must be used within a RadioGroup')

  const checked = ctx.value === itemValue
  const disabled = itemDisabled ?? ctx.disabled

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return
    ctx.onValueChange?.(itemValue)
    onPress?.(e)
  }

  return (
    <Pressable
      data-slot='radio-group-item'
      accessibilityRole='radio'
      accessibilityState={{ checked, disabled }}
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={handlePress}
      className={cn(
        'flex flex-row items-center gap-2 py-1',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <View
        className={cn(
          'relative flex size-5 shrink-0 items-center justify-center rounded-full border border-input bg-background transition-colors',
          checked && 'border-primary bg-primary'
        )}
      >
        {checked && (
          <View
            data-slot='radio-group-indicator'
            className='size-2 rounded-full bg-primary-foreground'
          />
        )}
      </View>

      {children as React.ReactNode}
    </Pressable>
  )
}

export { RadioGroup, RadioGroupItem }
