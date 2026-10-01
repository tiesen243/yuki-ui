import type { Pressable } from 'react-native'

import { CheckIcon, ChevronDownIcon } from 'lucide-uniwind'
import * as React from 'react'
import { ScrollView, View } from 'react-native'

import { cn } from '@/lib/utils'
import { Button } from '@/registry/native/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/native/dialog'
import { Typography, TypographyContext } from '@/registry/native/typography'

interface SelectContextValue<TMultiple extends boolean = false> {
  open: boolean
  setOpen: (open: boolean) => void
  value?: TMultiple extends true ? string[] : string
  onValueChange?: (value: TMultiple extends true ? string[] : string) => void
  multiple?: TMultiple
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

const useSelectContext = () => {
  const context = React.use(SelectContext)
  if (!context)
    throw new Error('useSelectContext must be used within a SelectProvider')
  return context
}

type SelectProps<TMultiple extends boolean = false> = React.PropsWithChildren<{
  value?: TMultiple extends true ? string[] : string
  defaultValue?: TMultiple extends true ? string[] : string
  onValueChange?: (value: TMultiple extends true ? string[] : string) => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
  multiple?: TMultiple
}>

function Select<TMultiple extends boolean = false>({
  children,
  value: valueProp,
  defaultValue,
  onValueChange,
  open: openProp,
  onOpenChange,
  multiple,
}: SelectProps<TMultiple>) {
  const [open, setOpen] = React.useState(openProp ?? false)
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    (TMultiple extends true ? string[] : string) | undefined
  >(defaultValue)

  const isControlled = valueProp !== undefined
  const currentValue = isControlled ? valueProp : uncontrolledValue

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange]
  )

  const handleValueChange = React.useCallback(
    (newValue: TMultiple extends true ? string[] : string) => {
      if (!isControlled) setUncontrolledValue(newValue)
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const memoizedValue = React.useMemo(
    () => ({
      open,
      setOpen: handleOpenChange,
      value: currentValue,
      onValueChange: handleValueChange,
      multiple,
    }),
    [open, handleOpenChange, currentValue, handleValueChange, multiple]
  ) as never

  return (
    <SelectContext value={memoizedValue}>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        {children}
      </Dialog>
    </SelectContext>
  )
}

function SelectTrigger({
  className,
  children,
  invalid,
  ...props
}: React.ComponentProps<typeof Pressable> & {
  invalid?: boolean
}) {
  return (
    <DialogTrigger
      data-slot='select-trigger'
      className={cn(
        'flex h-10 w-fit flex-row items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 outline-none select-none focus:border-ring focus:ring-3 focus:ring-ring/50 dark:bg-input/30 dark:active:bg-input/50',
        invalid &&
          'border-destructive ring-3 ring-destructive/20 dark:border-destructive/50 dark:ring-destructive/40',
        className
      )}
      {...props}
    >
      <View className='flex-1 flex-row items-center'>
        {children as React.ReactNode}
      </View>
      <ChevronDownIcon className='size-4 text-muted-foreground/60' />
    </DialogTrigger>
  )
}

function SelectValue({
  placeholder,
  className,
  items,
  ...props
}: React.ComponentProps<typeof Typography> & {
  placeholder?: string
  items?: Record<string, string> | { label: string; value: string }[]
}) {
  const { value, multiple } = useSelectContext()

  const hasValue = multiple
    ? Array.isArray(value) && value.length > 0
    : Boolean(value)

  const getLabel = (valKey: string) => {
    if (!items) return valKey

    if (Array.isArray(items)) {
      const found = items.find((item) => item.value === valKey)
      return found ? found.label : valKey
    }

    return items[valKey] ?? valKey
  }

  const getDisplayValue = () => {
    if (!hasValue) return placeholder

    if (multiple && Array.isArray(value))
      return value.map((v) => getLabel(v)).join(', ')

    return getLabel(value as string)
  }

  return (
    <Typography
      data-slot='select-value'
      numberOfLines={1}
      className={cn(
        'text-sm',
        hasValue ? 'font-normal text-foreground' : 'text-muted-foreground',
        className
      )}
      {...props}
    >
      {getDisplayValue()}
    </Typography>
  )
}

function SelectContent({
  children,
  className,
  title = 'Select an option',
}: {
  children: React.ReactNode
  className?: string
  title?: string
}) {
  const { multiple, onValueChange } = useSelectContext()

  return (
    <DialogContent className={cn('px-0', className)}>
      <DialogHeader className='flex-row items-center justify-between border-b border-foreground/20 px-4 pb-3'>
        <DialogTitle className='text-base font-semibold text-popover-foreground'>
          {title}
        </DialogTitle>

        <View className='flex-row items-center gap-1'>
          {multiple && (
            <Button
              size='sm'
              variant='ghost'
              onPress={() => onValueChange?.([] as never)}
            >
              Clear
            </Button>
          )}

          <DialogClose size='sm' variant='ghost'>
            Done
          </DialogClose>
        </View>
      </DialogHeader>

      <ScrollView
        className='gap-y-1.5 px-4'
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </DialogContent>
  )
}

function SelectItem({
  value: itemValue,
  children,
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
}) {
  const { value, onValueChange, multiple, setOpen } = useSelectContext()

  const isSelected = multiple
    ? Array.isArray(value) && value.includes(itemValue)
    : value === itemValue

  const handleSelect = React.useCallback(() => {
    if (disabled) return

    if (multiple) {
      const currentValues = Array.isArray(value) ? [...value] : []
      const nextValues = isSelected
        ? currentValues.filter((v) => v !== itemValue)
        : [...currentValues, itemValue]

      onValueChange?.(nextValues as never)
      return
    }

    onValueChange?.(itemValue as never)
    setOpen(false)
  }, [disabled, itemValue, isSelected, multiple, onValueChange, setOpen, value])

  const selectTextClassName = cn(
    'flex-1 text-sm font-normal text-popover-foreground',
    isSelected && 'font-medium'
  )

  return (
    <Button
      size='lg'
      variant='ghost'
      disabled={disabled}
      onPress={handleSelect}
      className={cn('justify-between', isSelected && 'bg-accent/50', className)}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Typography className={selectTextClassName} numberOfLines={1}>
          {children}
        </Typography>
      ) : (
        <TypographyContext value={selectTextClassName}>
          {children as React.ReactNode}
        </TypographyContext>
      )}
      {isSelected && <CheckIcon className='size-4 text-accent-foreground' />}
    </Button>
  )
}

function SelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='select-group'
      className={cn('gap-y-1 py-1', className)}
      {...props}
    />
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof Typography>) {
  return (
    <Typography
      data-slot='select-label'
      className={cn(
        'px-3 py-1 text-xs font-semibold text-foreground',
        className
      )}
      {...props}
    />
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return (
    <View
      data-slot='select-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
}
