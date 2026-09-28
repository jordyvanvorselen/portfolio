'use client'

import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'

import { CountingMultiplier } from '@/domains/scorecard/CountingMultiplier'
import { Button } from '@/ui/Button'

const REVIEW_MULTIPLIER = 5.4
const INCIDENT_MULTIPLIER = 3.4

const accent = (chunks: ReactNode) => (
  <span className="text-teal-300">{chunks}</span>
)

const strong = (chunks: ReactNode) => (
  <span className="whitespace-nowrap font-semibold text-white">{chunks}</span>
)

const incidentMultiplier = () => (
  <CountingMultiplier value={INCIDENT_MULTIPLIER} delayMs={1600} />
)

interface ScorecardHeroProps {
  onStart: () => void
  onPreview: () => void
}

export const ScorecardHero = ({ onStart, onPreview }: ScorecardHeroProps) => {
  const t = useTranslations('scorecard.intro')

  return (
    <div className="mx-auto w-full max-w-5xl">
      <p className="flex items-center gap-4 text-xs sm:text-sm uppercase tracking-[0.22em] text-gray-500">
        <span className="h-px w-10 bg-gray-600" aria-hidden="true" />
        {t('eyebrow')}
      </p>

      <h1 className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
        <span className="block text-[9rem] sm:text-[12rem] lg:text-[15rem] font-semibold leading-[0.78] tracking-[-0.06em] text-white">
          <CountingMultiplier
            value={REVIEW_MULTIPLIER}
            delayMs={400}
            durationMs={2000}
            timesClassName="ml-1 text-[0.45em] tracking-normal text-gray-500"
          />
        </span>
        <span className="block pb-2 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-white text-balance">
          {t.rich('reviewFinding', { accent })}
        </span>
      </h1>

      <p className="mt-8 max-w-3xl text-xl sm:text-2xl leading-snug text-gray-400 tracking-[-0.01em]">
        {t.rich('incidentFinding', {
          accent,
          strong,
          multiplier: incidentMultiplier,
        })}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-gray-600">
        {t('findingsSource')}
      </p>

      <div className="mt-12 flex flex-col gap-8 border-t border-gray-800 pt-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="max-w-lg text-lg text-gray-400 leading-relaxed text-pretty">
          {t.rich('body', { strong })}
        </p>
        <div className="flex shrink-0 flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
          <Button
            type="button"
            size="lg"
            onClick={onStart}
            className="group gap-2 whitespace-nowrap"
          >
            {t('start')}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <button
            type="button"
            onClick={onPreview}
            className="cursor-pointer whitespace-nowrap text-base font-medium text-gray-300 underline decoration-gray-600 underline-offset-8 transition-colors hover:text-white hover:decoration-white"
          >
            {t('sample')}
          </button>
        </div>
      </div>
    </div>
  )
}
