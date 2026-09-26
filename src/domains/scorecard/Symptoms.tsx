'use client'

import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useCountUp } from '@/domains/scorecard/useCountUp'
import { useInView } from '@/domains/scorecard/useInView'

const symptoms = [
  { id: 'review', tenths: 54, text: 'text-amber-400' },
  { id: 'incidents', tenths: 34, text: 'text-rose-400' },
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

export const Symptoms = () => {
  const t = useTranslations('scorecard.symptoms')

  return (
    <section className="mt-28" aria-labelledby="symptoms-heading">
      <div className="text-center">
        <h2
          id="symptoms-heading"
          className="text-3xl sm:text-4xl font-bold text-white"
        >
          {t('title')}
        </h2>
        <p className="mt-3 text-lg text-gray-400">{t('subtitle')}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {symptoms.map(({ id, tenths, text }, index) => (
          <figure
            key={id}
            className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-8"
          >
            <blockquote className="text-xl sm:text-2xl font-semibold leading-snug text-white text-balance">
              “{t(`${id}.quote`)}”
            </blockquote>

            <p className="mt-10">
              <span
                className={`block text-7xl sm:text-8xl font-bold tracking-tight tabular-nums ${text}`}
              >
                <RevealedMultiplier tenths={tenths} delayMs={index * 200} />
                <span className="sr-only">{formatTenths(tenths)}</span>
              </span>
              <span className="mt-2 block text-lg text-gray-200">
                {t(`${id}.label`)}
              </span>
            </p>

            <figcaption className="mt-auto pt-8 text-sm text-gray-400">
              {t('source', { finding: t(`${id}.finding`) })}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-12 flex flex-col items-center gap-3 text-center text-lg text-gray-300 text-balance">
        {t('closing')}
        <ArrowDown className="w-5 h-5 text-teal-400" aria-hidden="true" />
      </p>
    </section>
  )
}
