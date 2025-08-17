import { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?: 'solid' | 'outline' | 'soft'
  color?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'accent'
  size?: 'sm' | 'md' | 'lg'
  weight?: 'medium' | 'semibold'
  rounded?: boolean
  className?: string
  style?: React.CSSProperties
}

export const Badge = ({
  children,
  variant = 'soft',
  color = 'default',
  size = 'md',
  weight = 'medium',
  rounded = false,
  className = '',
  style,
}: BadgeProps) => {
  const baseClasses =
    'inline-flex items-center border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200'

  // Weight styles
  const weightClasses = {
    medium: 'font-medium',
    semibold: 'font-semibold',
  }

  // Size styles
  const sizeClasses = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-1 text-sm',
    lg: 'px-5 py-2 text-base',
  }

  // Variant and color combinations
  const variantColorClasses = {
    solid: {
      default: 'bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700',
      primary: 'bg-teal-600 text-white border-teal-500 hover:bg-teal-500',
      success: 'bg-green-600 text-white border-green-500 hover:bg-green-500',
      warning: 'bg-yellow-600 text-white border-yellow-500 hover:bg-yellow-500',
      danger: 'bg-red-600 text-white border-red-500 hover:bg-red-500',
      info: 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500',
      accent: 'bg-purple-600 text-white border-purple-500 hover:bg-purple-500',
    },
    outline: {
      default:
        'bg-transparent text-gray-200 border-gray-700 hover:bg-gray-800/60 hover:border-gray-600',
      primary:
        'bg-transparent text-teal-400 border-teal-400 hover:bg-teal-600/20 hover:border-teal-300',
      success:
        'bg-transparent text-green-400 border-green-400 hover:bg-green-600/20 hover:border-green-300',
      warning:
        'bg-transparent text-yellow-400 border-yellow-400 hover:bg-yellow-600/20 hover:border-yellow-300',
      danger:
        'bg-transparent text-red-400 border-red-400 hover:bg-red-600/20 hover:border-red-300',
      info: 'bg-transparent text-blue-400 border-blue-400 hover:bg-blue-600/20 hover:border-blue-300',
      accent:
        'bg-transparent text-purple-400 border-purple-400 hover:bg-purple-600/20 hover:border-purple-300',
    },
    soft: {
      default:
        'bg-slate-700/50 text-slate-300 hover:bg-slate-600/60 border-slate-600/30 hover:scale-105',
      primary:
        'bg-teal-600/20 text-white border-teal-400/30 hover:bg-teal-500/30 backdrop-blur-sm',
      success:
        'bg-green-600/20 text-green-200 border-green-400/30 hover:bg-green-500/30 backdrop-blur-sm',
      warning:
        'bg-yellow-600/20 text-yellow-200 border-yellow-400/30 hover:bg-yellow-500/30 backdrop-blur-sm',
      danger:
        'bg-red-600/20 text-red-200 border-red-400/30 hover:bg-red-500/30 backdrop-blur-sm',
      info: 'bg-blue-600/20 text-blue-200 border-blue-400/30 hover:bg-blue-500/30 backdrop-blur-sm',
      accent:
        'bg-purple-600/20 text-purple-200 border-purple-400/30 hover:bg-purple-500/30 backdrop-blur-sm',
    },
  }

  // Round styles
  const roundedClasses = rounded ? 'rounded-full' : 'rounded-lg'

  const combinedClasses = [
    baseClasses,
    weightClasses[weight],
    sizeClasses[size],
    variantColorClasses[variant][color],
    roundedClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

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
