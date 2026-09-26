import { ArrowRight } from 'lucide-react'

import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import { pillars } from '@/domains/scorecard/scorecard.data'
import { Button } from '@/ui/Button'

interface ScorecardIntroProps {
  onStart: () => void
  onPreview: () => void
}

const evidence = [
  {
    value: '+441%',
    label: 'PR review time on teams with high AI adoption',
    source: 'Faros AI, 22,000 developers',
  },
  {
    value: '−7.2%',
    label: 'delivery stability for every 25% more AI adoption',
    source: 'DORA 2024',
  },
]

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

    <div className="mt-28 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          The six rails
        </h2>
        <p className="mt-4 text-gray-400 leading-relaxed">
          AI makes code cheap. These six decide whether that code reaches users
          fast, or waits in queues and comes back as rework.
        </p>
      </div>

      <dl className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
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
                <dd className="mt-1 text-gray-400">{pillar.tagline}</dd>
              </div>
            </div>
          )
        })}
      </dl>
    </div>

    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-800 bg-gray-800">
      {evidence.map(({ value, label, source }) => (
        <figure key={label} className="bg-gray-950 px-8 py-10">
          <div className="text-4xl font-bold text-white tabular-nums">
            {value}
          </div>
          <div className="mt-2 text-gray-300">{label}</div>
          <figcaption className="mt-1 text-sm text-gray-400">
            {source}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
)
