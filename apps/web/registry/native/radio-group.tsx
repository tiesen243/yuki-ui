import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { cn } from '@/lib/utils'

interface RadioGroupContextValue {
  value: string
  onValueChange: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null
)

const useRadioGroupContext = () => {
  const context = React.use(RadioGroupContext)
  if (!context)
    throw new Error('RadioGroup components must be wrapped in <RadioGroup />')
  return context
}

function RadioGroup({
  className,
  value: valueProp,
  onValueChange,
  children,
  ...props
}: React.ComponentProps<typeof View> & {
  value?: string
  onValueChange?: (value: string) => void
}) {
  const [internalValue, setInternalValue] = React.useState(valueProp ?? '')

  const isControlled = valueProp !== undefined && onValueChange !== undefined
  const value = isControlled ? valueProp : internalValue

  const handleValueChange = React.useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val)
      onValueChange?.(val)
    },
    [isControlled, onValueChange]
  )

  const memoizedValue = React.useMemo(
    () => ({ value, onValueChange: handleValueChange }),
    [value, handleValueChange]
  )

  return (
    <RadioGroupContext value={memoizedValue}>
      <View
        data-slot='radio-group'
        accessibilityRole='radiogroup'
        className={cn('flex w-full flex-col gap-3', className)}
        {...props}
      >
        {children}
      </View>
    </RadioGroupContext>
  )
}

function RadioGroupItem({
  className,
  value: itemValue,
  disabled = false,
  activeOpacity = 0.8,
  onPress,
  children,
  ...props
}: React.ComponentProps<typeof TouchableOpacity> & {
  value: string
}) {
  const { value, onValueChange } = useRadioGroupContext()
  const checked = value === itemValue

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<typeof onPress>>[0]) => {
      if (disabled) return

      onValueChange(itemValue)
      onPress?.(event)
    },
    [disabled, itemValue, onValueChange, onPress]
  )

  return (
    <TouchableOpacity
      data-slot='radio-group-item'
      accessibilityRole='radio'
      accessibilityState={{ checked, disabled }}
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      className={cn(
        'flex flex-row items-center gap-2 py-1',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <View
        className={cn(
          'relative flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-transparent transition-colors',
          checked && 'border-primary'
        )}
      >
        {checked && (
          <View
            data-slot='radio-group-indicator'
            className='size-2 rounded-full bg-primary'
          />
        )}
      </View>

      {children}
    </TouchableOpacity>
  )
}

export { RadioGroup, RadioGroupItem }
