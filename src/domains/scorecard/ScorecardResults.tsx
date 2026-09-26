'use client'

import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  Euro,
  RotateCcw,
  Share2,
  Timer,
  TriangleAlert,
  Wrench,
} from 'lucide-react'

import { Gauge } from '@/domains/scorecard/Gauge'
import { PillarRadar } from '@/domains/scorecard/PillarRadar'
import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import type { ScorecardResult } from '@/domains/scorecard/scorecard.data'
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

const euro = new Intl.NumberFormat('en-IE', {
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
  const { score, tier, pillarScores, biggestLeak, aiShare } = result
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
      await navigator
        .share({ title: 'AI Delivery Scorecard', url })
        .catch(() => {})
      return
    }
    await navigator.clipboard.writeText(url)
    setIsLinkCopied(true)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-lg text-gray-400">
          Your delivery scores{' '}
          <span
            className="font-semibold text-white tabular-nums"
            aria-hidden="true"
          >
            {shownScore}
          </span>
          <span className="sr-only">{score}</span> out of 100:
        </p>
        <h1
          tabIndex={-1}
          data-autofocus
          className={`mt-2 text-6xl sm:text-7xl font-bold tracking-tight outline-none motion-safe:animate-verdict ${tone.text}`}
          style={{ textShadow: `0 0 28px ${tone.hex}59` }}
        >
          {tier.name}
        </h1>
        <TierScale score={score} current={tier} />
        <p className="mt-8 text-2xl sm:text-3xl font-semibold text-white text-balance">
          {tier.headline}
        </p>
        <p className="mt-4 text-lg text-gray-400 leading-relaxed text-pretty">
          {tier.summary}
        </p>
      </header>

      <Panel className="mt-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8">
          <Gauge
            variant="tachometer"
            value={aiShare}
            unit="%"
            label="Engine speed"
            caption="Share of code AI writes"
            delayMs={0}
            isReady={isVerdictDone}
            durationMs={900}
          />
          <div className="text-center md:max-w-[15rem]">
            <div className="text-xl font-semibold text-white">
              {isOutrun
                ? 'Your engine is outrunning your rails'
                : 'Your rails keep up with your engine'}
            </div>
            <p className="mt-3 text-gray-400">
              {isOutrun
                ? `AI writes about ${aiShare}% of your code. Your delivery rails score ${score} out of 100. Much of the speed AI adds never reaches your users.`
                : `AI writes about ${aiShare}% of your code, and your rails score ${score} out of 100. The speed AI adds reaches your users.`}
            </p>
          </div>
          <Gauge
            variant="speedometer"
            value={score}
            label="Road speed"
            caption="Delivery score out of 100"
            delayMs={400}
            isReady={isVerdictDone}
            durationMs={1500}
          />
        </div>
      </Panel>

      <Panel className="mt-6">
        <PanelTitle>Your six rails</PanelTitle>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 items-center gap-10">
          <div className="hidden sm:block lg:col-span-2">
            <PillarRadar scores={pillarScores} />
          </div>
          <ul ref={railsRef} className="lg:col-span-3 space-y-5">
            {pillarScores.map(({ pillar, score: pillarScore }, index) => {
              const Icon = pillarIcons[pillar.id]
              const isLeak = pillar.id === biggestLeak.pillar.id
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
                        {pillar.name}
                      </span>
                      {isLeak && (
                        <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-xs font-semibold text-rose-300">
                          Biggest leak
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
        <Panel className="lg:col-span-3 border-rose-500/30">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-rose-300">
              <TriangleAlert className="w-4 h-4" aria-hidden="true" />
              Your biggest leak
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30">
                <LeakIcon className="w-7 h-7" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {biggestLeak.pillar.name}
                </h2>
                <p className="text-gray-400">
                  Score {biggestLeak.score} out of 100
                </p>
              </div>
            </div>
            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
              {biggestLeak.pillar.leak}
            </p>
            <div className="mt-6 rounded-xl border border-teal-500/20 bg-teal-500/5 p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-teal-300">
                <Wrench className="w-4 h-4" aria-hidden="true" />
                First fix
              </h3>
              <p className="mt-2 text-gray-300 leading-relaxed">
                {biggestLeak.pillar.fix}
              </p>
            </div>
          </div>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelTitle>Speed you leave on the table</PanelTitle>
          <dl ref={costRef} className="mt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                <Timer className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <dt className="sr-only">Engineer time lost</dt>
                <dd className="text-4xl font-bold text-white tabular-nums">
                  ~{hours}h
                </dd>
                <dd className="text-gray-400">of engineer time a week</dd>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                <Euro className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <dt className="sr-only">Cost</dt>
                <dd className="text-4xl font-bold text-white tabular-nums">
                  {euro.format(euros)}
                </dd>
                <dd className="text-gray-400">
                  a month, lost to rework and waiting
                </dd>
              </div>
            </div>
          </dl>
          <p className="mt-6 text-sm text-gray-400">
            Rough estimate for {result.teamSize} engineers at €75 an hour. The
            audit replaces it with numbers from your own Git and CI history.
          </p>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel className="flex flex-col border-teal-400/30">
          <PanelTitle>Want the real numbers?</PanelTitle>
          <p className="mt-3 text-gray-300 leading-relaxed">
            The AI Delivery Audit measures lead time, escaped defects and review
            load in your own Git and CI history.
          </p>
          <p className="mt-3 mb-6 text-gray-300 leading-relaxed">
            You get clear insight into where your speed leaks, and a full plan
            with actionable steps to fix it, based on those measurements.
          </p>
          <Button
            href="mailto:jordy@vanvorselen.com?subject=AI%20Delivery%20Audit"
            size="lg"
            className="group mt-auto gap-2 self-start border-2 border-transparent"
          >
            Book a 30-minute call
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Panel>

        <Panel className="flex flex-col">
          <PanelTitle>Get one delivery fix a week</PanelTitle>
          <p className="mt-3 text-gray-300 leading-relaxed">
            Short, practical posts on turning AI speed into shipped features.
            Free, on Substack.
          </p>
          <p className="mt-3 mb-6 text-gray-300 leading-relaxed">
            Each post takes one leak, like slow reviews or tests that catch
            nothing, and shows a fix your team can try the same week.
          </p>
          <Button
            href="https://jordyvanvorselen.substack.com/subscribe"
            size="lg"
            color="secondary"
            className="mt-auto gap-2 self-start"
          >
            <SubstackIcon />
            Subscribe on Substack
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
          Retake the scorecard
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
            {isLinkCopied ? 'Link copied' : 'Share the scorecard'}
          </span>
        </button>
      </div>
    </div>
  )
}
