'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CalendarCheck,
  Euro,
  Mail,
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
import { toneForScore, toneStyles } from '@/domains/scorecard/tones'
import { useCountUp } from '@/domains/scorecard/useCountUp'
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
  delayMs = 0,
}: {
  children: React.ReactNode
  className?: string
  delayMs?: number
}) => (
  <section
    className={`animate-rise relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8 backdrop-blur-sm ${className}`}
    style={{ animationDelay: `${delayMs}ms` }}
  >
    {children}
  </section>
)

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
    {children}
  </div>
)

export const ScorecardResults = ({
  result,
  onRestart,
}: ScorecardResultsProps) => {
  const { score, tier, pillarScores, biggestLeak, aiShare } = result
  const tone = toneStyles[tier.tone]
  const isOutrun = aiShare > score
  const hours = useCountUp(result.leakedHoursPerWeek, 1600, 900)
  const euros = useCountUp(result.leakedEurosPerMonth, 1600, 900)
  const [isRevealed, setIsRevealed] = useState(false)
  const LeakIcon = pillarIcons[biggestLeak.pillar.id]

  useEffect(() => {
    const timeout = setTimeout(() => setIsRevealed(true), 300)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="relative text-center">
        <div
          className={`pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full blur-3xl ${tone.glow}`}
        />
        <div
          className={`animate-rise inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium ${tone.badge}`}
        >
          Your AI Delivery Scorecard
        </div>
        <h1
          className={`animate-rise mt-6 text-6xl sm:text-8xl font-bold tracking-tight ${tone.text}`}
          style={{ animationDelay: '80ms' }}
        >
          {tier.name}
        </h1>
        <p
          className="animate-rise mt-4 text-2xl sm:text-3xl font-semibold text-white"
          style={{ animationDelay: '160ms' }}
        >
          {tier.headline}
        </p>
        <p
          className="animate-rise mt-4 text-lg text-gray-400 max-w-2xl mx-auto"
          style={{ animationDelay: '240ms' }}
        >
          {tier.summary}
        </p>
      </header>

      <Panel className="mt-14" delayMs={320}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8">
          <Gauge
            variant="tachometer"
            value={aiShare}
            unit="%"
            label="Engine speed"
            caption="Share of code AI writes"
            delayMs={500}
          />
          <div className="text-center md:max-w-[14rem]">
            {isOutrun ? (
              <>
                <div className="text-xl font-bold text-white">
                  Your engine is outrunning your rails
                </div>
                <p className="mt-3 text-gray-400">
                  AI writes about {aiShare}% of your code. Your delivery rails
                  score {score} out of 100. Much of the speed AI adds never
                  reaches your users.
                </p>
              </>
            ) : (
              <>
                <div className="text-xl font-bold text-white">
                  Your rails keep up with your engine
                </div>
                <p className="mt-3 text-gray-400">
                  AI writes about {aiShare}% of your code, and your rails score{' '}
                  {score} out of 100. The speed AI adds reaches your users.
                </p>
              </>
            )}
          </div>
          <Gauge
            variant="speedometer"
            value={score}
            label="Road speed"
            caption="Delivery score out of 100"
            delayMs={700}
          />
        </div>
      </Panel>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel className="lg:col-span-2" delayMs={420}>
          <Eyebrow>Your six rails</Eyebrow>
          <PillarRadar scores={pillarScores} />
        </Panel>

        <Panel className="lg:col-span-3" delayMs={500}>
          <Eyebrow>Score per rail</Eyebrow>
          <ul className="mt-6 space-y-5">
            {pillarScores.map(({ pillar, score: pillarScore }, index) => {
              const Icon = pillarIcons[pillar.id]
              const pillarTone = toneStyles[toneForScore(pillarScore)]
              const isLeak = pillar.id === biggestLeak.pillar.id
              return (
                <li key={pillar.id}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-gray-500" />
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
                      className={`h-full rounded-full bg-gradient-to-r ${pillarTone.bar}`}
                      style={{
                        width: isRevealed
                          ? `${Math.max(pillarScore, 2)}%`
                          : '0%',
                        transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${index * 90}ms`,
                      }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel className="lg:col-span-3 border-rose-500/30" delayMs={580}>
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-rose-300">
              <TriangleAlert className="w-4 h-4" />
              <Eyebrow>Your biggest leak</Eyebrow>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30">
                <LeakIcon className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {biggestLeak.pillar.name}
                </h2>
                <div className="text-gray-500">
                  Score {biggestLeak.score} / 100
                </div>
              </div>
            </div>
            <p className="mt-6 text-lg text-gray-300">
              {biggestLeak.pillar.leak}
            </p>
            <div className="mt-6 rounded-xl border border-teal-500/20 bg-teal-500/5 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-teal-300">
                <Wrench className="w-4 h-4" />
                First fix
              </div>
              <p className="mt-2 text-gray-300">{biggestLeak.pillar.fix}</p>
            </div>
          </div>
        </Panel>

        <Panel className="lg:col-span-2" delayMs={660}>
          <Eyebrow>Speed you leave on the table</Eyebrow>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                <Timer className="w-6 h-6" />
              </div>
              <div>
                <div className="text-4xl font-bold text-white tabular-nums">
                  ~{hours}h
                </div>
                <div className="text-gray-400">engineer time per week</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                <Euro className="w-6 h-6" />
              </div>
              <div>
                <div className="text-4xl font-bold text-white tabular-nums">
                  {euro.format(euros)}
                </div>
                <div className="text-gray-400">
                  per month lost to rework and waiting
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-600">
            Rough estimate for {result.teamSize} engineers at €75 per hour. The
            audit replaces it with numbers from your own Git and CI history.
          </p>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel delayMs={740}>
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className="w-4 h-4" />
            <Eyebrow>Free newsletter</Eyebrow>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">
            Get one delivery fix a week
          </h2>
          <p className="mt-2 text-gray-400">
            Short, practical posts on turning AI speed into shipped features.
            Free, on Substack.
          </p>
          <a
            href="https://jordyvanvorselen.substack.com/subscribe"
            target="_blank"
            rel="noopener noreferrer"
            className="click-feedback mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-gray-950 transition hover:bg-gray-200"
          >
            <SubstackIcon />
            Subscribe on Substack
          </a>
        </Panel>

        <Panel
          className="border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-gray-900/60 to-blue-500/10"
          delayMs={820}
        >
          <div className="absolute -left-20 -bottom-20 h-56 w-56 animate-float rounded-full bg-teal-500/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-teal-300">
              <CalendarCheck className="w-4 h-4" />
              <Eyebrow>Want real numbers?</Eyebrow>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">
              The AI Delivery Audit
            </h2>
            <p className="mt-2 text-gray-300">
              In two weeks I pull lead time, escaped defects and review load out
              of your own Git and CI history. You get a fix plan with the euro
              cost of every leak.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {['2 weeks', '€3,500 fixed', 'Findings or free'].map(item => (
                <span
                  key={item}
                  className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-200"
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              href="mailto:jordy@vanvorselen.com?subject=AI%20Delivery%20Audit"
              className="group click-feedback mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 font-bold text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-400"
            >
              Book a 20-minute call
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Panel>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-white"
        >
          <RotateCcw className="w-4 h-4" />
          Retake the scorecard
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-gray-500 transition-colors hover:text-white"
        >
          <Share2 className="w-4 h-4" />
          Share with your team
        </button>
      </div>
    </div>
  )
}
