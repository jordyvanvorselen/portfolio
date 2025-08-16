import { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?:
    | 'availability'
    | 'section-label'
    | 'skill'
    | 'technology'
    | 'project-tech'
  className?: string
  style?: React.CSSProperties
}

export const Badge = ({
  children,
  variant = 'availability',
  className = '',
  style,
}: BadgeProps) => {
  const baseClasses =
    'inline-flex items-center rounded-md border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'

  const variantClasses = {
    availability:
      'text-white bg-teal-600/20 border-teal-400/30 px-4 py-1 text-sm font-semibold rounded-lg backdrop-blur-sm',
    'section-label':
      'text-white bg-teal-500/20 border-teal-400/30 px-4 py-1 text-sm font-semibold rounded-lg backdrop-blur-sm',
    skill:
      'bg-slate-700/50 text-slate-300 hover:bg-slate-600/60 border-slate-600/30 text-xs px-3 py-1 font-medium transition-all duration-200 hover:scale-105',
    technology:
      'inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-800/60 text-gray-200 border border-gray-700/50 hover:bg-gray-700/60 hover:border-gray-600/50 transition-all duration-300 backdrop-blur-sm',
    'project-tech':
      'bg-gray-800/50 text-gray-300 border border-gray-700/30 hover:bg-gray-700/60 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105',
  }

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return (
    <span
      role="status"
      aria-live="polite"
      className={combinedClasses}
      style={style}
    >
      {children}
    </span>
  )
}
