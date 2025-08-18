'use client'

import * as React from 'react'

import { cn } from '@yuki/ui'
import { EyeIcon, EyeOffIcon } from '@yuki/ui/icons'

function PasswordInput({
  className,
  type: _,
  ...props
}: React.ComponentProps<'input'>) {
  const [isShow, setIsShow] = React.useState(false)

  return (
    <div data-slot='password-input' className='relative flex items-center'>
      <input
        data-slot='password-input-field'
        type={isShow ? 'text' : 'password'}
        className={cn(
          'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent py-1 pr-9 pl-3 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          className,
        )}
        {...props}
      />
      <button
        data-slot='password-input-toggle'
        type='button'
        onClick={() => {
          setIsShow(!isShow)
        }}
        className='absolute right-3 [&_svg]:size-4 [&_svg]:text-muted-foreground hover:[&_svg]:text-foreground'
      >
        {isShow ? <EyeIcon /> : <EyeOffIcon />}
        <span className='sr-only'>
          {isShow ? 'Hide password' : 'Show password'}
        </span>
      </button>
    </div>
  )
}

export { PasswordInput }
