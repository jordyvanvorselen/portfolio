import { ReactNode } from 'react'

// Design system types
type DesignSize = 'sm' | 'md' | 'lg' | 'xl'
type DesignColor = 'primary' | 'secondary' | 'neutral'

export interface MobileMenuButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  size?: DesignSize
  color?: DesignColor
  isPressed?: boolean
}

// Style configurations
const SIZE_STYLES: Record<DesignSize, string> = {
  sm: 'py-2 text-base',
  md: 'py-2.5 text-lg',
  lg: 'py-2.5 text-lg sm:py-3 sm:text-xl',
  xl: 'py-3 text-xl sm:py-4 sm:text-2xl',
} as const

const COLOR_STYLES: Record<DesignColor, string> = {
  primary: 'text-gray-300',
  secondary: 'text-gray-400',
  neutral: 'text-gray-600',
} as const

const combineClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(' ').trim()
}

export const MobileMenuButton = ({
  children,
  onClick,
  className = '',
  size = 'lg',
  color = 'primary',
  isPressed = false,
}: MobileMenuButtonProps) => {
  const baseClasses =
    'w-full flex border border-gray-700/50 rounded-lg bg-gray-800/40 hover:bg-gray-700/60 transition-all duration-150 click-feedback-bounce'
  const pressedClasses = isPressed ? 'opacity-75' : ''

  const combinedClasses = combineClasses(
    baseClasses,
    SIZE_STYLES[size],
    COLOR_STYLES[color],
    pressedClasses,
    className
  )

  return (
    <div className={combinedClasses} onClick={onClick}>
      {children}
    </div>
  )
}
