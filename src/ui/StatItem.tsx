import { ReactNode } from 'react'

interface StatItemProps {
  value: number
  label: string
  icon?: ReactNode
  color?: 'default' | 'primary' | 'secondary' | 'accent'
  layout?: 'default' | 'floating' | 'compact' | 'detailed'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  // Backward compatibility
  hoverColor?: 'teal' | 'yellow' | 'purple'
  variant?: 'default' | 'floating'
}

export const StatItem = ({
  value,
  label,
  icon,
  color: colorProp,
  layout: layoutProp,
  size = 'md',
  className = '',
  // Backward compatibility
  hoverColor,
  variant,
}: StatItemProps) => {
  // Handle backward compatibility
  const color =
    colorProp ||
    (hoverColor === 'teal'
      ? 'primary'
      : hoverColor === 'yellow'
        ? 'accent'
        : hoverColor === 'purple'
          ? 'secondary'
          : 'default')
  const layout = layoutProp || variant || 'default'

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
    xl: {
      value: 'text-4xl lg:text-5xl',
      label: 'text-base',
      floating: 'px-5 py-2 text-lg',
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

  if (layout === 'compact') {
    return (
      <div className={`flex items-center gap-2 group ${className}`}>
        {icon && <span className="text-gray-400">{icon}</span>}
        <div className="flex items-baseline gap-2">
          <span
            className={`${sizeClasses[size].value} font-bold text-white ${colorClasses[color]} transition-colors duration-300`}
          >
            {value.toLocaleString()}
          </span>
          <span
            className={`text-gray-400 ${sizeClasses[size].label} uppercase tracking-wider`}
          >
            {label}
          </span>
        </div>
      </div>
    )
  }

  if (layout === 'detailed') {
    return (
      <div
        className={`bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center group ${className}`}
      >
        {icon && (
          <div className="flex justify-center mb-2">
            <span
              className={`text-gray-400 ${colorClasses[color]} transition-colors duration-300`}
            >
              {icon}
            </span>
          </div>
        )}
        <div
          className={`${sizeClasses[size].value} font-bold text-white mb-2 ${colorClasses[color]} transition-colors duration-300`}
        >
          {value.toLocaleString()}
        </div>
        <div
          className={`text-gray-400 ${sizeClasses[size].label} uppercase tracking-wider`}
        >
          {label}
        </div>
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
