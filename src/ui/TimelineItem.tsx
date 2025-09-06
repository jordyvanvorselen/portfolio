'use client'

import { ReactNode } from 'react'
import { TimelineDot } from '@/ui/TimelineDot'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface TimelineItemProps {
  children: ReactNode
  dotColor:
    | 'teal'
    | 'purple'
    | 'amber'
    | 'pink'
    | 'blue'
    | 'emerald'
    | 'red'
    | 'orange'
    | 'cyan'
    | 'indigo'
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
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  // Mobile layout: simple stacked layout
  if (!isDesktop) {
    const mobileClasses = ['relative', 'mb-8', className]
      .filter(Boolean)
      .join(' ')
      .trim()

    return <div className={mobileClasses}>{children}</div>
  }

  // Desktop layout: timeline with dots and positioning
  const spacingClasses = spacing === 'normal' ? 'mb-16' : 'mb-16 -mt-76'
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
        <div className="w-1/2 pr-8">{children}</div>

        {/* Timeline Dot - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <TimelineDot color={dotColor} />
        </div>

        {/* Right Side Empty */}
        <div className="w-1/2 pl-8"></div>
      </div>
    )
  }

  // Right alignment
  return (
    <div className={desktopClasses}>
      {/* Left Side Empty */}
      <div className="w-1/2 pr-8"></div>

      {/* Timeline Dot - Centered */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
        <TimelineDot color={dotColor} />
      </div>

      {/* Right Card Container */}
      <div className="w-1/2 pl-8">{children}</div>
    </div>
  )
}
