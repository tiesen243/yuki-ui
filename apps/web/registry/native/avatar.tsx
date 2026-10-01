import * as React from 'react'
import { Image, View } from 'react-native'

import { cn } from '@/lib/utils'
import { Typography } from '@/registry/native/typography'

interface AvatarContextValue {
  isLoaded: boolean
  hasError: boolean
  setIsLoaded: (loaded: boolean) => void
  setHasError: (error: boolean) => void
}

const AvatarContext = React.createContext<AvatarContextValue | null>(null)

function Avatar({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  const memoizedValue = React.useMemo(
    () => ({ isLoaded, hasError, setIsLoaded, setHasError }),
    [isLoaded, hasError]
  )

  return (
    <AvatarContext value={memoizedValue}>
      <View
        data-slot='avatar'
        accessibilityRole='image'
        className={cn(
          'relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted',
          className
        )}
        {...props}
      >
        {children}
      </View>
    </AvatarContext>
  )
}

function AvatarImage({
  className,
  source,
  onLoad,
  onError,
  ...props
}: React.ComponentProps<typeof Image>) {
  const ctx = React.use(AvatarContext)
  if (!ctx)
    throw new Error('AvatarImage must be used within an Avatar component')

  const { hasError, setIsLoaded, setHasError } = ctx
  if (!source || hasError) return null

  return (
    <Image
      data-slot='avatar-image'
      source={source}
      onLoad={(e) => {
        setIsLoaded(true)
        onLoad?.(e)
      }}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      className={cn('size-full rounded-full', className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const ctx = React.use(AvatarContext)
  if (!ctx)
    throw new Error('AvatarFallback must be used within an Avatar component')

  const { isLoaded, hasError } = ctx
  if (isLoaded && !hasError) return null

  return (
    <View
      data-slot='avatar-fallback'
      className={cn(
        'absolute inset-0 flex size-full items-center justify-center rounded-full bg-muted',
        className
      )}
      {...props}
    >
      {typeof children === 'string' ? (
        <Typography className='text-xs font-medium text-muted-foreground'>
          {children}
        </Typography>
      ) : (
        children
      )}
    </View>
  )
}

export { Avatar, AvatarImage, AvatarFallback }
