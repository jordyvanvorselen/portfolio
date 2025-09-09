'use client'

import { ReactNode, createContext, useContext } from 'react'

export interface AccordionContextValue {
  openIndex: number | null
  setOpenIndex: (index: number | null) => void
  allowMultiple?: boolean
}

export const AccordionContext = createContext<AccordionContextValue | null>(
  null
)

export interface AccordionProps {
  children: ReactNode
  openIndex: number | null
  onOpenChange: (index: number | null) => void
  allowMultiple?: boolean
  className?: string
}

export const Accordion = ({
  children,
  openIndex,
  onOpenChange,
  allowMultiple = false,
  className = '',
}: AccordionProps) => {
  const contextValue: AccordionContextValue = {
    openIndex,
    setOpenIndex: onOpenChange,
    allowMultiple,
  }

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={`space-y-4 ${className}`.trim()}>{children}</div>
    </AccordionContext.Provider>
  )
}

export const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an Accordion')
  }
  return context
}
