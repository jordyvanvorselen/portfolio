import { ReactNode } from 'react'

export interface TextProps {
  children: ReactNode
  variant?:
    | 'description'
    | 'card-description'
    | 'publication-number'
    | 'publication-label'
    | 'publication-description'
  className?: string
}

export const Text = ({
  children,
  variant = 'description',
  className = '',
}: TextProps) => {
  const variantClasses = {
    description:
      'text-lg md:text-xl font-medium text-gray-200/90 text-center leading-relaxed max-w-3xl mx-auto',
    'card-description':
      'text-slate-300 mb-8 leading-relaxed text-[15px] group-hover:text-slate-200 transition-colors duration-300 text-left',
    'publication-number': 'text-4xl font-bold text-[#10b981]',
    'publication-label': 'text-lg font-semibold text-slate-300',
    'publication-description': 'text-sm text-slate-400',
  }

  const combinedClasses = `${variantClasses[variant]} ${className}`.trim()

  return <p className={combinedClasses}>{children}</p>
}
