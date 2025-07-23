'use client'

import * as React from 'react'

import { ProgressButton } from '@/registry/ui/progress-button'

export default function ProgressButtonDemo() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [progress])

  return (
    <div className='flex gap-4'>
      {(
        ['default', 'secondary', 'destructive', 'outline', 'ghost'] as const
      ).map((variant) => (
        <ProgressButton
          key={variant}
          variant={variant}
          progress={progress}
          isLoading={progress < 100}
          onClick={() => {
            setProgress(0)
          }}
        >
          Submit
        </ProgressButton>
      ))}
    </div>
  )
}
