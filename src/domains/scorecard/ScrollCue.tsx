'use client'

import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'

interface ScrollCueProps {
  targetId: string
}

export const ScrollCue = ({ targetId }: ScrollCueProps) => {
  const t = useTranslations('scorecard.intro')
  const prefersReducedMotion = usePrefersReducedMotion()

  const scrollToTarget = () => {
    document.getElementById(targetId)!.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTarget}
      className="group flex flex-col items-center rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-teal-400"
    >
      <span className="text-sm text-gray-500 transition-colors group-hover:text-gray-300">
        {t('scrollCueTitle')}
      </span>
      <ChevronDown
        aria-hidden="true"
        className="mt-2 w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors duration-300 motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
        strokeWidth={2}
      />
    </button>
  )
}
