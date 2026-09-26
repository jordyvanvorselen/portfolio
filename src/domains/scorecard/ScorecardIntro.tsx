import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react'

import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import { pillars } from '@/domains/scorecard/scorecard.data'
import { Symptoms } from '@/domains/scorecard/Symptoms'
import { Button } from '@/ui/Button'

interface ScorecardIntroProps {
  onStart: () => void
  onPreview: () => void
}

export const ScorecardIntro = ({ onStart, onPreview }: ScorecardIntroProps) => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-4xl mx-auto">
      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] text-balance">
        AI made your team faster.{' '}
        <span className="sm:block text-teal-300">
          How much faster could it be?
        </span>
      </h1>

      <p className="mt-8 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto text-pretty">
        Most AI-native teams ship faster than a year ago. Most also lose a big
        part of the gain to review queues, rework and slipped releases. Score
        the six rails that decide how much of AI’s speed reaches your users.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          type="button"
          size="lg"
          onClick={onStart}
          className="group gap-2"
        >
          Start the scorecard
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <Button type="button" size="lg" color="secondary" onClick={onPreview}>
          See a sample report
        </Button>
      </div>

      <p className="mt-5 text-sm text-gray-400">
        14 questions · 3 minutes · Results on screen, no email needed
      </p>
    </div>

    <Symptoms />

    <div className="mt-28 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          The six rails
        </h2>
        <p className="mt-4 text-gray-400 leading-relaxed">
          AI makes code cheap. These six decide whether that code reaches users
          fast, or waits in queues and comes back as rework.
        </p>
        <p className="mt-6 flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
          <BookOpen
            className="mt-0.5 w-4 h-4 shrink-0 text-teal-400"
            aria-hidden="true"
          />
          Every rail is backed by published research from DORA, Google and Faros
          AI.
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
                <dt className="font-semibold text-white">{pillar.name}</dt>
                <dd className="mt-1 text-gray-300">{pillar.tagline}</dd>
                <dd className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {pillar.evidence.finding}
                  <a
                    href={pillar.evidence.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex w-fit items-center gap-1 text-teal-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-teal-400"
                  >
                    {pillar.evidence.source}
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
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
        Which rail leaks the most speed on your team?
      </h2>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto text-pretty">
        Find out in 3 minutes. You get your score per rail, your biggest leak
        and the first fix to try.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          type="button"
          size="lg"
          onClick={onStart}
          className="group gap-2"
        >
          Start the scorecard
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        </Button>
        <Button type="button" size="lg" color="secondary" onClick={onPreview}>
          See a sample report
        </Button>
      </div>
    </section>
  </div>
)
