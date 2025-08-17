import Link from 'next/link'

// Design system types
type DesignVariant = 'default' | 'active' | 'muted'
type DesignSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type DesignColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'muted'
type DesignWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  variant?: DesignVariant
  size?: DesignSize
  color?: DesignColor
  weight?: DesignWeight
  className?: string
}

// Style configurations extracted as constants for maintainability
const DESIGN_VARIANT_STYLES: Record<DesignVariant, string> = {
  default: 'hover:text-white transition-colors',
  active: 'text-white',
  muted: 'text-gray-500 hover:text-gray-400',
} as const

const SIZE_STYLES: Record<DesignSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
} as const

const COLOR_STYLES: Record<DesignColor, string> = {
  primary: 'text-gray-300',
  secondary: 'text-gray-400',
  accent: 'text-teal-400',
  neutral: 'text-gray-600',
  muted: 'text-gray-500',
} as const

const WEIGHT_STYLES: Record<DesignWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} as const

const combineClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(' ').trim()
}

export const NavigationLink = ({
  href,
  children,
  variant = 'default',
  size = 'md',
  color = 'primary',
  weight = 'normal',
  className = '',
}: NavigationLinkProps) => {
  const combinedClasses = combineClasses(
    DESIGN_VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    COLOR_STYLES[color],
    WEIGHT_STYLES[weight],
    className
  )

  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  )
}
