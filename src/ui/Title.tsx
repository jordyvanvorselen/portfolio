import { ReactNode, ElementType } from 'react'

export type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
export type TitleWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TitleColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'gradient'
export type TitleAlignment = 'left' | 'center' | 'right'

interface TitleProps {
  children: ReactNode
  size?: TitleSize
  weight?: TitleWeight
  color?: TitleColor
  align?: TitleAlignment
  as?: ElementType
  className?: string
}

export const Title = ({
  children,
  size = 'md',
  weight = 'bold',
  color = 'primary',
  align = 'left',
  as = 'h2',
  className = '',
}: TitleProps) => {
  // Size styles
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl',
    xl: 'text-2xl md:text-3xl lg:text-4xl',
    '2xl': 'text-2xl md:text-3xl lg:text-4xl',
    '3xl': 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    '4xl': 'text-4xl md:text-6xl lg:text-7xl xl:text-8xl',
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

  const Component = as

  const combinedClasses = [
    sizeStyles[size],
    weightStyles[weight],
    colorStyles[color],
    alignmentStyles[align],
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return <Component className={combinedClasses}>{children}</Component>
}
