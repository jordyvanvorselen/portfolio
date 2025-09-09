'use client'

import { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

import { Card } from '@/ui/Card'
import { useAccordion } from '@/ui/Accordion'

export interface AccordionItemProps {
  index: number
  trigger: ReactNode
  children: ReactNode
  ariaLabel?: string
  className?: string
}

export const AccordionItem = ({
  index,
  trigger,
  children,
  ariaLabel,
  className = '',
}: AccordionItemProps) => {
  const { openIndex, setOpenIndex } = useAccordion()
  const isOpen = openIndex === index

  const handleToggle = () => {
    setOpenIndex(isOpen ? null : index)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <div
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className="cursor-pointer space-x-4 active:bg-transparent focus:outline-none"
      aria-expanded={isOpen}
      role="button"
      tabIndex={0}
    >
      <Card
        {...(ariaLabel && { 'aria-label': ariaLabel })}
        className={`[&>div:last-child]:p-5 ${className}`}
        hoverZoom={false}
      >
        <div className="flex justify-between items-start px-2 gap-4">
          <div className="flex-1">{trigger}</div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-all duration-300 flex-shrink-0 mt-1 hover:text-teal-400 ${
              isOpen ? 'rotate-180 text-teal-400' : ''
            }`}
          />
        </div>

        {isOpen && (
          <div className="mt-3 pt-3 border-t border-gray-700/50">
            {children}
          </div>
        )}
      </Card>
    </div>
  )
}
