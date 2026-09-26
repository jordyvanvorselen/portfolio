'use client'

import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'

const REDUCED_MOTION_HOLD_MS = 1500

export const useTimeline = (totalMs: number, onDone?: () => void) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      if (!onDone) return
      const timeout = setTimeout(onDone, REDUCED_MOTION_HOLD_MS)
      return () => clearTimeout(timeout)
    }
    let frame = 0
    let start: number | undefined
    const tick = (now: number) => {
      start ??= now
      const next = now - start
      setElapsed(Math.min(next, totalMs))
      if (next < totalMs) frame = requestAnimationFrame(tick)
      else onDone?.()
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [totalMs, onDone, prefersReducedMotion])

  return prefersReducedMotion ? totalMs : elapsed
}
