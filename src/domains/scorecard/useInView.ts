'use client'

import { useEffect, useState, type RefObject } from 'react'

export const useInView = (
  ref: RefObject<Element | null>,
  threshold = 1
): boolean => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current!
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isInView
}
