import { ChevronDown } from 'lucide-react'

export const ScrollIndicator = () => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer group">
      <div className="text-center mb-4">
        <p className="text-sm md:text-base text-[#cbd5e1] font-medium mb-1 group-hover:text-white transition-colors duration-300">
          Discover My Core Expertise
        </p>
        <p className="text-xs text-[#cbd5e1]/70 group-hover:text-[#cbd5e1] transition-colors duration-300">
          Explore the skills I master
        </p>
      </div>
      <div className="w-12 h-12 border-2 border-[#14b8a6]/60 rounded-full flex items-center justify-center backdrop-blur-sm bg-[#0f172a]/20 shadow-lg shadow-[#14b8a6]/20 group-hover:bg-[#14b8a6]/20 group-hover:border-[#14b8a6] group-hover:shadow-[#14b8a6]/40 transition-all duration-300 mx-auto">
        <ChevronDown
          data-testid="chevron-down-icon"
          className="w-6 h-6 text-[#14b8a6] group-hover:text-white transition-colors duration-300 animate-[pulse_2s_ease-in-out_infinite]"
          strokeWidth={2}
        />
      </div>
    </div>
  )
}
