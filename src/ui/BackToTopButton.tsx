'use client'

import { ArrowUp } from 'lucide-react'

export interface BackToTopButtonProps {
  onClick?: () => void
}

export const BackToTopButton = ({ onClick }: BackToTopButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center transition-colors duration-200 cursor-pointer text-[#cbd5e1] hover:text-white h-8 px-3 text-xs hover:bg-accent rounded-md"
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4 mr-1" />
      Back to top
    </button>
  )
}
