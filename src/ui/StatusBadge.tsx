import { ReactNode } from 'react'

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'dot'
export type BadgeColor =
  | 'default'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'secondary'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

export interface StatusBadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  color?: BadgeColor
  size?: BadgeSize
  className?: string
  // Legacy status support for backward compatibility
  status?: 'active' | 'maintained' | 'featured' | 'archived'
}

export const StatusBadge = ({
  children,
  variant = 'soft',
  color = 'default',
  size = 'sm',
  className = '',
  status,
}: StatusBadgeProps) => {
  // Legacy status mappings for backward compatibility
  const legacyStatusMappings = {
    active: { variant: 'soft' as const, color: 'success' as const },
    maintained: { variant: 'soft' as const, color: 'info' as const },
    featured: { variant: 'soft' as const, color: 'primary' as const },
    archived: { variant: 'soft' as const, color: 'default' as const },
  }

  // Use legacy mapping if status is provided, otherwise use new props
  const config = status ? legacyStatusMappings[status] : { variant, color }
  const finalVariant = status ? config.variant : variant
  const finalColor = status ? config.color : color

  // Base classes with backdrop-blur and border
  const baseClasses =
    'backdrop-blur-sm rounded-full font-medium border inline-flex items-center justify-center'

  // Size styles
  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-3 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-sm',
  }

  // Color and variant combinations
  const getColorVariantClasses = (
    variant: BadgeVariant,
    color: BadgeColor
  ): string => {
    const colorMap = {
      default: {
        solid: 'bg-gray-500 text-white border-gray-500',
        soft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        outline: 'bg-transparent text-gray-400 border-gray-500/50',
        dot: 'bg-transparent text-gray-400 border-gray-500/30 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-gray-400 before:rounded-full',
      },
      success: {
        solid: 'bg-green-500 text-white border-green-500',
        soft: 'bg-green-500/20 text-green-400 border-green-500/30',
        outline: 'bg-transparent text-green-400 border-green-500/50',
        dot: 'bg-transparent text-green-400 border-green-500/30 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-green-400 before:rounded-full',
      },
      info: {
        solid: 'bg-blue-500 text-white border-blue-500',
        soft: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        outline: 'bg-transparent text-blue-400 border-blue-500/50',
        dot: 'bg-transparent text-blue-400 border-blue-500/30 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-blue-400 before:rounded-full',
      },
      warning: {
        solid: 'bg-yellow-500 text-white border-yellow-500',
        soft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        outline: 'bg-transparent text-yellow-400 border-yellow-500/50',
        dot: 'bg-transparent text-yellow-400 border-yellow-500/30 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-yellow-400 before:rounded-full',
      },
      danger: {
        solid: 'bg-red-500 text-white border-red-500',
        soft: 'bg-red-500/20 text-red-400 border-red-500/30',
        outline: 'bg-transparent text-red-400 border-red-500/50',
        dot: 'bg-transparent text-red-400 border-red-500/30 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-red-400 before:rounded-full',
      },
      primary: {
        solid: 'bg-teal-500 text-white border-teal-500',
        soft: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
        outline: 'bg-transparent text-teal-400 border-teal-500/50',
        dot: 'bg-transparent text-teal-400 border-teal-500/30 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-teal-400 before:rounded-full',
      },
      secondary: {
        solid: 'bg-purple-500 text-white border-purple-500',
        soft: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        outline: 'bg-transparent text-purple-400 border-purple-500/50',
        dot: 'bg-transparent text-purple-400 border-purple-500/30 relative before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:bg-purple-400 before:rounded-full',
      },
    }

    return colorMap[color][variant]
  }

  // Additional padding for dot variant to accommodate the dot
  const dotPadding = finalVariant === 'dot' ? 'pl-6' : ''

  const combinedClasses = [
    baseClasses,
    sizeStyles[size],
    getColorVariantClasses(finalVariant, finalColor),
    dotPadding,
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return <div className={combinedClasses}>{children}</div>
}
