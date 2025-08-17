import { ReactNode } from 'react'

interface StatItemProps {
  value: number
  label: string
  icon?: ReactNode
  color?: 'default' | 'primary' | 'secondary' | 'accent'
  layout?: 'default' | 'floating'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const StatItem = ({
  value,
  label,
  icon,
  color = 'default',
  layout = 'default',
  size = 'md',
  className = '',
}: StatItemProps) => {
  const colorClasses = {
    default: 'group-hover:text-gray-300',
    primary: 'group-hover:text-teal-400',
    secondary: 'group-hover:text-purple-400',
    accent: 'group-hover:text-yellow-400',
  }

  const sizeClasses = {
    sm: {
      value: 'text-xl lg:text-2xl',
      label: 'text-xs',
      floating: 'px-2 py-0.5 text-xs',
    },
    md: {
      value: 'text-2xl lg:text-3xl',
      label: 'text-sm',
      floating: 'px-3 py-1 text-sm',
    },
    lg: {
      value: 'text-3xl lg:text-4xl',
      label: 'text-sm',
      floating: 'px-4 py-1.5 text-base',
    },
  }

  if (layout === 'floating') {
    return (
      <div
        className={`bg-black/80 backdrop-blur-sm rounded-full ${sizeClasses[size].floating} flex items-center gap-1 ${className}`}
      >
        {icon && <span className="text-gray-400">{icon}</span>}
        <span className="text-white font-medium">{value.toLocaleString()}</span>
      </div>
    )
  }

  // Default layout
  return (
    <div className={`text-center group ${className}`}>
      <div
        className={`${sizeClasses[size].value} font-bold text-white mb-2 ${colorClasses[color]} transition-colors duration-300`}
      >
        {value.toLocaleString()}
      </div>
      <div
        className={`text-gray-400 ${sizeClasses[size].label} uppercase tracking-wider flex items-center justify-center gap-1`}
      >
        {icon && <span className="text-gray-400">{icon}</span>}
        {label}
      </div>
    </div>
  )
}
