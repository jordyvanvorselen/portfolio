'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  Euro,
  RotateCcw,
  Share2,
  ShieldCheck,
  Timer,
  TriangleAlert,
  Wrench,
} from 'lucide-react'

import { Gauge } from '@/domains/scorecard/Gauge'
import { PillarRadar } from '@/domains/scorecard/PillarRadar'
import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import {
  HEALTHY_SCORE,
  type ScorecardResult,
} from '@/domains/scorecard/scorecard.data'
import { SparkBurst } from '@/domains/scorecard/SparkBurst'
import { TierScale } from '@/domains/scorecard/TierScale'
import { toneForScore, toneStyles } from '@/domains/scorecard/tones'
import { useCountUp } from '@/domains/scorecard/useCountUp'
import { useInView } from '@/domains/scorecard/useInView'
import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'
import { Button } from '@/ui/Button'
import { SubstackIcon } from '@/ui/SubstackIcon'

interface ScorecardResultsProps {
  result: ScorecardResult
  onRestart: () => void
}

const euroFormatFor = (locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  })

const Panel = ({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) => (
  <section
    className={`relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8 ${className}`}
  >
    {children}
  </section>
)

const PanelTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white">{children}</h2>
)

const VERDICT_MS = 1000

export const ScorecardResults = ({
  result,
  onRestart,
}: ScorecardResultsProps) => {
  const { score, tier, pillarScores, biggestLeak, hasLeak, aiShare } = result
  const isNothingLost = result.leakedHoursPerWeek === 0
  const t = useTranslations('scorecard.results')
  const tScorecard = useTranslations('scorecard')
  const euro = euroFormatFor(useLocale())
  const leakName = tScorecard(`pillars.${biggestLeak.pillar.id}.name`)
  const tone = toneStyles[tier.tone]
  const isOutrun = aiShare > score
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isLinkCopied, setIsLinkCopied] = useState(false)
  const [isVerdictDone, setIsVerdictDone] = useState(false)
  const railsRef = useRef<HTMLUListElement>(null)
  const costRef = useRef<HTMLDListElement>(null)
  const isRailsInView = useInView(railsRef, 0.5)
  const isCostInView = useInView(costRef)
  const shownScore = useCountUp(score, 900, 150)
  const hours = useCountUp(result.leakedHoursPerWeek, 1200, 150, isCostInView)
  const euros = useCountUp(result.leakedEurosPerMonth, 1200, 150, isCostInView)
  const LeakIcon = pillarIcons[biggestLeak.pillar.id]

  useEffect(() => {
    const timeout = setTimeout(
      () => setIsVerdictDone(true),
      prefersReducedMotion ? 0 : VERDICT_MS
    )
    return () => clearTimeout(timeout)
  }, [prefersReducedMotion])

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: t('shareTitle'), url }).catch(() => {})
      return
    }
    await navigator.clipboard.writeText(url)
    setIsLinkCopied(true)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-lg text-gray-400">
          {t.rich('scoreLine', {
            score: () => (
              <>
                <span
                  className="font-semibold text-white tabular-nums"
                  aria-hidden="true"
                >
                  {shownScore}
                </span>
                <span className="sr-only">{score}</span>
              </>
            ),
          })}
        </p>
        <div className="relative">
          {!hasLeak && (
            <SparkBurst count={score === 100 ? 140 : 70} delayMs={1000} />
          )}
          <h1
            tabIndex={-1}
            data-autofocus
            className={`mt-2 text-6xl sm:text-7xl font-bold tracking-tight outline-none motion-safe:animate-verdict ${tone.text}`}
            style={{ textShadow: `0 0 28px ${tone.hex}59` }}
          >
            {tScorecard(`tiers.${tier.id}.name`)}
          </h1>
        </div>
        <TierScale score={score} current={tier} />
        <p className="mt-8 text-2xl sm:text-3xl font-semibold text-white text-balance">
          {tScorecard(`tiers.${tier.id}.headline`)}
        </p>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed text-pretty">
          {tScorecard(`tiers.${tier.id}.summary`)}
        </p>
      </header>

      <Panel className="mt-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8">
          <Gauge
            variant="tachometer"
            value={aiShare}
            unit="%"
            label={t('engineLabel')}
            caption={t('engineCaption')}
            delayMs={0}
            isReady={isVerdictDone}
            durationMs={900}
          />
          <div className="text-center md:max-w-[15rem]">
            <div className="text-xl font-semibold text-white">
              {isOutrun ? t('outrunTitle') : t('keepUpTitle')}
            </div>
            <p className="mt-3 text-gray-400">
              {isOutrun
                ? t('outrunBody', { aiShare, score })
                : t('keepUpBody', { aiShare, score })}
            </p>
          </div>
          <Gauge
            variant="speedometer"
            value={score}
            label={t('roadLabel')}
            caption={t('roadCaption')}
            delayMs={400}
            isReady={isVerdictDone}
            durationMs={1500}
          />
        </div>
      </Panel>

      <Panel className="mt-6">
        <PanelTitle>{t('railsTitle')}</PanelTitle>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 items-center gap-10">
          <div className="hidden sm:block lg:col-span-2">
            <PillarRadar scores={pillarScores} />
          </div>
          <ul ref={railsRef} className="lg:col-span-3 space-y-5">
            {pillarScores.map(({ pillar, score: pillarScore }, index) => {
              const Icon = pillarIcons[pillar.id]
              const isLeak = hasLeak && pillar.id === biggestLeak.pillar.id
              const pillarTone = toneStyles[toneForScore(pillarScore)]
              return (
                <li key={pillar.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Icon
                        className="w-4 h-4 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="font-medium text-gray-200">
                        {tScorecard(`pillars.${pillar.id}.name`)}
                      </span>
                      {isLeak && (
                        <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-semibold text-rose-300">
                          {t('biggestLeakBadge')}
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-bold tabular-nums ${pillarTone.text}`}
                    >
                      {pillarScore}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-800">
                    <div
                      className={`h-full w-full origin-left rounded-full bg-gradient-to-r ${pillarTone.bar}`}
                      style={{
                        transform: `scaleX(${
                          isRailsInView || prefersReducedMotion
                            ? Math.max(pillarScore, 2) / 100
                            : 0
                        })`,
                        transition: prefersReducedMotion
                          ? 'none'
                          : `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 60}ms`,
                      }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </Panel>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        {hasLeak ? (
          <Panel className="lg:col-span-3 border-rose-500/30">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-rose-300">
                <TriangleAlert className="w-4 h-4" aria-hidden="true" />
                {t('leakEyebrow')}
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30">
                  <LeakIcon className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">{leakName}</h2>
                  <p className="text-gray-400">
                    {t('leakScore', { score: biggestLeak.score })}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                {tScorecard(`pillars.${biggestLeak.pillar.id}.leak`)}
              </p>
              <div className="mt-6 rounded-xl border border-teal-500/20 bg-teal-500/5 p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-teal-300">
                  <Wrench className="w-4 h-4" aria-hidden="true" />
                  {t('firstFix')}
                </h3>
                <p className="mt-2 text-gray-300 leading-relaxed">
                  {tScorecard(`pillars.${biggestLeak.pillar.id}.fix`)}
                </p>
              </div>
            </div>
          </Panel>
        ) : (
          <Panel className="lg:col-span-3 border-teal-400/40">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-teal-300">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              {t('healthyEyebrow')}
            </div>
            <h2 className="mt-4 text-3xl font-bold text-white">
              {score === 100 ? t('perfectTitle') : t('holdTitle')}
            </h2>
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">
              {score === 100
                ? t('perfectBody')
                : t('holdBody', {
                    healthy: HEALTHY_SCORE,
                    name: leakName,
                    score: biggestLeak.score,
                  })}
            </p>
            <div className="mt-6 rounded-xl border border-teal-500/20 bg-teal-500/5 p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-teal-300">
                <Wrench className="w-4 h-4" aria-hidden="true" />
                {t('keepTitle')}
              </h3>
              <p className="mt-2 text-gray-300 leading-relaxed">
                {t('keepBody')}
              </p>
            </div>
          </Panel>
        )}

        <Panel className="lg:col-span-2">
          <PanelTitle>
            {isNothingLost ? t('costTitleNothingLost') : t('costTitle')}
          </PanelTitle>
          <dl ref={costRef} className="mt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isNothingLost ? 'bg-teal-500/10 text-teal-300' : 'bg-amber-500/10 text-amber-300'}`}
              >
                <Timer className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <dt className="sr-only">{t('hoursTerm')}</dt>
                <dd
                  className={`text-4xl font-bold tabular-nums ${isNothingLost ? 'text-teal-300' : 'text-white'}`}
                >
                  {t('hoursValue', { hours })}
                </dd>
                <dd className="text-gray-400">{t('hoursLabel')}</dd>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isNothingLost ? 'bg-teal-500/10 text-teal-300' : 'bg-amber-500/10 text-amber-300'}`}
              >
                <Euro className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <dt className="sr-only">{t('costTerm')}</dt>
                <dd
                  className={`text-4xl font-bold tabular-nums ${isNothingLost ? 'text-teal-300' : 'text-white'}`}
                >
                  {euro.format(euros)}
                </dd>
                <dd className="text-gray-400">{t('costLabel')}</dd>
              </div>
            </div>
          </dl>
          <p className="mt-6 text-sm text-gray-400">
            {t('costNote', { teamSize: result.teamSize })}
          </p>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel className="flex flex-col border-teal-400/30">
          <PanelTitle>{t('auditTitle')}</PanelTitle>
          <p className="mt-3 text-gray-300 leading-relaxed">{t('auditBody')}</p>
          <p className="mt-3 mb-6 text-gray-300 leading-relaxed">
            {t('auditPlan')}
          </p>
          <Button
            href={`mailto:jordy@vanvorselen.com?subject=${encodeURIComponent(t('auditMailSubject'))}`}
            size="lg"
            className="group mt-auto gap-2 self-start border-2 border-transparent"
          >
            {t('auditCta')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Panel>

        <Panel className="flex flex-col">
          <PanelTitle>{t('newsletterTitle')}</PanelTitle>
          <p className="mt-3 text-gray-300 leading-relaxed">
            {t('newsletterBody')}
          </p>
          <p className="mt-3 mb-6 text-gray-300 leading-relaxed">
            {t('newsletterPitch')}
          </p>
          <Button
            href="https://jordyvanvorselen.substack.com/subscribe"
            size="lg"
            color="secondary"
            className="mt-auto gap-2 self-start"
          >
            <SubstackIcon />
            {t('newsletterCta')}
          </Button>
        </Panel>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-teal-400"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          {t('restart')}
        </button>
        <button
          type="button"
          onClick={share}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-teal-400"
        >
          {isLinkCopied ? (
            <Check className="w-4 h-4 text-teal-400" aria-hidden="true" />
          ) : (
            <Share2 className="w-4 h-4" aria-hidden="true" />
          )}
          <span aria-live="polite">
            {isLinkCopied ? t('linkCopied') : t('share')}
          </span>
        </button>
      </div>
    </div>
  )
}
