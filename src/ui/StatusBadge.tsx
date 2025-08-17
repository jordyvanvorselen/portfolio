import { ReactNode } from 'react'

export type BadgeVariant = 'solid' | 'outline' | 'soft'
export type BadgeColor =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'accent'
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

export interface StatusBadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  color?: BadgeColor
  size?: BadgeSize
  className?: string
}

export const StatusBadge = ({
  children,
  variant = 'soft',
  color = 'default',
  size = 'sm',
  className = '',
}: StatusBadgeProps) => {
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
      },
      success: {
        solid: 'bg-green-500 text-white border-green-500',
        soft: 'bg-green-500/20 text-green-400 border-green-500/30',
        outline: 'bg-transparent text-green-400 border-green-500/50',
      },
      info: {
        solid: 'bg-blue-500 text-white border-blue-500',
        soft: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        outline: 'bg-transparent text-blue-400 border-blue-500/50',
      },
      warning: {
        solid: 'bg-yellow-500 text-white border-yellow-500',
        soft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        outline: 'bg-transparent text-yellow-400 border-yellow-500/50',
      },
      danger: {
        solid: 'bg-red-500 text-white border-red-500',
        soft: 'bg-red-500/20 text-red-400 border-red-500/30',
        outline: 'bg-transparent text-red-400 border-red-500/50',
      },
      primary: {
        solid: 'bg-teal-500 text-white border-teal-500',
        soft: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
        outline: 'bg-transparent text-teal-400 border-teal-500/50',
      },
      accent: {
        solid: 'bg-purple-500 text-white border-purple-500',
        soft: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
        outline: 'bg-transparent text-purple-400 border-purple-500/50',
      },
    }

    return colorMap[color][variant]
  }

  const combinedClasses = [
    baseClasses,
    sizeStyles[size],
    getColorVariantClasses(variant, color),
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return <div className={combinedClasses}>{children}</div>
}
