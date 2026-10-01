import type { GestureResponderEvent } from 'react-native'

import { CheckIcon } from 'lucide-uniwind'
import * as React from 'react'
import { Pressable, View } from 'react-native'

import { cn } from '@/lib/utils'
import { Typography } from '@/registry/native/typography'

interface CheckboxProps extends Omit<
  React.ComponentProps<typeof Pressable>,
  'children'
> {
  label?: React.ReactNode

  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Checkbox({
  className,
  label,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  ...props
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)

  const isControlled = checkedProp !== undefined
  const checked = isControlled ? checkedProp : internalChecked

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return

    const nextChecked = !checked
    if (!isControlled) setInternalChecked(nextChecked)
    onCheckedChange?.(nextChecked)
    props.onPress?.(e)
  }

  return (
    <Pressable
      data-slot='checkbox'
      accessibilityRole='checkbox'
      accessibilityState={{ checked, disabled: disabled ?? false }}
      aria-checked={checked}
      aria-disabled={disabled ?? false}
      disabled={disabled}
      onPress={handlePress}
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
          'flex size-5 shrink-0 items-center justify-center rounded-md border border-input bg-background transition-colors',
          checked && 'border-primary bg-primary text-primary-foreground'
        )}
      >
        {checked && (
          <View
            data-slot='checkbox-indicator'
            className='items-center justify-center'
          >
            <CheckIcon className='size-4 text-primary-foreground' />
          </View>
        )}
      </View>

      {label &&
        (typeof label === 'string' ? (
          <Typography className='text-sm font-medium text-foreground select-none'>
            {label}
          </Typography>
        ) : (
          label
        ))}
    </Pressable>
  )
}

export { Checkbox }
