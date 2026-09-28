'use client'

import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

import { QuoteMark } from '@/domains/scorecard/QuoteMark'
import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import { pillars } from '@/domains/scorecard/scorecard.data'
import { ScorecardHero } from '@/domains/scorecard/ScorecardHero'
import { ScrollCue } from '@/domains/scorecard/ScrollCue'
import { MaskedRise } from '@/domains/scorecard/MaskedRise'
import { useInView } from '@/domains/scorecard/useInView'
import { useScrollCrunch } from '@/domains/scorecard/useScrollCrunch'
import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'
import { Button } from '@/ui/Button'

interface ScorecardIntroProps {
  onStart: () => void
  onPreview: () => void
}

export const ScorecardIntro = ({ onStart, onPreview }: ScorecardIntroProps) => {
  const t = useTranslations('scorecard')
  const heroRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLButtonElement>(null)
  const bottlenecksRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const bottleneckListRef = useRef<HTMLDListElement>(null)
  const closingCtaRef = useRef<HTMLElement>(null)
  const areBottlenecksLit =
    useInView(bottleneckListRef, 0.3) || prefersReducedMotion
  const isClosingCtaShown =
    useInView(closingCtaRef, 0.5) || prefersReducedMotion
  const scrollToBottlenecks = useScrollCrunch(
    { heroRef, cueRef, targetRef: bottlenecksRef },
    !prefersReducedMotion
  )
  const fadeIn = (delayMs: number) => ({
    className: `transition-opacity duration-500 ${isClosingCtaShown ? 'opacity-100' : 'opacity-0'}`,
    style: { transitionDelay: `${delayMs}ms` },
  })

  return (
    <>
      <div className="content-section-min mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="flex flex-1 flex-col justify-center py-8">
          <div ref={heroRef}>
            <ScorecardHero onStart={onStart} onPreview={onPreview} />
          </div>
        </div>
        <div className="flex justify-center pb-8">
          <ScrollCue ref={cueRef} onClick={scrollToBottlenecks} />
        </div>
      </div>

      <div
        id="bottlenecks"
        ref={bottlenecksRef}
        className="scroll-mt-16 [overflow-anchor:none]"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <MaskedRise isShown={areBottlenecksLit}>
                {t('intro.bottlenecksTitle')}
              </MaskedRise>
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              {t('intro.bottlenecksBody')}
            </p>
            <p className="mt-6 flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
              <BookOpen
                className="mt-0.5 w-4 h-4 shrink-0 text-teal-400"
                aria-hidden="true"
              />
              {t('intro.bottlenecksEvidence')}
            </p>
            <figure className="mt-10 border-t border-gray-800 pt-6">
              <QuoteMark className="h-4 w-auto fill-teal-300" />
              <blockquote className="mt-3 text-base font-medium leading-relaxed text-gray-200 text-pretty">
                {t('intro.quote')}
              </blockquote>
            </figure>
          </div>

          <dl
            ref={bottleneckListRef}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 content-start gap-x-10"
          >
            {pillars.map((pillar, index) => {
              const Icon = pillarIcons[pillar.id]
              return (
                <div
                  key={pillar.id}
                  className="flex gap-4 border-t border-gray-800 py-6"
                >
                  <Icon
                    className={`mt-1 w-5 h-5 shrink-0 transition-colors duration-500 ${
                      areBottlenecksLit ? 'text-teal-400' : 'text-gray-700'
                    }`}
                    style={{ transitionDelay: `${index * 90}ms` }}
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
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24 [overflow-anchor:none]">
        <section
          ref={closingCtaRef}
          className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-gray-900/60 to-blue-500/10 px-6 py-14 text-center sm:px-12"
          aria-labelledby="closing-cta-heading"
        >
          <h2
            id="closing-cta-heading"
            className="text-3xl sm:text-4xl font-bold text-white text-balance"
          >
            <MaskedRise isShown={isClosingCtaShown} className="pb-1">
              {t('intro.closingTitle')}
            </MaskedRise>
          </h2>
          <p
            style={fadeIn(350).style}
            className={`mt-4 text-lg text-gray-300 max-w-2xl mx-auto text-pretty ${fadeIn(350).className}`}
          >
            {t('intro.closingBody')}
          </p>
          <div
            style={fadeIn(600).style}
            className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center ${fadeIn(600).className}`}
          >
            <Button
              type="button"
              size="lg"
              onClick={onStart}
              className="group gap-2"
            >
              {t('intro.start')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              type="button"
              size="lg"
              color="secondary"
              onClick={onPreview}
            >
              {t('intro.sample')}
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}
