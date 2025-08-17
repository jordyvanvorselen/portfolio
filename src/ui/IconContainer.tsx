import { ReactNode } from 'react'

export interface IconContainerProps {
  children: ReactNode
  color: string
  variant?: 'expertise' | 'feature' | 'highlight'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const IconContainer = ({
  children,
  color,
  variant = 'expertise',
  size = 'md',
  className = '',
}: IconContainerProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  const variantClasses = {
    expertise:
      'rounded-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110',
    feature: 'rounded-full backdrop-blur-sm transition-all duration-200',
    highlight:
      'rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105',
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  }

  const containerStyle = {
    backgroundColor: `${color}20`,
    color: color,
    filter: `drop-shadow(0 0 8px ${color}40)`,
  }

  const combinedClasses =
    `flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim()

  return (
    <div className={combinedClasses} style={containerStyle}>
      <div className={iconSizeClasses[size]}>{children}</div>
    </div>
  )
}
