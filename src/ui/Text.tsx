import { ReactNode, CSSProperties } from 'react'

export interface TextProps {
  children: ReactNode
  variant?:
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
  className?: string
  style?: CSSProperties
}

export const Text = ({
  children,
  variant = 'description',
  className = '',
  style,
}: TextProps) => {
  const variantClasses = {
    description:
      'text-lg md:text-xl font-medium text-gray-300 text-center leading-relaxed max-w-3xl mx-auto',
    'description-compact':
      'text-base md:text-lg font-medium text-gray-300 text-center leading-relaxed max-w-2xl mx-auto mb-4',
    'blog-hero-subtitle':
      'text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8',
    'blog-card-description': 'text-gray-300 leading-relaxed mb-4 line-clamp-3',
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
