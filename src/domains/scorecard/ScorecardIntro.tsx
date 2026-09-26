'use client'

import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import { pillars } from '@/domains/scorecard/scorecard.data'
import { Symptoms } from '@/domains/scorecard/Symptoms'
import { Button } from '@/ui/Button'

interface ScorecardIntroProps {
  onStart: () => void
  onPreview: () => void
}

export const ScorecardIntro = ({ onStart, onPreview }: ScorecardIntroProps) => {
  const t = useTranslations('scorecard')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] text-balance">
          {t('intro.titleLead')}{' '}
          <span className="sm:block text-teal-300">
            {t('intro.titleAccent')}
          </span>
        </h1>

        <p className="mt-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto text-pretty">
          {t('intro.body')}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            type="button"
            size="lg"
            onClick={onStart}
            className="group gap-2"
          >
            {t('intro.start')}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button type="button" size="lg" color="secondary" onClick={onPreview}>
            {t('intro.sample')}
          </Button>
        </div>

        <p className="mt-5 text-sm text-gray-400">{t('intro.facts')}</p>
      </div>

      <Symptoms />

      <div className="mt-28 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {t('intro.railsTitle')}
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            {t('intro.railsBody')}
          </p>
          <p className="mt-6 flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
            <BookOpen
              className="mt-0.5 w-4 h-4 shrink-0 text-teal-400"
              aria-hidden="true"
            />
            {t('intro.railsEvidence')}
          </p>
        </div>

        <dl className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 content-start gap-x-10">
          {pillars.map(pillar => {
            const Icon = pillarIcons[pillar.id]
            return (
              <div
                key={pillar.id}
                className="flex gap-4 border-t border-gray-800 py-6"
              >
                <Icon
                  className="mt-1 w-5 h-5 shrink-0 text-teal-400"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-semibold text-white">
                    {t(`pillars.${pillar.id}.name`)}
                  </dt>
                  <dd className="mt-1 text-gray-300">
                    {t(`pillars.${pillar.id}.tagline`)}
                  </dd>
                  <dd className="mt-3 text-sm text-gray-400 leading-relaxed">
                    {t(`pillars.${pillar.id}.finding`)}
                    <a
                      href={pillar.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex w-fit items-center gap-1 text-teal-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-teal-400"
                    >
                      {t(`pillars.${pillar.id}.source`)}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      <span className="sr-only">
                        {t('intro.opensInNewTab')}
                      </span>
                    </a>
                  </dd>
                </div>
              </div>
            )
          })}
        </dl>
      </div>

      <section
        className="mt-24 rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-gray-900/60 to-blue-500/10 px-6 py-14 text-center sm:px-12"
        aria-labelledby="closing-cta-heading"
      >
        <h2
          id="closing-cta-heading"
          className="text-3xl sm:text-4xl font-bold text-white text-balance"
        >
          {t('intro.closingTitle')}
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto text-pretty">
          {t('intro.closingBody')}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            type="button"
            size="lg"
            onClick={onStart}
            className="group gap-2"
          >
            {t('intro.start')}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button type="button" size="lg" color="secondary" onClick={onPreview}>
            {t('intro.sample')}
          </Button>
        </div>
      </section>
    </div>
  )
}
