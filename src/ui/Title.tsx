import { ReactNode, ElementType } from 'react'

interface TitleProps {
  children: ReactNode
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
  as?: ElementType
  className?: string
}

export const Title = ({
  children,
  variant = 'logo',
  as,
  className = '',
}: TitleProps) => {
  const variantStyles = {
    logo: 'text-xl md:text-2xl font-bold text-white hover:text-gray-300 transition-colors',
    'hero-name':
      'text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center',
    'hero-title':
      'text-2xl md:text-3xl lg:text-4xl text-gray-200/95 text-center',
    'blog-hero-title':
      'text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent',
    'blog-card-title':
      'text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors duration-300 line-clamp-2',
    'section-title':
      'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6',
    'section-title-compact':
      'text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-12 mb-4',
    'section-label-small':
      'text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6',
    'subsection-label':
      'text-xs font-bold text-slate-400 uppercase tracking-[0.1em] letter-spacing-wide text-left',
    'card-title':
      'text-2xl font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors duration-300 text-left',
    'footer-author': 'text-2xl font-bold text-[#ffffff] mb-4',
    'footer-section': 'text-lg font-semibold text-[#ffffff] mb-4',
  }

  const defaultElements = {
    logo: 'span',
    'hero-name': 'h1',
    'hero-title': 'p',
    'blog-hero-title': 'h1',
    'blog-card-title': 'h3',
    'section-title': 'h2',
    'section-title-compact': 'h2',
    'section-label-small': 'h3',
    'subsection-label': 'h4',
    'card-title': 'h3',
    'footer-author': 'h3',
    'footer-section': 'h4',
  }

  const Component = as || defaultElements[variant]
  const combinedClasses = `${variantStyles[variant]} ${className}`.trim()

  return <Component className={combinedClasses}>{children}</Component>
}
