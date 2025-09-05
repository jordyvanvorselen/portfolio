'use client'

import { ReactNode } from 'react'
import { TimelineDot } from '@/ui/TimelineDot'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface TimelineItemProps {
  children: ReactNode
  dotColor: 'teal' | 'purple' | 'amber' | 'pink'
  alignment: 'left' | 'right'
  spacing?: 'normal' | 'close'
  className?: string
}

export const TimelineItem = ({
  children,
  dotColor,
  alignment,
  spacing = 'normal',
  className = '',
}: TimelineItemProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  // Mobile layout: simple stacked layout
  if (!isDesktop) {
    const mobileClasses = ['relative', 'mb-8', className]
      .filter(Boolean)
      .join(' ')
      .trim()

    return <div className={mobileClasses}>{children}</div>
  }

  // Desktop layout: timeline with dots and positioning
  const spacingClasses = spacing === 'normal' ? 'mb-16' : 'mb-16 -mt-64'
  const desktopClasses = [
    'relative flex items-center',
    spacingClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  if (alignment === 'left') {
    return (
      <div className={desktopClasses}>
        {/* Left Card Container */}
        <div className="w-full pr-24">{children}</div>

        {/* Timeline Dot - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <TimelineDot color={dotColor} />
        </div>

        {/* Right Side Empty */}
        <div className="w-4/5 pl-12"></div>
      </div>
    )
  }

  // Right alignment
  return (
    <div className={desktopClasses}>
      {/* Left Side Empty */}
      <div className="w-4/5 pr-12"></div>

      {/* Timeline Dot - Centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <TimelineDot color={dotColor} />
      </div>

      {/* Right Card Container */}
      <div className="w-4/5 pl-12">{children}</div>
    </div>
  )
}
