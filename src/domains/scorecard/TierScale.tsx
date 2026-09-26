'use client'

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

export const TierScale = ({ score, current }: TierScaleProps) => {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsRevealed(true), 50)
    return () => clearTimeout(timeout)
  }, [])

  const markerAt = isRevealed || prefersReducedMotion ? score : 0

  return (
    <div className="mx-auto mt-8 w-full max-w-lg" aria-hidden="true">
      <div className="relative">
        <div className="flex gap-1">
          {ascending.map((tier, index) => {
            const { from, to } = rangeOf(index)
            const isCurrent = tier.name === current.name
            return (
              <div
                key={tier.name}
                className="h-1.5 rounded-full transition-colors"
                style={{
                  width: `${to - from}%`,
                  backgroundColor: isCurrent
                    ? toneStyles[tier.tone].hex
                    : '#1f2937',
                }}
              />
            )
          })}
        </div>
        <div
          className="absolute inset-x-0 -top-1.5"
          style={{
            transform: `translateX(${markerAt}%)`,
            transition: prefersReducedMotion
              ? 'none'
              : 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 200ms',
          }}
        >
          <div className="h-4.5 w-4.5 -translate-x-1/2 rounded-full border-[3px] border-gray-950 bg-white" />
        </div>
      </div>
      <div className="mt-3 flex gap-1 text-xs">
        {ascending.map((tier, index) => {
          const { from, to } = rangeOf(index)
          const isCurrent = tier.name === current.name
          return (
            <div
              key={tier.name}
              className={`text-left ${
                isCurrent
                  ? `font-semibold ${toneStyles[tier.tone].text}`
                  : 'text-gray-400'
              }`}
              style={{ width: `${to - from}%` }}
            >
              {tier.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
