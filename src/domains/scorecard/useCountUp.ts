'use client'

import { useEffect, useState } from 'react'

export const useCountUp = (target: number, durationMs = 1600, delayMs = 0) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame = 0
    let start: number | undefined

    const tick = (now: number) => {
      start ??= now
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [target, durationMs, delayMs])

  return value
}
