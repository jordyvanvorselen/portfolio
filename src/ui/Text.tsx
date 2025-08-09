import { ReactNode } from 'react'

export interface TextProps {
  children: ReactNode
  variant?: 'description'
  className?: string
}

export function Text({
  children,
  variant = 'description',
  className = '',
}: TextProps): JSX.Element {
  const baseClasses =
    'text-lg md:text-xl font-medium text-gray-200/90 text-center leading-relaxed'

  const variantClasses = {
    description: 'max-w-3xl mx-auto',
  }

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return <p className={combinedClasses}>{children}</p>
}
