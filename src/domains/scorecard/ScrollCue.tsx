'use client'

import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'
import { useScrollFade } from '@/domains/scorecard/useScrollFade'

interface ScrollCueProps {
  targetId: string
}

export const ScrollCue = ({ targetId }: ScrollCueProps) => {
  const t = useTranslations('scorecard.intro')
  const prefersReducedMotion = usePrefersReducedMotion()
  const opacity = useScrollFade(targetId)

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
      style={{ opacity }}
      tabIndex={opacity === 0 ? -1 : undefined}
      className={`${opacity === 0 ? 'pointer-events-none' : ''} group flex cursor-pointer flex-col items-center rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-teal-400`}
    >
      <span className="mb-1 text-center text-base font-medium text-gray-300">
        {t('scrollCueTitle')}
      </span>
      <span className="text-center text-xs text-gray-400">
        {t('scrollCueSubtitle')}
      </span>
      <ChevronDown
        aria-hidden="true"
        className="mt-4 w-6 h-6 text-teal-500 group-hover:text-white transition-colors duration-300 motion-safe:animate-[pulse_4s_ease-in-out_infinite]"
        strokeWidth={2}
      />
    </button>
  )
}
