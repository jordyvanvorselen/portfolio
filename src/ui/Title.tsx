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
  // Legacy variant support for backward compatibility
  variant?:
    | 'logo'
    | 'hero-name'
    | 'hero-title'
    | 'blog-hero-title'
    | 'blog-card-title'
    | 'section-title'
    | 'section-title-compact'
    | 'section-label-small'
    | 'subsection-label'
    | 'card-title'
    | 'footer-author'
    | 'footer-section'
    | 'projects-hero-title'
    | 'projects-grid-title'
    | 'project-card-title'
    | 'project-section-label'
}

export const Title = ({
  children,
  size = 'md',
  weight = 'bold',
  color = 'primary',
  align = 'left',
  as,
  className = '',
  variant,
}: TitleProps) => {
  // Legacy variant mappings for backward compatibility
  const legacyVariantMappings = {
    logo: {
      size: 'md' as const,
      weight: 'bold' as const,
      color: 'primary' as const,
      align: 'left' as const,
      element: 'span' as const,
    },
    'hero-name': {
      size: '4xl' as const,
      weight: 'bold' as const,
      color: 'gradient' as const,
      align: 'center' as const,
      element: 'h1' as const,
    },
    'hero-title': {
      size: 'xl' as const,
      weight: 'normal' as const,
      color: 'secondary' as const,
      align: 'center' as const,
      element: 'p' as const,
    },
    'blog-hero-title': {
      size: '4xl' as const,
      weight: 'bold' as const,
      color: 'gradient' as const,
      align: 'left' as const,
      element: 'h1' as const,
    },
    'blog-card-title': {
      size: 'lg' as const,
      weight: 'bold' as const,
      color: 'accent' as const,
      align: 'left' as const,
      element: 'h3' as const,
    },
    'section-title': {
      size: '3xl' as const,
      weight: 'bold' as const,
      color: 'primary' as const,
      align: 'left' as const,
      element: 'h2' as const,
    },
    'section-title-compact': {
      size: '3xl' as const,
      weight: 'bold' as const,
      color: 'gradient' as const,
      align: 'left' as const,
      element: 'h2' as const,
    },
    'section-label-small': {
      size: '2xl' as const,
      weight: 'bold' as const,
      color: 'primary' as const,
      align: 'left' as const,
      element: 'h3' as const,
    },
    'subsection-label': {
      size: 'xs' as const,
      weight: 'bold' as const,
      color: 'muted' as const,
      align: 'left' as const,
      element: 'h4' as const,
    },
    'card-title': {
      size: 'lg' as const,
      weight: 'bold' as const,
      color: 'accent' as const,
      align: 'left' as const,
      element: 'h3' as const,
    },
    'footer-author': {
      size: 'lg' as const,
      weight: 'bold' as const,
      color: 'primary' as const,
      align: 'left' as const,
      element: 'h3' as const,
    },
    'footer-section': {
      size: 'md' as const,
      weight: 'semibold' as const,
      color: 'primary' as const,
      align: 'left' as const,
      element: 'h4' as const,
    },
    'projects-hero-title': {
      size: '4xl' as const,
      weight: 'bold' as const,
      color: 'primary' as const,
      align: 'left' as const,
      element: 'h1' as const,
    },
    'projects-grid-title': {
      size: '2xl' as const,
      weight: 'bold' as const,
      color: 'primary' as const,
      align: 'left' as const,
      element: 'h2' as const,
    },
    'project-card-title': {
      size: '2xl' as const,
      weight: 'bold' as const,
      color: 'accent' as const,
      align: 'left' as const,
      element: 'h2' as const,
    },
    'project-section-label': {
      size: 'sm' as const,
      weight: 'semibold' as const,
      color: 'muted' as const,
      align: 'left' as const,
      element: 'h3' as const,
    },
  }

  // Use legacy mapping if variant is provided, otherwise use new props
  const config = variant
    ? legacyVariantMappings[variant]
    : { size, weight, color, align, element: 'h2' }
  const finalSize = variant ? config.size : size
  const finalWeight = variant ? config.weight : weight
  const finalColor = variant ? config.color : color
  const finalAlign = variant ? config.align : align

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

  // Special handling for variant-specific styles that don't map cleanly
  const getVariantSpecificStyles = () => {
    if (!variant) return ''

    switch (variant) {
      case 'logo':
        return 'hover:text-gray-300 transition-colors'
      case 'blog-hero-title':
        return 'mb-6 leading-tight'
      case 'blog-card-title':
        return 'mb-3 line-clamp-2'
      case 'section-title':
        return 'mb-6'
      case 'section-title-compact':
        return 'mt-12 mb-4'
      case 'section-label-small':
        return 'mb-6'
      case 'subsection-label':
        return 'uppercase tracking-[0.1em] letter-spacing-wide'
      case 'card-title':
        return 'mb-2 leading-tight group-hover:text-white transition-colors duration-300'
      case 'footer-author':
        return 'mb-4'
      case 'footer-section':
        return 'mb-4'
      case 'projects-hero-title':
        return 'mb-6'
      case 'projects-grid-title':
        return 'mb-4'
      case 'project-card-title':
        return 'group-hover:text-white transition-all duration-500'
      case 'project-section-label':
        return 'uppercase tracking-wider'
      default:
        return ''
    }
  }

  // Additional styles for specific variants
  const getAdditionalStyles = () => {
    if (!variant) return ''

    // Handle special cases that need exact color matching
    switch (variant) {
      case 'footer-author':
      case 'footer-section':
        return 'text-[#ffffff]'
      default:
        return ''
    }
  }

  const Component = as || (variant ? config.element : 'h2')

  const combinedClasses = [
    sizeStyles[finalSize],
    weightStyles[finalWeight],
    finalColor === 'primary' && getAdditionalStyles()
      ? getAdditionalStyles()
      : colorStyles[finalColor],
    alignmentStyles[finalAlign],
    getVariantSpecificStyles(),
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return <Component className={combinedClasses}>{children}</Component>
}
