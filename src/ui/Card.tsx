import { ReactNode } from 'react'

type CardVariant = 'elevated' | 'outlined' | 'filled' | 'glass'
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl'
type CardInteractive = 'static' | 'hover' | 'clickable'
type CardBorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl'

interface CardProps {
  children: ReactNode
  'aria-label'?: string
  variant?: CardVariant
  padding?: CardPadding
  interactive?: CardInteractive
  borderRadius?: CardBorderRadius
  className?: string
}

export const Card = ({
  children,
  'aria-label': ariaLabel,
  variant = 'glass',
  padding = 'lg',
  interactive = 'hover',
  borderRadius = 'xl',
  className = '',
}: CardProps) => {
  // Variant styles
  const variantStyles = {
    elevated: 'bg-white text-gray-900 shadow-lg border border-gray-200',
    outlined: 'bg-transparent text-white border-2 border-gray-300',
    filled: 'bg-gray-800 text-white shadow border border-gray-700',
    glass:
      'bg-gray-900/50 text-card-foreground shadow border border-gray-800 hover:border-gray-700 backdrop-blur-sm group relative overflow-hidden',
  }

  // Padding styles
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  }

  // Interactive styles
  const interactiveStyles = {
    static: '',
    hover: 'transition-all duration-500 hover:transform hover:scale-[1.02]',
    clickable:
      'transition-all duration-500 hover:transform hover:scale-[1.02] cursor-pointer',
  }

  // Border radius styles
  const borderRadiusStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  }

  // Combine all classes
  const combinedClasses = [
    borderRadiusStyles[borderRadius],
    variantStyles[variant],
    interactiveStyles[interactive],
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  // Special glass variant gradient overlay
  const glassOverlay = variant === 'glass' && (
    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
  )

  return (
    <article aria-label={ariaLabel} className={combinedClasses}>
      {glassOverlay}
      <div
        className={`${paddingStyles[padding]} relative z-10 h-full flex flex-col`}
      >
        {children}
      </div>
    </article>
  )
}
