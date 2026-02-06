'use client'

import { useState, useEffect } from 'react'

// Extract window check for testability
export const getInitialMatches = (query: string): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches
  }
  return false
}

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(() =>
    getInitialMatches(query)
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Create event listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add listener
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
