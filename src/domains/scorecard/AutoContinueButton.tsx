'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'

interface AutoContinueButtonProps {
  durationMs: number
  onContinue: () => void
  children: ReactNode
}

export const AutoContinueButton = ({
  durationMs,
  onContinue,
  children,
}: AutoContinueButtonProps) => {
  const t = useTranslations('scorecard.analyzing')
  const ref = useRef<HTMLButtonElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [elapsed, setElapsed] = useState(0)
  const secondsLeft = Math.max(Math.ceil((durationMs - elapsed) / 1000), 0)

  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    let frame = 0
    let start: number | undefined
    const tick = (now: number) => {
      start ??= now
      const next = now - start
      setElapsed(Math.min(next, durationMs))
      if (next < durationMs) frame = requestAnimationFrame(tick)
      else onContinue()
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [durationMs, onContinue])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onContinue}
      className="group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-lg border border-gray-700 px-5 text-lg font-medium text-white transition-colors hover:border-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400 motion-safe:animate-log-in"
    >
      {!prefersReducedMotion && (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left bg-white/10"
          style={{ transform: `scaleX(${elapsed / durationMs})` }}
        />
      )}
      <span className="relative">{children}</span>
      <span className="sr-only">
        {t('autoOpens', { seconds: Math.round(durationMs / 1000) })}
      </span>
      <span
        className="relative w-8 rounded-md bg-gray-800 py-0.5 text-center text-sm tabular-nums text-gray-300"
        aria-hidden="true"
      >
        {secondsLeft}s
      </span>
      <ArrowRight
        aria-hidden="true"
        className="relative h-5 w-5 transition-transform group-hover:translate-x-0.5"
      />
    </button>
  )
}
