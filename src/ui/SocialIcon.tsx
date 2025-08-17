import { LucideIcon } from 'lucide-react'

// Design system types
export type SocialIconVariant = 'icon' | 'button' | 'text'
export type SocialIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SocialIconColor = 'primary' | 'secondary' | 'muted' | 'accent'
export type SocialIconInteractive = 'static' | 'hover'

export interface SocialIconProps {
  href: string
  label: string
  icon: LucideIcon
  variant?: SocialIconVariant
  size?: SocialIconSize
  color?: SocialIconColor
  interactive?: SocialIconInteractive
  className?: string
}

export const SocialIcon = ({
  href,
  label,
  icon: Icon,
  variant = 'icon',
  size = 'md',
  color = 'primary',
  interactive = 'hover',
  className,
}: SocialIconProps) => {
  // Base classes
  const baseClasses = 'transition-colors duration-200'

  // Variant classes
  const variantClasses = {
    icon: '',
    button: 'flex items-center justify-center rounded-full border-2',
    text: 'flex items-center',
  }

  // Size classes
  const sizeClasses = {
    xs: variant === 'button' ? 'w-8 h-8' : '',
    sm: variant === 'button' ? 'w-10 h-10' : '',
    md: variant === 'button' ? 'w-12 h-12' : '',
    lg: variant === 'button' ? 'w-14 h-14' : '',
    xl: variant === 'button' ? 'w-16 h-16' : '',
  }

  // Icon size classes
  const iconSizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  }

  // Color classes
  const colorClasses = {
    primary: getColorVariantClasses('primary', variant, interactive),
    secondary: getColorVariantClasses('secondary', variant, interactive),
    muted: getColorVariantClasses('muted', variant, interactive),
    accent: getColorVariantClasses('accent', variant, interactive),
  }

  function getColorVariantClasses(
    colorName: SocialIconColor,
    variantName: SocialIconVariant,
    interactiveType: SocialIconInteractive
  ): string {
    const isHover = interactiveType === 'hover'

    const colorMap = {
      primary: {
        icon: isHover ? 'text-blue-600 hover:text-blue-700' : 'text-blue-600',
        button: isHover
          ? 'text-blue-600 border-blue-600 hover:text-blue-700 hover:border-blue-700'
          : 'text-blue-600 border-blue-600',
        text: isHover ? 'text-blue-600 hover:text-blue-700' : 'text-blue-600',
      },
      secondary: {
        icon: isHover ? 'text-[#cbd5e1] hover:text-white' : 'text-[#cbd5e1]',
        button: isHover
          ? 'text-[#cbd5e1] border-[#cbd5e1] hover:text-white hover:border-white'
          : 'text-[#cbd5e1] border-[#cbd5e1]',
        text: isHover ? 'text-[#cbd5e1] hover:text-white' : 'text-[#cbd5e1]',
      },
      muted: {
        icon: isHover ? 'text-gray-400 hover:text-white' : 'text-gray-400',
        button: isHover
          ? 'text-gray-300 border-gray-500/30 hover:text-white hover:border-gray-400/50'
          : 'text-gray-300 border-gray-500/30',
        text: isHover ? 'text-gray-400 hover:text-white' : 'text-gray-400',
      },
      accent: {
        icon: isHover
          ? 'text-purple-600 hover:text-purple-700'
          : 'text-purple-600',
        button: isHover
          ? 'text-purple-600 border-purple-600 hover:text-purple-700 hover:border-purple-700'
          : 'text-purple-600 border-purple-600',
        text: isHover
          ? 'text-purple-600 hover:text-purple-700'
          : 'text-purple-600',
      },
    }

    return colorMap[colorName][variantName]
  }

  // Icon spacing for text variant
  const iconSpacing = variant === 'text' ? 'mr-3' : ''

  const iconClasses = [iconSizeClasses[size], iconSpacing]
    .filter(Boolean)
    .join(' ')

  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    colorClasses[color],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={combinedClasses}
    >
      <Icon className={iconClasses} />
      {variant === 'text' && label}
    </a>
  )
}
