'use client'

import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'

export const useTimeline = (totalMs: number) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    let frame = 0
    let start: number | undefined
    const tick = (now: number) => {
      start ??= now
      const next = now - start
      setElapsed(Math.min(next, totalMs))
      if (next < totalMs) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [totalMs, prefersReducedMotion])

  return prefersReducedMotion ? totalMs : elapsed
}
