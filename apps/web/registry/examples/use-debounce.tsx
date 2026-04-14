'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useDebounce } from '@/registry/hooks/use-debounce'

export default function UseDebounceDemo() {
  const [query, setQuery] = React.useState('')
  const [debouncedValue, setDebouncedValue] = React.useState('')

  const debouncedSearch = useDebounce((searchTerm: string) => {
    setDebouncedValue(searchTerm)
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    debouncedSearch(e.target.value)
  }

  return (
    <div className='flex w-full max-w-md flex-col gap-4'>
      <Label htmlFor='search-input' className='flex flex-col items-start gap-2'>
        Search:
        <Input
          id='search-input'
          value={query}
          onChange={handleChange}
          placeholder='Type to search...'
        />
      </Label>

      <p className='text-sm break-all text-muted-foreground'>
        Debounced Value: <strong>{debouncedValue}</strong>
      </p>
    </div>
  )
}
