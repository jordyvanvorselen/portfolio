import { ArrowRight, Clock, Lock, Sparkles } from 'lucide-react'

import { pillarIcons } from '@/domains/scorecard/pillarIcons'
import { pillars } from '@/domains/scorecard/scorecard.data'

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
      <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm font-medium text-teal-300">
        <Sparkles className="w-4 h-4" />
        AI Delivery Scorecard
      </div>

      <h1
        className="animate-rise mt-8 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]"
        style={{ animationDelay: '80ms' }}
      >
        AI made your team faster. How much faster{' '}
        <span className="bg-gradient-to-r from-teal-300 via-teal-400 to-blue-400 bg-clip-text text-transparent">
          could it be
        </span>
        ?
      </h1>

      <p
        className="animate-rise mt-8 text-lg sm:text-xl lg:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto"
        style={{ animationDelay: '160ms' }}
      >
        Most AI-native teams ship faster than a year ago. Most also lose a big
        part of the gain to review queues, rework and slipped releases. Score
        the six rails that decide how much of AI’s speed reaches your users.
      </p>

      <div
        className="animate-rise mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        style={{ animationDelay: '240ms' }}
      >
        <button
          type="button"
          onClick={onStart}
          className="group click-feedback inline-flex items-center gap-3 rounded-xl bg-teal-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:bg-teal-400 hover:shadow-teal-400/40"
        >
          Start the scorecard
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          type="button"
          onClick={onPreview}
          className="click-feedback inline-flex items-center gap-2 rounded-xl border-2 border-gray-500/30 bg-slate-900/15 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-gray-400/50"
        >
          See a sample report
        </button>
      </div>

      <div
        className="animate-rise mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500"
        style={{ animationDelay: '320ms' }}
      >
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-4 h-4" /> 14 questions · 3 minutes
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="w-4 h-4" /> Results on screen, no email needed
        </span>
      </div>
    </div>

    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {pillars.map((pillar, index) => {
        const Icon = pillarIcons[pillar.id]
        return (
          <div
            key={pillar.id}
            className="animate-rise group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-gray-700 hover:scale-[1.02]"
            style={{ animationDelay: `${400 + index * 70}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  Rail {index + 1}
                </div>
                <div className="mt-1 text-lg font-bold text-white">
                  {pillar.name}
                </div>
                <div className="mt-1 text-gray-400">{pillar.tagline}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-800 bg-gray-800">
      {evidence.map(({ value, label, source }) => (
        <div key={label} className="bg-gray-950 p-8 text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="mt-2 text-gray-400">{label}</div>
          <div className="mt-1 text-xs uppercase tracking-widest text-gray-600">
            {source}
          </div>
        </div>
      ))}
    </div>
  </div>
)
