import { useState } from 'react'
import { View } from 'react-native'

import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/registry/native/bottom-sheet'
import { Button } from '@/registry/native/button'
import { Field, FieldLabel, FieldSet } from '@/registry/native/field'
import { Input } from '@/registry/native/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/registry/native/select'
import { Typography } from '@/registry/native/typography'

const OPTIONS = Array.from({ length: 5 }, (_, i) => ({
  group: `Group ${i + 1}`,
  items: Array.from({ length: 2 }, (__, j) => ({
    label: `Option ${i * 2 + j + 1}`,
    value: `option${i * 2 + j + 1}`,
  })),
}))

const OPTIONS_MULTIPLE = Array.from({ length: 20 }, (_, i) => ({
  label: `Option ${i + 1}`,
  value: `option${i + 1}`,
}))

export default function IndexScreen() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <View className='flex-1 items-center justify-center gap-4 p-4'>
      <Typography variant='h1'>Bottom Sheet Demo</Typography>

      <BottomSheet open={isOpen} onOpenChange={setIsOpen}>
        <BottomSheetTrigger>Open Bottom Sheet</BottomSheetTrigger>

        <BottomSheetContent>
          <BottomSheetHeader>
            <BottomSheetTitle>Bottom Sheet Title</BottomSheetTitle>
            <BottomSheetDescription>
              This is a description of the bottom sheet. You can put any content
              you want here, such as text, images, or other components.
            </BottomSheetDescription>
          </BottomSheetHeader>

          <FieldSet className='p-4'>
            <Field>
              <FieldLabel>First Name</FieldLabel>
              <Input placeholder='Enter your first name' />
            </Field>

            <Field>
              <FieldLabel>Last Name</FieldLabel>
              <Input placeholder='Enter your last name' />
            </Field>

            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                placeholder='Enter your email'
                keyboardType='email-address'
              />
            </Field>
          </FieldSet>

          <BottomSheetFooter>
            <Button onPress={() => setIsOpen(false)}>Confirm</Button>
            <Button variant='outline' onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
          </BottomSheetFooter>
        </BottomSheetContent>
      </BottomSheet>

      <Select items={OPTIONS.flatMap((group) => group.items)}>
        <SelectTrigger>
          <SelectValue placeholder='Select an option' />
        </SelectTrigger>
        <SelectContent title='Select an option'>
          {OPTIONS.map((option) => (
            <SelectGroup key={option.group}>
              <SelectLabel>{option.group}</SelectLabel>
              {option.items.map((item) => (
                <SelectItem
                  key={`${option.group}-${item.value}`}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      <Select items={OPTIONS_MULTIPLE} multiple>
        <SelectTrigger>
          <SelectValue placeholder='Select an options' />
        </SelectTrigger>
        <SelectContent title='Select an options'>
          {OPTIONS_MULTIPLE.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </View>
  )
}
