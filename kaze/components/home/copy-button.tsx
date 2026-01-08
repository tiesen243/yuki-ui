'use client'

import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

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
      size='icon-sm'
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
    >
      {copied ? (
        <CheckIcon className='size-3 text-success' />
      ) : (
        <CopyIcon className='size-3' />
      )}
    </Button>
  )
}
