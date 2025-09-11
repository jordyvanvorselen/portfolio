import { ReactNode, CSSProperties } from 'react'

// Design token types
export type TextSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'success'
export type TextLineHeight = 'tight' | 'normal' | 'relaxed' | 'loose'
export type TextAlignment = 'left' | 'center' | 'right'
export type TextLineClamp = 1 | 2 | 3 | 4 | 5 | 6 | 'none'

export interface TextProps {
  children: ReactNode
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  lineHeight?: TextLineHeight
  alignment?: TextAlignment
  lineClamp?: TextLineClamp
  className?: string
  style?: CSSProperties
}

export const Text = ({
  children,
  size = 'base',
  weight = 'normal',
  color = 'secondary',
  lineHeight = 'normal',
  alignment = 'left',
  lineClamp = 'none',
  className = '',
  style,
}: TextProps) => {
  // Size styles
  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-xl lg:text-2xl',
    '3xl': 'text-2xl lg:text-3xl',
    '4xl': 'text-3xl lg:text-4xl',
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
    primary: 'text-slate-100',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    accent: 'text-teal-500',
    success: 'text-[#10b981]',
  }

  // Line height styles
  const lineHeightStyles = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  }

  // Alignment styles
  const alignmentStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  // Line clamp styles
  const lineClampStyles = {
    1: 'line-clamp-1',
    2: 'line-clamp-2',
    3: 'line-clamp-3',
    4: 'line-clamp-4',
    5: 'line-clamp-5',
    6: 'line-clamp-6',
    none: '',
  }

  const combinedClasses = [
    sizeStyles[size],
    weightStyles[weight],
    colorStyles[color],
    lineHeightStyles[lineHeight],
    alignmentStyles[alignment],
    lineClampStyles[lineClamp],
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <p className={combinedClasses} style={style}>
      {children}
    </p>
  )
}
