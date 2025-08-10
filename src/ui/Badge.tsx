import { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?: 'availability' | 'section-label' | 'skill'
  className?: string
}

export function Badge({
  children,
  variant = 'availability',
  className = '',
}: BadgeProps): JSX.Element {
  const baseClasses = 'inline-flex items-center rounded-md border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

  const variantClasses = {
    availability: 'text-white bg-teal-600/20 border-teal-400/30 px-4 py-1 text-sm font-semibold rounded-lg backdrop-blur-sm',
    'section-label': 'text-white bg-teal-500/20 border-teal-400/30 px-4 py-1 text-sm font-semibold rounded-lg backdrop-blur-sm',
    skill: 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/60 border-slate-600/30 text-xs px-3 py-1 font-medium transition-all duration-200 hover:scale-105',
  }

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return (
    <span role="status" aria-live="polite" className={combinedClasses}>
      {children}
    </span>
  )
}
