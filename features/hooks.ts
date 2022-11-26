import React, { useState, useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Modal window
export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
    document.body.style.overflow = 'visible'
  }

  return {
    isShowing,
    toggle,
  }
}

// Use debounce
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
