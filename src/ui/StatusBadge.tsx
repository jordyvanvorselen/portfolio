import { ReactNode } from 'react'

export interface StatusBadgeProps {
  children: ReactNode
  variant?: 'active' | 'maintained' | 'featured' | 'archived'
  className?: string
}

export const StatusBadge = ({
  children,
  variant = 'active',
  className = '',
}: StatusBadgeProps) => {
  const baseClasses =
    'backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border'

  const variantClasses = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    maintained: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    featured: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return <div className={combinedClasses}>{children}</div>
}
