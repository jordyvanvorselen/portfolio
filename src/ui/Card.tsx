import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  'aria-label'?: string
  className?: string
}

export const Card = ({
  children,
  'aria-label': ariaLabel,
  className = '',
}: CardProps) => {
  const combinedClasses = [
    'rounded-xl',
    'bg-gray-900/50',
    'text-card-foreground',
    'shadow',
    'border',
    'border-gray-800',
    'hover:border-gray-700',
    'backdrop-blur-sm',
    'group',
    'relative',
    'overflow-hidden',
    'transition-all',
    'duration-500',
    'hover:transform',
    'hover:scale-[1.02]',
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <article aria-label={ariaLabel} className={combinedClasses}>
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="p-8 relative z-10 h-full flex flex-col">{children}</div>
    </article>
  )
}
