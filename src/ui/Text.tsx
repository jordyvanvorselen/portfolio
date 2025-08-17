import { ReactNode, CSSProperties } from 'react'

// Design token types
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold'
export type TextColor = 'primary' | 'secondary' | 'muted' | 'accent'
export type TextLineHeight = 'tight' | 'normal' | 'relaxed' | 'loose'
export type TextAlignment = 'left' | 'center' | 'right'

export interface TextProps {
  children: ReactNode
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  lineHeight?: TextLineHeight
  alignment?: TextAlignment
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
    loose: 'leading-loose',
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
  className = '',
  style,
}: TextProps) => {
  // Use design token system with defaults
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
