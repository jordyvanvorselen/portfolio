'use client'

import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'

import { useCountUp } from '@/domains/scorecard/useCountUp'
import { useInView } from '@/domains/scorecard/useInView'

const symptoms = [
  {
    quote: 'Reviewing the PR takes longer than writing it did.',
    tenths: 54,
    label: 'longer to review a pull request',
    source: 'Median review time +441%',
    text: 'text-amber-400',
  },
  {
    quote: 'We merge more than ever, and production breaks more too.',
    tenths: 34,
    label: 'more incidents per pull request',
    source: 'Incidents per PR +242.7%',
    text: 'text-rose-400',
  },
]

const formatTenths = (tenths: number) => `${(tenths / 10).toFixed(1)}×`

interface CountingMultiplierProps {
  tenths: number
  delayMs: number
}

const RevealedMultiplier = ({ tenths, delayMs }: CountingMultiplierProps) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref)
  const counted = useCountUp(tenths - 10, 1400, delayMs, isInView)

  return (
    <span ref={ref} aria-hidden="true">
      {formatTenths(10 + counted)}
    </span>
  )
}

export const Symptoms = () => (
  <section className="mt-28" aria-labelledby="symptoms-heading">
    <div className="text-center">
      <h2
        id="symptoms-heading"
        className="text-3xl sm:text-4xl font-bold text-white"
      >
        Sound familiar?
      </h2>
      <p className="mt-3 text-lg text-gray-400">
        What AI-native teams see after the first speed-up.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      {symptoms.map(({ quote, tenths, label, source, text }, index) => (
        <figure
          key={label}
          className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-8"
        >
          <blockquote className="text-xl sm:text-2xl font-semibold leading-snug text-white text-balance">
            “{quote}”
          </blockquote>

          <p className="mt-10">
            <span
              className={`block text-7xl sm:text-8xl font-bold tracking-tight tabular-nums ${text}`}
            >
              <RevealedMultiplier tenths={tenths} delayMs={index * 200} />
              <span className="sr-only">{formatTenths(tenths)}</span>
            </span>
            <span className="mt-2 block text-lg text-gray-200">{label}</span>
          </p>

          <figcaption className="mt-auto pt-8 text-sm text-gray-400">
            {source} · Faros AI 2026 · 22,000 developers
          </figcaption>
        </figure>
      ))}
    </div>

    <p className="mt-12 flex flex-col items-center gap-3 text-center text-lg text-gray-300 text-balance">
      It’s not the AI. It’s the rails your code runs on.
      <ArrowDown className="w-5 h-5 text-teal-400" aria-hidden="true" />
    </p>
  </section>
)
