import type { Tier } from '@/domains/scorecard/scorecard.data'

export type Tone = Tier['tone']

export const toneStyles: Record<Tone, { text: string; bar: string }> = {
  brand: { text: 'text-teal-300', bar: 'bg-teal-400' },
  warning: { text: 'text-amber-300', bar: 'bg-amber-400' },
}
