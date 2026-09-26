'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { tiers, type Tier } from '@/domains/scorecard/scorecard.data'
import { toneStyles } from '@/domains/scorecard/tones'
import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'

interface TierScaleProps {
  score: number
  current: Tier
}

const ascending = [...tiers].sort((a, b) => a.min - b.min)

const rangeOf = (index: number) => {
  const tier = ascending[index]!
  const next = ascending[index + 1]
  return { from: tier.min, to: next ? next.min : 100 }
}

const SWEEP_MS = 900
const SWEEP_DELAY_MS = 150

const useSweep = (target: number) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [position, setPosition] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) return
    let frame = 0
    let start: number | undefined
    const tick = (now: number) => {
      start ??= now
      const progress = Math.min((now - start) / SWEEP_MS, 1)
      setPosition(target * (1 - Math.pow(1 - progress, 4)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, SWEEP_DELAY_MS)
    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [target, prefersReducedMotion])

  return prefersReducedMotion ? target : position
}

export const TierScale = ({ score, current }: TierScaleProps) => {
  const t = useTranslations('scorecard')
  const position = useSweep(score)
  const hasLanded = position >= score - 1

  return (
    <div className="mx-auto mt-8 w-full max-w-lg" aria-hidden="true">
      <div className="relative">
        <div className="flex gap-1">
          {ascending.map((tier, index) => {
            const { from, to } = rangeOf(index)
            const isCurrent = tier.id === current.id
            const trail = Math.min(
              Math.max((position - from) / (to - from), 0),
              1
            )
            const fill = isCurrent && hasLanded ? 1 : trail
            return (
              <div
                key={tier.id}
                className="h-1.5 overflow-hidden rounded-full bg-gray-800"
                style={{ width: `${to - from}%` }}
              >
                <div
                  className="h-full w-full origin-left rounded-full"
                  style={{
                    backgroundColor: toneStyles[tier.tone].hex,
                    transform: `scaleX(${fill})`,
                    transition: hasLanded
                      ? 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)'
                      : 'none',
                  }}
                />
              </div>
            )
          })}
        </div>
        <div
          className="absolute inset-x-0 -top-1.5"
          style={{ transform: `translateX(${position}%)` }}
        >
          <div className="h-4.5 w-4.5 -translate-x-1/2 rounded-full border-[3px] border-gray-950 bg-white" />
        </div>
      </div>
      <div className="mt-3 flex gap-1 text-xs">
        {ascending.map((tier, index) => {
          const { from, to } = rangeOf(index)
          const isReached = tier.id === current.id && position >= from
          return (
            <div
              key={tier.id}
              className={`text-left transition-colors duration-200 ${
                isReached
                  ? `font-semibold ${toneStyles[tier.tone].text}`
                  : 'text-gray-400'
              }`}
              style={{ width: `${to - from}%` }}
            >
              {t(`tiers.${tier.id}.name`)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
