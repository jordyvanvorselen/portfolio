import { ReactNode } from 'react'

// New design system types
export type IconContainerVariant = 'default' | 'rounded' | 'circle' | 'square'
export type IconContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type IconContainerEffect = 'none' | 'glow' | 'shadow' | 'blur'
export type IconContainerInteractive = 'static' | 'hover' | 'scale'

// Legacy types for backward compatibility
export type LegacyVariant = 'expertise' | 'feature' | 'highlight'

export interface IconContainerProps {
  children: ReactNode
  color: string
  // New design system props
  variant?: IconContainerVariant
  size?: IconContainerSize
  effect?: IconContainerEffect
  interactive?: IconContainerInteractive
  // Legacy prop for backward compatibility (deprecated)
  /** @deprecated Use variant, effect, and interactive props instead */
  legacyVariant?: LegacyVariant
  className?: string
}

export const IconContainer = ({
  children,
  color,
  variant = 'default',
  size = 'md',
  effect = 'glow',
  interactive = 'static',
  legacyVariant,
  className = '',
}: IconContainerProps) => {
  // Legacy variant mapping for backward compatibility
  const legacyMapping = {
    expertise: {
      variant: 'rounded' as const,
      effect: 'blur' as const,
      interactive: 'scale' as const,
    },
    feature: {
      variant: 'circle' as const,
      effect: 'blur' as const,
      interactive: 'static' as const,
    },
    highlight: {
      variant: 'default' as const,
      effect: 'blur' as const,
      interactive: 'hover' as const,
    },
  }

  // Apply legacy mapping if legacyVariant is provided
  const resolvedVariant = legacyVariant
    ? legacyMapping[legacyVariant].variant
    : variant
  const resolvedEffect = legacyVariant
    ? legacyMapping[legacyVariant].effect
    : effect
  const resolvedInteractive = legacyVariant
    ? legacyMapping[legacyVariant].interactive
    : interactive

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
    square: 'rounded-none',
  }

  // Effect classes
  const effectClasses = {
    none: '',
    glow: '',
    shadow: 'shadow-lg',
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

  // Dynamic styles for color and effects
  const containerStyle = {
    backgroundColor: `${color}20`,
    color: color,
    ...(resolvedEffect === 'glow' && {
      filter: `drop-shadow(0 0 8px ${color}40)`,
    }),
  }

  const combinedClasses = [
    'flex items-center justify-center',
    sizeClasses[size],
    variantClasses[resolvedVariant],
    effectClasses[resolvedEffect],
    interactiveClasses[resolvedInteractive],
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
