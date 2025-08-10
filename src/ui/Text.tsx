import { ReactNode, CSSProperties } from 'react'

export interface TextProps {
  children: ReactNode
  variant?:
    | 'description'
    | 'description-compact'
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
      'text-lg md:text-xl font-medium text-gray-200/90 text-center leading-relaxed max-w-3xl mx-auto',
    'description-compact':
      'text-base md:text-lg font-medium text-gray-200/90 text-center leading-relaxed max-w-2xl mx-auto mb-4',
    'card-description':
      'text-slate-300 mb-8 leading-relaxed text-[15px] group-hover:text-slate-200 transition-colors duration-300 text-left',
    'publication-number': 'text-4xl font-bold',
    'publication-label': 'text-lg font-semibold text-slate-100',
    'publication-description': 'text-sm text-slate-400',
    'call-to-action-question': 'text-[#cbd5e1] mb-6',
    'call-to-action-availability': 'font-semibold',
    'footer-description': 'text-[#cbd5e1] mb-6 max-w-md',
    'footer-info': 'text-[#cbd5e1] text-sm',
    'footer-copyright': 'text-[#cbd5e1] text-sm',
    'footer-availability': 'text-[#10b981] text-sm',
  }

  const combinedClasses = `${variantClasses[variant]} ${className}`.trim()

  return (
    <p className={combinedClasses} style={style}>
      {children}
    </p>
  )
}
