import { ReactNode, HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  variant?: 'card-section' | 'vertical-gradient' | 'horizontal-gradient'
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
    'horizontal-gradient': 'flex items-center gap-4 justify-center',
  }

  const combinedClasses = `${variantClasses[variant]} ${className}`.trim()

  return (
    <div className={combinedClasses} {...props}>
      {variant === 'horizontal-gradient' ? (
        <>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-gray-600 to-transparent" />
          {children}
        </>
      ) : (
        children
      )}
    </div>
  )
}
