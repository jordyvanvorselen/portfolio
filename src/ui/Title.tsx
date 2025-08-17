import { ReactNode, ElementType } from 'react'

export type TitleSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
export type TitleWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TitleColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'gradient'
export type TitleHoverColor = 'teal' | 'blue' | 'white' | 'none'
export type TitleAlignment = 'left' | 'center' | 'right'
export type TitleTracking = 'normal' | 'wide' | 'wider'
export type TitleLineClamp = 1 | 2 | 3 | 4 | 'none'

interface TitleProps {
  children: ReactNode
  size?: TitleSize
  weight?: TitleWeight
  color?: TitleColor
  hoverColor?: TitleHoverColor
  align?: TitleAlignment
  as?: ElementType
  uppercase?: boolean
  tracking?: TitleTracking
  lineClamp?: TitleLineClamp
  className?: string
}

export const Title = ({
  children,
  size = 'md',
  weight = 'bold',
  color = 'primary',
  hoverColor = 'none',
  align = 'left',
  as = 'h2',
  uppercase = false,
  tracking = 'normal',
  lineClamp = 'none',
  className = '',
}: TitleProps) => {
  // Size styles
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl',
    xl: 'text-2xl md:text-3xl lg:text-4xl',
    '2xl': 'text-3xl md:text-3xl lg:text-4xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl',
    '4xl': 'text-5xl md:text-5xl lg:text-6xl xl:text-7xl',
    '5xl': 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl',
  }

  // Weight styles
  const weightStyles = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  // Color styles
  const colorStyles = {
    primary: 'text-white',
    secondary: 'text-gray-300',
    muted: 'text-slate-400',
    accent:
      'text-white group-hover:text-teal-400 transition-colors duration-300',
    gradient:
      'bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent',
  }

  // Alignment styles
  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  // Tracking styles
  const trackingStyles = {
    normal: '',
    wide: 'tracking-[0.1em]',
    wider: 'tracking-[0.2em]',
  }

  // Hover color styles
  const hoverColorStyles = {
    teal: 'group-hover:text-teal-400',
    blue: 'group-hover:text-blue-400',
    white: 'group-hover:text-white',
    none: '',
  }

  // Line clamp styles
  const lineClampStyles = {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    none: '',
  }

  const Component = as

  const combinedClasses = [
    sizeStyles[size],
    weightStyles[weight],
    colorStyles[color],
    hoverColorStyles[hoverColor],
    alignmentStyles[align],
    uppercase && 'uppercase',
    trackingStyles[tracking],
    lineClampStyles[lineClamp],
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return <Component className={combinedClasses}>{children}</Component>
}
