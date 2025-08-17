import { ReactNode, HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  variant?: 'line' | 'gradient-vertical' | 'gradient-horizontal'
  color?: 'default' | 'primary' | 'secondary' | 'muted'
  thickness?: 'thin' | 'medium' | 'thick'
}

export const Divider = ({
  children,
  variant = 'line',
  color = 'default',
  thickness = 'medium',
  className = '',
  ...props
}: DividerProps) => {
  const colorClasses = {
    default: 'border-gray-600',
    primary: 'border-teal-500',
    secondary: 'border-blue-500',
    muted: 'border-slate-700/50',
  }

  const gradientColorClasses = {
    default: 'via-gray-600',
    primary: 'via-teal-500',
    secondary: 'via-blue-500',
    muted: 'via-slate-600',
  }

  const thicknessClasses = {
    thin: 'border-t',
    medium: 'border-t-2',
    thick: 'border-t-4',
  }

  const dotClasses = {
    default: 'bg-gray-600',
    primary: 'bg-teal-500',
    secondary: 'bg-blue-500',
    muted: 'bg-slate-600',
  }

  if (variant === 'gradient-vertical') {
    const width =
      thickness === 'thin' ? 'w-px' : thickness === 'thick' ? 'w-1' : 'w-0.5'
    return (
      <div
        className={`${width} h-16 bg-gradient-to-b from-transparent ${gradientColorClasses[color]} to-transparent ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (variant === 'gradient-horizontal') {
    const height =
      thickness === 'thin' ? 'h-px' : thickness === 'thick' ? 'h-1' : 'h-0.5'
    return (
      <div
        className={`flex items-center gap-4 justify-center ${className}`}
        {...props}
      >
        <div
          className={`w-16 ${height} bg-gradient-to-r from-transparent ${gradientColorClasses[color]} to-transparent`}
        />
        <div
          className={`w-2 h-2 ${dotClasses[color]} rounded-full animate-pulse`}
        />
        <div
          className={`w-16 ${height} bg-gradient-to-l from-transparent ${gradientColorClasses[color]} to-transparent`}
        />
        {children}
      </div>
    )
  }

  // Default line variant
  return (
    <div
      className={`${thicknessClasses[thickness]} ${colorClasses[color]} pt-6 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}
