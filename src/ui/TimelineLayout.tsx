import { ReactNode } from 'react'

interface TimelineLayoutProps {
  children: ReactNode
  className?: string
}

export const TimelineLayout = ({
  children,
  className = '',
}: TimelineLayoutProps) => {
  const combinedClasses = ['w-full mx-auto relative px-4', className]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <div className={combinedClasses}>
      {/* Vertical Timeline Line - hidden on mobile */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-teal-500/20 via-teal-500/40 to-teal-500/20" />
      {children}
    </div>
  )
}
