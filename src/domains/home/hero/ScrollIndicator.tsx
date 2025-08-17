'use client'

import { ChevronDown } from 'lucide-react'
import { Text } from '@/ui/Text'

export const ScrollIndicator = () => {
  const handleScrollToExpertise = () => {
    const expertiseSection = document.getElementById('expertise-section')
    if (expertiseSection) {
      const headerHeight = 64 // 4rem = 64px (--header-height)
      const elementPosition = expertiseSection.offsetTop - headerHeight

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      data-testid="scroll-indicator"
      onClick={handleScrollToExpertise}
      className="cursor-pointer group flex flex-col items-center"
    >
      <div className="text-center mb-4">
        <Text variant="scroll-indicator-main" className="font-medium mb-1">
          Discover My Core Expertise
        </Text>
        <Text variant="scroll-indicator-subtitle">
          Explore the skills I master
        </Text>
      </div>
      <ChevronDown
        data-testid="chevron-down-icon"
        className="w-6 h-6 text-teal-500 group-hover:text-white transition-colors duration-300 animate-[pulse_4s_ease-in-out_infinite] mx-auto"
        strokeWidth={2}
      />
    </div>
  )
}
