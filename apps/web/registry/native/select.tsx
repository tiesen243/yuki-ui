import { CheckIcon, ChevronDownIcon } from 'lucide-uniwind'
import * as React from 'react'
import { ScrollView, View } from 'react-native'

import { cn } from '@/lib/utils'
import {
  BottomSheetContent,
  BottomSheet,
  BottomSheetTrigger,
  BottomSheetHeader,
  BottomSheetTitle,
} from '@/registry/native/bottom-sheet'
import { Button } from '@/registry/native/button'
import { Typography } from '@/registry/native/typography'

interface SelectContextValue<TValue, TMultiple extends boolean = false> {
  value: TMultiple extends true ? TValue[] : TValue | null
  onValueChange: (
    value: TMultiple extends true ? TValue[] : TValue | null
  ) => void
  items: readonly { label: string; value: TValue }[]

  isMultiple: TMultiple

  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectContext = React.createContext<SelectContextValue<unknown> | null>(
  null
)

const useSelectContext = <TValue, TMultiple extends boolean = false>() => {
  const context = React.useContext(
    SelectContext as React.Context<SelectContextValue<TValue, TMultiple> | null>
  )
  if (!context)
    throw new Error('Select components must be wrapped in <Select />')
  return context
}

function Select<TValue, TMultiple extends boolean = false>(
  props: Omit<
    Partial<SelectContextValue<TValue, TMultiple>>,
    'isMultiple' | 'isOpen' | 'setIsOpen'
  > & {
    multiple?: TMultiple
    children: React.ReactNode
  }
) {
  const { items, multiple: isMultiple = false } = props

  const [isOpen, setIsOpen] = React.useState(false)
  const [localValue, setLocalValue] = React.useState<
    TMultiple extends true ? TValue[] : TValue | null
  >(props.value ?? ((isMultiple ? [] : null) as never))

  const isControlled =
    props.value !== undefined && props.onValueChange !== undefined
  const value = isControlled ? props.value : localValue
  const onValueChange = isControlled ? props.onValueChange : setLocalValue

  const memoizedContextValue = React.useMemo(
    () => ({ value, onValueChange, items, isMultiple, isOpen, setIsOpen }),
    [value, onValueChange, items, isMultiple, isOpen, setIsOpen]
  ) as never

  return (
    <SelectContext value={memoizedContextValue}>
      <BottomSheet open={isOpen} onOpenChange={setIsOpen}>
        {props.children}
      </BottomSheet>
    </SelectContext>
  )
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof BottomSheetTrigger>) {
  return (
    <BottomSheetTrigger
      data-slot='select-trigger'
      variant='outline'
      className={cn('w-full justify-between', className)}
      {...props}
    >
      {children as React.ReactNode}

      <ChevronDownIcon className='size-4 shrink-0 text-muted-foreground' />
    </BottomSheetTrigger>
  )
}

function SelectValue<TValue, TMultiple extends boolean = false>({
  placeholder,
  className,
  ...props
}: React.ComponentProps<typeof Typography> & { placeholder?: string }) {
  const { value, items } = useSelectContext<TValue, TMultiple>()

  const hasValue =
    value === null ||
    value === undefined ||
    (Array.isArray(value) && value.length === 0)

  const displayValue = React.useMemo(() => {
    if (hasValue) return placeholder ?? 'Select an option'

    if (Array.isArray(value))
      return value
        .map((val) => items?.find((item) => item.value === val)?.label ?? val)
        .join(', ')

    return items?.find((item) => item.value === value)?.label ?? value
  }, [hasValue, value, items, placeholder])

  return (
    <Typography
      data-slot='select-value'
      className={cn('flex-1', hasValue && 'text-muted-foreground', className)}
      numberOfLines={1}
      {...props}
    >
      {displayValue.toString()}
    </Typography>
  )
}

function SelectContent({
  title = 'Select an option',
  children,
  ...props
}: React.ComponentProps<typeof BottomSheetContent> & {
  title?: string
}) {
  const { isMultiple, onValueChange, setIsOpen } = useSelectContext()

  return (
    <BottomSheetContent data-slot='select-content' {...props}>
      <BottomSheetHeader className='flex-row items-center'>
        <BottomSheetTitle className='flex-1'>{title}</BottomSheetTitle>

        {isMultiple && (
          <Button variant='ghost' size='xs' onPress={() => onValueChange([])}>
            Clear
          </Button>
        )}

        <Button variant='ghost' size='xs' onPress={() => setIsOpen(false)}>
          Done
        </Button>
      </BottomSheetHeader>

      <ScrollView contentContainerClassName='grow px-4 gap-y-1 py-2'>
        {children as React.ReactNode}
      </ScrollView>
    </BottomSheetContent>
  )
}

function SelectItem<TValue>({
  value,
  onPress,
  className,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { value: TValue }) {
  const {
    value: selected,
    onValueChange,
    isMultiple,
    setIsOpen,
  } = useSelectContext<TValue>()

  const handlePress = React.useCallback(
    (event: Parameters<NonNullable<typeof onPress>>[0]) => {
      if (disabled) return

      if (isMultiple && Array.isArray(selected)) {
        const newValue = selected?.includes(value)
          ? selected?.filter((v) => v !== value)
          : [...(selected ?? []), value]

        onValueChange(newValue as never)
      } else {
        onValueChange(value)
        setIsOpen(false)
      }

      onPress?.(event)
    },
    [disabled, isMultiple, onValueChange, selected, setIsOpen, value, onPress]
  )

  const isSelected = React.useMemo(() => {
    if (isMultiple) return (selected as TValue[])?.includes(value)
    return selected === value
  }, [isMultiple, selected, value])

  return (
    <Button
      data-slot='select-item'
      accessibilityRole='button'
      accessibilityState={{ selected: isSelected, disabled }}
      aria-disabled={disabled}
      disabled={disabled}
      variant='ghost'
      onPress={handlePress}
      className={cn('justify-between', isSelected && 'bg-accent', className)}
      {...props}
    >
      <Typography className={isSelected ? 'text-accent-foreground' : ''}>
        {children as React.ReactNode}
      </Typography>

      {isSelected && (
        <CheckIcon className='size-4 shrink-0 text-accent-foreground' />
      )}
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
      className={cn('py-1 text-xs font-semibold text-foreground', className)}
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
