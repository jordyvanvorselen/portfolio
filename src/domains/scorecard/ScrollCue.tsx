'use client'

import type { Ref } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ScrollCueProps {
  ref: Ref<HTMLButtonElement>
  onClick: () => void
}

export const ScrollCue = ({ ref, onClick }: ScrollCueProps) => {
  const t = useTranslations('scorecard.intro')

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer flex-col items-center rounded-lg px-4 py-2 focus-visible:outline-2 focus-visible:outline-teal-400"
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
