import * as React from 'react'
import { TextInput } from 'react-native'

import { cn } from '@/lib/utils'

function Input({
  className,
  editable = true,
  invalid = false,
  placeholderTextColor: _placeholderTextColor,
  ...props
}: React.ComponentProps<typeof TextInput> & { invalid?: boolean }) {
  return (
    <TextInput
      data-slot='input'
      editable={editable}
      aria-disabled={!editable}
      aria-invalid={invalid}
      accessibilityState={{ disabled: !editable }}
      placeholderTextColor='#a1a1aa'
      className={cn(
        'h-10 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base text-foreground focus:border-ring dark:bg-input/30 dark:text-foreground/90',
        invalid && 'border-destructive text-destructive',
        !editable && 'bg-input/50 opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
