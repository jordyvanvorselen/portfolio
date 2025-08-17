import { ReactNode } from 'react'

interface FilterProps {
  children: ReactNode
  variant?: 'default' | 'active' | 'disabled'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'default' | 'primary' | 'secondary' | 'accent'
  onClick?: () => void
  className?: string
}

export const Filter = ({
  children,
  variant = 'default',
  size = 'sm',
  color = 'default',
  onClick,
  className = '',
}: FilterProps) => {
  const baseStyles =
    'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer'

  const sizeStyles = {
    xs: 'h-6 rounded px-2 text-xs',
    sm: 'h-8 rounded-md px-3 text-xs',
    md: 'h-10 rounded-md px-4 text-sm',
    lg: 'h-12 rounded-lg px-6 text-base',
  }

  const colorStyles = {
    default: {
      default:
        'border border-gray-600 text-gray-300 hover:text-white hover:border-teal-500 bg-transparent shadow-sm hover:bg-accent',
      active: 'bg-teal-500 hover:bg-teal-600 text-white shadow',
      disabled:
        'border border-gray-700 text-gray-500 bg-transparent pointer-events-none opacity-50',
    },
    primary: {
      default:
        'border border-gray-600 text-gray-300 hover:text-white hover:border-teal-500 bg-transparent shadow-sm hover:bg-accent',
      active: 'bg-teal-500 hover:bg-teal-600 text-white shadow',
      disabled:
        'border border-teal-700 text-teal-600 bg-transparent pointer-events-none opacity-50',
    },
    secondary: {
      default:
        'border border-blue-600 text-blue-300 hover:text-white hover:border-blue-500 bg-transparent shadow-sm hover:bg-blue-800/50',
      active: 'bg-blue-500 hover:bg-blue-600 text-white shadow',
      disabled:
        'border border-blue-700 text-blue-600 bg-transparent pointer-events-none opacity-50',
    },
    accent: {
      default:
        'border border-purple-600 text-purple-300 hover:text-white hover:border-purple-500 bg-transparent shadow-sm hover:bg-purple-800/50',
      active: 'bg-purple-500 hover:bg-purple-600 text-white shadow',
      disabled:
        'border border-purple-700 text-purple-600 bg-transparent pointer-events-none opacity-50',
    },
  }

  const variantStyles = colorStyles[color][variant]

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles} ${className}`}
      onClick={variant === 'disabled' ? undefined : onClick}
      disabled={variant === 'disabled'}
      aria-pressed={variant === 'active'}
    >
      {children}
    </button>
  )
}
