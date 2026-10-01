import { View } from 'react-native'

import { cn } from '@/lib/utils'

function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof View> & {
  orientation?: 'horizontal' | 'vertical'
}) {
  return (
    <View
      data-slot='separator'
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' && 'h-px w-full',
        orientation === 'vertical' && 'w-px self-stretch',
        className
      )}
      {...props}
    />
  )
}

export { Separator }
