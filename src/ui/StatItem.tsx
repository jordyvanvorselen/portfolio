import { ReactNode } from 'react'

interface StatItemProps {
  value: number
  label: string
  icon?: ReactNode
  hoverColor?: 'teal' | 'yellow' | 'purple'
  variant?: 'default' | 'floating'
  className?: string
}

export const StatItem = ({
  value,
  label,
  icon,
  hoverColor = 'teal',
  variant = 'default',
  className = '',
}: StatItemProps) => {
  const hoverColorClasses = {
    teal: 'group-hover:text-teal-400',
    yellow: 'group-hover:text-yellow-400',
    purple: 'group-hover:text-purple-400',
  }

  if (variant === 'floating') {
    return (
      <div
        className={`bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 ${className}`}
      >
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className="text-white text-sm font-medium">
          {value.toLocaleString()}
        </span>
      </div>
    )
  }

  return (
    <div className={`text-center group ${className}`}>
      <div
        className={`text-3xl lg:text-4xl font-bold text-white mb-2 ${hoverColorClasses[hoverColor]} transition-colors duration-300`}
      >
        {value.toLocaleString()}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider flex items-center justify-center gap-1">
        {icon && <span className="text-gray-400">{icon}</span>}
        {label}
      </div>
    </div>
  )
}
