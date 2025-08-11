'use client'

import { ChevronDown } from 'lucide-react'

export const ScrollIndicator = () => {
  const handleScrollToExpertise = () => {
    const expertiseSection = document.getElementById('expertise-section')
    if (expertiseSection) {
      expertiseSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
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
        <p className="text-sm md:text-base text-[#cbd5e1] font-medium mb-1 group-hover:text-white transition-colors duration-300">
          Discover My Core Expertise
        </p>
        <p className="text-xs text-[#cbd5e1]/70 group-hover:text-[#cbd5e1] transition-colors duration-300">
          Explore the skills I master
        </p>
      </div>
      <ChevronDown
        data-testid="chevron-down-icon"
        className="w-6 h-6 text-[#14b8a6] group-hover:text-white transition-colors duration-300 animate-[pulse_4s_ease-in-out_infinite] mx-auto"
        strokeWidth={2}
      />
    </div>
  )
}
