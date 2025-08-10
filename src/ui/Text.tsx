import { ReactNode } from 'react'

export interface TextProps {
  children: ReactNode
  variant?: 'description' | 'card-description'
  className?: string
}

export function Text({
  children,
  variant = 'description',
  className = '',
}: TextProps): JSX.Element {
  const variantClasses = {
    description:
      'text-lg md:text-xl font-medium text-gray-200/90 text-center leading-relaxed max-w-3xl mx-auto',
    'card-description':
      'text-slate-300 mb-8 leading-relaxed text-[15px] group-hover:text-slate-200 transition-colors duration-300',
  }

  const combinedClasses = `${variantClasses[variant]} ${className}`.trim()

  return <p className={combinedClasses}>{children}</p>
}
