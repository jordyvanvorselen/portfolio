import { ReactNode, CSSProperties } from 'react'

// Design token types
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'primary' | 'secondary' | 'muted' | 'accent'
export type TextLineHeight = 'tight' | 'normal' | 'relaxed'
export type TextAlignment = 'left' | 'center' | 'right'

// Legacy variant types (for backward compatibility)
export type TextVariant =
  | 'description'
  | 'description-compact'
  | 'blog-hero-subtitle'
  | 'blog-card-description'
  | 'card-description'
  | 'publication-number'
  | 'publication-label'
  | 'publication-description'
  | 'call-to-action-question'
  | 'call-to-action-availability'
  | 'footer-description'
  | 'footer-info'
  | 'footer-copyright'
  | 'footer-availability'
  | 'projects-hero-description'
  | 'projects-grid-description'
  | 'project-card-description'
  | 'project-card-long-description'
  | 'scroll-indicator-main'
  | 'scroll-indicator-subtitle'

export interface TextProps {
  children: ReactNode
  // New design token props
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  lineHeight?: TextLineHeight
  alignment?: TextAlignment
  // Legacy variant support
  variant?: TextVariant
  className?: string
  style?: CSSProperties
}

// Utility functions to map design tokens to Tailwind classes
const getSizeClass = (size: TextSize): string => {
  const sizeMap: Record<TextSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  }
  return sizeMap[size]
}

const getWeightClass = (weight: TextWeight): string => {
  const weightMap: Record<TextWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }
  return weightMap[weight]
}

const getColorClass = (color: TextColor): string => {
  const colorMap: Record<TextColor, string> = {
    primary: 'text-slate-100',
    secondary: 'text-gray-300',
    muted: 'text-gray-400',
    accent: 'text-teal-500',
  }
  return colorMap[color]
}

const getLineHeightClass = (lineHeight: TextLineHeight): string => {
  const lineHeightMap: Record<TextLineHeight, string> = {
    tight: 'leading-tight',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
  }
  return lineHeightMap[lineHeight]
}

const getAlignmentClass = (alignment: TextAlignment): string => {
  const alignmentMap: Record<TextAlignment, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  return alignmentMap[alignment]
}

export const Text = ({
  children,
  size,
  weight,
  color,
  lineHeight,
  alignment,
  variant,
  className = '',
  style,
}: TextProps) => {
  // If variant is provided, use legacy system
  if (variant) {
    const variantClasses = {
      description:
        'text-lg md:text-xl font-medium text-gray-300 text-center leading-relaxed max-w-3xl mx-auto',
      'description-compact':
        'text-base md:text-lg font-medium text-gray-300 text-center leading-relaxed max-w-2xl mx-auto mb-4',
      'blog-hero-subtitle':
        'text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8',
      'blog-card-description':
        'text-gray-300 leading-relaxed mb-4 line-clamp-3',
      'card-description':
        'text-gray-300 mb-8 leading-relaxed text-[15px] group-hover:text-gray-200 transition-colors duration-300 text-left',
      'publication-number': 'text-4xl font-bold',
      'publication-label': 'text-lg font-semibold text-slate-100',
      'publication-description': 'text-sm text-slate-400',
      'call-to-action-question': 'text-gray-300 mb-6',
      'call-to-action-availability': 'font-semibold',
      'footer-description': 'text-[#cbd5e1] mb-6 max-w-md',
      'footer-info': 'text-[#cbd5e1] text-sm',
      'footer-copyright': 'text-[#cbd5e1] text-sm',
      'footer-availability': 'text-[#10b981] text-sm',
      'projects-hero-description':
        'text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto',
      'projects-grid-description': 'text-xl text-gray-300 max-w-3xl mx-auto',
      'project-card-description': 'text-gray-300 text-lg leading-relaxed',
      'project-card-long-description': 'text-gray-400 leading-relaxed',
      'scroll-indicator-main':
        'text-sm md:text-base text-slate-300 group-hover:text-teal-500 transition-colors duration-300',
      'scroll-indicator-subtitle':
        'text-xs text-slate-300/70 group-hover:text-slate-300 transition-colors duration-300',
    }

    const combinedClasses = `${variantClasses[variant]} ${className}`.trim()

    return (
      <p className={combinedClasses} style={style}>
        {children}
      </p>
    )
  }

  // Use new design token system with defaults
  const defaultSize: TextSize = 'base'
  const defaultWeight: TextWeight = 'normal'
  const defaultColor: TextColor = 'secondary'
  const defaultLineHeight: TextLineHeight = 'normal'
  const defaultAlignment: TextAlignment = 'left'

  const classes = [
    getSizeClass(size ?? defaultSize),
    getWeightClass(weight ?? defaultWeight),
    getColorClass(color ?? defaultColor),
    getLineHeightClass(lineHeight ?? defaultLineHeight),
    getAlignmentClass(alignment ?? defaultAlignment),
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <p className={classes} style={style}>
      {children}
    </p>
  )
}
