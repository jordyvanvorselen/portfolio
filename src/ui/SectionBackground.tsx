import { ReactNode } from 'react'

export interface SectionBackgroundProps {
  children: ReactNode
  variant?: 'gradient' | 'animated' | 'plain'
  className?: string
}

export const SectionBackground = ({
  children,
  variant = 'gradient',
  className = '',
}: SectionBackgroundProps) => {
  const backgroundElements = {
    gradient: (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
    ),
    animated: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </>
    ),
    plain: null,
  }

  return (
    <div className={`relative ${className}`.trim()}>
      {backgroundElements[variant]}
      <div className="relative">{children}</div>
    </div>
  )
}
