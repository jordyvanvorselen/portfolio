import type { Tier } from '@/domains/scorecard/scorecard.data'

export type Tone = Tier['tone']

export const toneStyles: Record<
  Tone,
  { text: string; bar: string; badge: string; glow: string; hex: string }
> = {
  rose: {
    text: 'text-rose-400',
    bar: 'from-rose-500 to-rose-400',
    badge: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    glow: 'bg-rose-500/20',
    hex: '#fb7185',
  },
  amber: {
    text: 'text-amber-400',
    bar: 'from-amber-500 to-amber-300',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    glow: 'bg-amber-500/20',
    hex: '#fbbf24',
  },
  blue: {
    text: 'text-blue-400',
    bar: 'from-blue-500 to-blue-300',
    badge: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    glow: 'bg-blue-500/20',
    hex: '#60a5fa',
  },
  teal: {
    text: 'text-teal-400',
    bar: 'from-teal-500 to-teal-300',
    badge: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    glow: 'bg-teal-500/20',
    hex: '#2dd4bf',
  },
}

export const toneForScore = (score: number): Tone => {
  if (score >= 80) return 'teal'
  if (score >= 60) return 'blue'
  if (score >= 40) return 'amber'
  return 'rose'
}
