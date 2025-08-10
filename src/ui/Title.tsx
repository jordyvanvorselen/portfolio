import { ReactNode, ElementType } from 'react'

interface TitleProps {
  children: ReactNode
  variant?: 'logo' | 'hero-name' | 'hero-title' | 'section-title' | 'subsection-label' | 'card-title'
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
    'section-title':
      'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6',
    'subsection-label':
      'text-xs font-bold text-slate-400 uppercase tracking-[0.1em] letter-spacing-wide',
    'card-title':
      'text-2xl font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors duration-300',
  }

  const defaultElements = {
    logo: 'span',
    'hero-name': 'h1',
    'hero-title': 'p',
    'section-title': 'h2',
    'subsection-label': 'h4',
    'card-title': 'h3',
  }

  const Component = as || defaultElements[variant]
  const combinedClasses = `${variantStyles[variant]} ${className}`.trim()

  return <Component className={combinedClasses}>{children}</Component>
}
