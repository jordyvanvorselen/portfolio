import { LucideIcon } from 'lucide-react'

export interface SocialIconProps {
  href: string
  label: string
  icon: LucideIcon
  variant?: 'simple' | 'button' | 'footer'
  className?: string
}

export const SocialIcon = ({
  href,
  label,
  icon: Icon,
  variant = 'simple',
  className = '',
}: SocialIconProps) => {
  const baseClasses = 'transition-colors duration-200'

  const variantClasses = {
    simple:
      'text-gray-400 hover:text-white transition-all duration-300 p-2 hover:bg-gray-800 rounded-full backdrop-blur-sm',
    button:
      'flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500/30 text-gray-300 hover:text-white hover:border-gray-400/50',
    footer:
      'flex items-center text-[#cbd5e1] hover:text-white transition-colors',
  }

  const iconClasses = variant === 'footer' ? 'w-5 h-5 mr-3' : 'w-5 h-5'

  const combinedClasses =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={combinedClasses}
    >
      <Icon className={iconClasses} />
      {variant === 'footer' && label}
    </a>
  )
}
