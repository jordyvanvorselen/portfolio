import { ReactNode, HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  variant?: 'card-section'
}

export const Divider = ({
  children,
  variant = 'card-section',
  className = '',
  ...props
}: DividerProps) => {
  const variantClasses = {
    'card-section': 'border-t border-slate-700/50 pt-6',
  }

  const combinedClasses = `${variantClasses[variant]} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  )
}
