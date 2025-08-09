import { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?: 'availability' | 'section-label'
  className?: string
}

export function Badge({
  children,
  variant = 'availability',
  className = '',
}: BadgeProps): JSX.Element {
  const baseClasses =
    'inline-flex items-center px-4 py-1 text-sm font-semibold rounded-lg backdrop-blur-sm'

  const variantClasses = {
    availability: 'text-white bg-teal-600/20 border border-teal-400/30',
    'section-label': 'text-white bg-teal-500/20 border border-teal-400/30',
  }

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return (
    <span role="status" aria-live="polite" className={combinedClasses}>
      {children}
    </span>
  )
}
