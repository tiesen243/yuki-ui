import * as React from 'react'

const useDebounce = <T>(callback: (...args: T[]) => void, delay: number) => {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedCallback = React.useCallback(
    (...args: T[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      // oxlint-disable-next-line promise/prefer-await-to-callbacks
      timeoutRef.current = setTimeout(() => callback(...args), delay)
    },
    [callback, delay]
  )

  return debouncedCallback
}

export { useDebounce }
