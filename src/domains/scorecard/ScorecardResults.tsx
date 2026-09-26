'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, RotateCcw, Share2 } from 'lucide-react'

import { Gauge } from '@/domains/scorecard/Gauge'
import { PillarRadar } from '@/domains/scorecard/PillarRadar'
import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import type { ScorecardResult } from '@/domains/scorecard/scorecard.data'
import { toneStyles } from '@/domains/scorecard/tones'
import { useCountUp } from '@/domains/scorecard/useCountUp'
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
  delayMs = 0,
}: {
  children: React.ReactNode
  className?: string
  delayMs?: number
}) => (
  <section
    className={`animate-rise rounded-2xl border border-gray-800 bg-gray-900/50 p-6 sm:p-8 ${className}`}
    style={{ animationDelay: `${delayMs}ms` }}
  >
    {children}
  </section>
)

const PanelTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white">{children}</h2>
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
      <header className="text-center max-w-3xl mx-auto">
        <p className="animate-rise text-lg text-gray-400">
          Your delivery scores {score} out of 100:
        </p>
        <h1
          className={`animate-rise mt-2 text-6xl sm:text-7xl font-bold tracking-tight ${tone.text}`}
          style={{ animationDelay: '80ms' }}
        >
          {tier.name}
        </h1>
        <p
          className="animate-rise mt-6 text-2xl sm:text-3xl font-semibold text-white text-balance"
          style={{ animationDelay: '160ms' }}
        >
          {tier.headline}
        </p>
        <p
          className="animate-rise mt-4 text-lg text-gray-400 leading-relaxed text-pretty"
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
            delayMs={700}
          />
        </div>
      </Panel>

      <Panel className="mt-6" delayMs={420}>
        <PanelTitle>Your six rails</PanelTitle>
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 items-center gap-10">
          <div className="lg:col-span-2">
            <PillarRadar scores={pillarScores} />
          </div>
          <ul className="lg:col-span-3 space-y-5">
            {pillarScores.map(({ pillar, score: pillarScore }, index) => {
              const Icon = pillarIcons[pillar.id]
              const isLeak = pillar.id === biggestLeak.pillar.id
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
                        <span className="text-sm text-amber-300">
                          Biggest leak
                        </span>
                      )}
                    </div>
                    <span className="font-semibold tabular-nums text-gray-200">
                      {pillarScore}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-800">
                    <div
                      className={`h-full rounded-full ${isLeak ? 'bg-amber-400' : 'bg-teal-400'}`}
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
        </div>
      </Panel>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Panel className="lg:col-span-3 border-amber-400/30" delayMs={500}>
          <div className="flex items-start gap-4">
            <LeakIcon
              className="mt-1 w-6 h-6 shrink-0 text-amber-300"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Your biggest leak: {biggestLeak.pillar.name}
              </h2>
              <p className="mt-1 text-gray-400">
                Score {biggestLeak.score} out of 100
              </p>
            </div>
          </div>
          <p className="mt-6 text-lg text-gray-300 leading-relaxed">
            {biggestLeak.pillar.leak}
          </p>
          <div className="mt-6 border-t border-gray-800 pt-6">
            <h3 className="font-semibold text-teal-300">First fix</h3>
            <p className="mt-2 text-gray-300 leading-relaxed">
              {biggestLeak.pillar.fix}
            </p>
          </div>
        </Panel>

        <Panel className="lg:col-span-2" delayMs={580}>
          <PanelTitle>Speed you leave on the table</PanelTitle>
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="sr-only">Engineer time lost</dt>
              <dd className="text-4xl font-bold text-white tabular-nums">
                ~{hours} hours
              </dd>
              <dd className="mt-1 text-gray-400">of engineer time a week</dd>
            </div>
            <div>
              <dt className="sr-only">Cost</dt>
              <dd className="text-4xl font-bold text-white tabular-nums">
                {euro.format(euros)}
              </dd>
              <dd className="mt-1 text-gray-400">
                a month, lost to rework and waiting
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-gray-400">
            Rough estimate for {result.teamSize} engineers at €75 an hour. The
            audit replaces it with numbers from your own Git and CI history.
          </p>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel className="border-teal-400/30" delayMs={660}>
          <PanelTitle>Want the real numbers?</PanelTitle>
          <p className="mt-3 text-gray-300 leading-relaxed">
            The AI Delivery Audit pulls lead time, escaped defects and review
            load out of your own Git and CI history. You get a fix plan with the
            euro cost of every leak.
          </p>
          <p className="mt-4 text-sm text-gray-400">
            2 weeks · €3,500 fixed · Free if it finds no leak worth fixing
          </p>
          <Button
            href="mailto:jordy@vanvorselen.com?subject=AI%20Delivery%20Audit"
            size="lg"
            className="group mt-6 gap-2"
          >
            Book a 20-minute call
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Panel>

        <Panel delayMs={740}>
          <PanelTitle>Get one delivery fix a week</PanelTitle>
          <p className="mt-3 text-gray-300 leading-relaxed">
            Short, practical posts on turning AI speed into shipped features.
            Free, on Substack.
          </p>
          <Button
            href="https://jordyvanvorselen.substack.com/subscribe"
            size="lg"
            color="secondary"
            className="mt-6 gap-2"
          >
            <SubstackIcon />
            Subscribe on Substack
          </Button>
        </Panel>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <RotateCcw className="w-4 h-4" />
          Retake the scorecard
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <Share2 className="w-4 h-4" />
          Share with your team
        </button>
      </div>
    </div>
  )
}
