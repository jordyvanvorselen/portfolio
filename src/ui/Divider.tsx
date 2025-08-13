import { ReactNode, HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  variant?: 'card-section' | 'vertical-gradient'
}

export const Divider = ({
  children,
  variant = 'card-section',
  className = '',
  ...props
}: DividerProps) => {
  const variantClasses = {
    'card-section': 'border-t border-slate-700/50 pt-6',
    'vertical-gradient':
      'w-px h-16 bg-gradient-to-b from-transparent via-gray-600 to-transparent',
  }

  const combinedClasses = `${variantClasses[variant]} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}
