'use client'

import { useRef } from 'react'

import { useCountUp } from '@/domains/scorecard/useCountUp'
import { useInView } from '@/domains/scorecard/useInView'

interface CountingMultiplierProps {
  value: number
  delayMs: number
  durationMs: number
  timesClassName: string
}

export const CountingMultiplier = ({
  value,
  delayMs,
  durationMs,
  timesClassName,
}: CountingMultiplierProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, 0.1)
  const tenths = Math.round(value * 10)
  const counted = useCountUp(tenths - 10, durationMs, delayMs, isInView)
  const format = (multiplier: number) => multiplier.toFixed(1)

  return (
    <span ref={ref}>
      <span className="sr-only">{format(value)}×</span>
      <span aria-hidden="true">
        <span className="relative inline-block">
          <span className="invisible">{format(value)}</span>
          <span className="absolute right-0 top-0 whitespace-nowrap">
            {format((10 + counted) / 10)}
          </span>
        </span>
        <span className={timesClassName}>×</span>
      </span>
    </span>
  )
}
