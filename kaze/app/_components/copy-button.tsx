'use client'

import { useState } from 'react'

import { Button } from '@yuki/ui/button'
import { Check, Copy } from '@yuki/ui/icons'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className='h-6 w-6'
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className='h-3 w-3 text-green-500' />
      ) : (
        <Copy className='h-3 w-3' />
      )}
    </Button>
  )
}
