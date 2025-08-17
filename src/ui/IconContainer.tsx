import { ReactNode } from 'react'

// Design system types
export type IconContainerVariant = 'default' | 'rounded' | 'circle'
export type IconContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type IconContainerEffect = 'none' | 'blur'
export type IconContainerInteractive = 'static' | 'hover' | 'scale'

export interface IconContainerProps {
  children: ReactNode
  color: string
  variant?: IconContainerVariant
  size?: IconContainerSize
  effect?: IconContainerEffect
  interactive?: IconContainerInteractive
  className?: string
}

export const IconContainer = ({
  children,
  color,
  variant = 'default',
  size = 'md',
  effect = 'none',
  interactive = 'static',
  className = '',
}: IconContainerProps) => {
  // Size classes for container
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24',
  }

  // Variant classes for shape
  const variantClasses = {
    default: 'rounded-lg',
    rounded: 'rounded-xl',
    circle: 'rounded-full',
  }

  // Effect classes
  const effectClasses = {
    none: '',
    blur: 'backdrop-blur-sm',
  }

  // Interactive classes
  const interactiveClasses = {
    static: '',
    hover: 'transition-all duration-300 hover:scale-105',
    scale: 'transition-all duration-300 group-hover:scale-110',
  }

  // Icon size classes (proportional to container size)
  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12',
    '2xl': 'w-14 h-14',
  }

  // Dynamic styles for color
  const containerStyle = {
    backgroundColor: `${color}20`,
    color: color,
  }

  const combinedClasses = [
    'flex items-center justify-center',
    sizeClasses[size],
    variantClasses[variant],
    effectClasses[effect],
    interactiveClasses[interactive],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={combinedClasses} style={containerStyle}>
      <div className={iconSizeClasses[size]}>{children}</div>
    </div>
  )
}
