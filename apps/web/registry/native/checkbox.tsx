import { CheckIcon } from 'lucide-uniwind'
import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  checked: _checked = false,
  onCheckedChange,
  disabled = false,
  activeOpacity = 0.8,
  onPress,
  children,
  ...props
}: React.ComponentProps<typeof TouchableOpacity> & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  const [localChecked, setLocalChecked] = React.useState(_checked)

  const isControlled = _checked !== undefined && onCheckedChange !== undefined
  const checked = isControlled ? _checked : localChecked

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<typeof onPress>>[0]) => {
      if (disabled) return

      if (!isControlled) setLocalChecked(!checked)
      onCheckedChange?.(!checked)

      onPress?.(event)
    },
    [checked, disabled, isControlled, onCheckedChange, onPress]
  )

  return (
    <TouchableOpacity
      data-slot='checkbox'
      accessibilityRole='checkbox'
      accessibilityState={{ checked, disabled }}
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={activeOpacity}
      className={cn(
        'flex-row items-center gap-2',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      <View
        data-slot='checkbox-box'
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded-sm border border-border bg-transparent transition-colors',
          checked && 'border-primary bg-primary text-primary-foreground'
        )}
      >
        {checked && (
          <CheckIcon className='size-4 shrink-0 text-primary-foreground' />
        )}
      </View>

      {children}
    </TouchableOpacity>
  )
}

export { Checkbox }
