import * as React from 'react'

export function createSafeContext<TValue>(
  errorMessage = 'useContext must be used within a Provider'
) {
  const Context = React.createContext<TValue | null>(null)

  function useSafeContext() {
    const context = React.use(Context)
    if (context === null) throw new Error(errorMessage)
    return context
  }

  return [useSafeContext, Context] as const
}
