import { useCallback, useRef, useState } from 'react'

export function useImmer<T>(
  initialValue: T
): [T, (updater: (draft: T) => void) => void] {
  const [state, setState] = useState(initialValue)

  const updateState = useCallback((updater: (draft: T) => void) => {
    setState((prevState) => {
      const draft = structuredClone(prevState)
      updater(draft)
      return draft
    })
  }, [])

  return [state, updateState]
}

export function useImmerReducer<TValue, TAction>(
  reducer: (draft: TValue, action: TAction) => void,
  initialValue: TValue
): [TValue, (action: TAction) => void] {
  const [state, setState] = useState(initialValue)
  const reducerRef = useRef(reducer)

  const dispatch = useCallback((action: TAction) => {
    setState((prev) => {
      const draft = structuredClone(prev)
      reducerRef.current(draft as TValue, action)
      return draft
    })
  }, [])

  return [state, dispatch]
}
