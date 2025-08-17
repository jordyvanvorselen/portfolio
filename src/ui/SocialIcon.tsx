import { LucideIcon } from 'lucide-react'

// Design system types
export type SocialIconVariant = 'icon' | 'button' | 'text'
export type SocialIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SocialIconColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
export type SocialIconInteractive = 'static' | 'hover'

export interface SocialIconProps {
  href: string
  label: string
  icon: LucideIcon
  variant?: 'simple' | 'button' | 'footer' | SocialIconVariant
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
  color = 'muted',
  interactive = 'hover',
  className,
}: SocialIconProps) => {
  // Legacy variant mapping for backward compatibility
  const getLegacyMapping = (legacyVariant: string) => {
    switch (legacyVariant) {
      case 'simple':
        return {
          variant: 'icon' as const,
          size: 'md' as const,
          color: 'muted' as const,
        }
      case 'button':
        return {
          variant: 'button' as const,
          size: 'lg' as const,
          color: 'muted' as const,
        }
      case 'footer':
        return {
          variant: 'text' as const,
          size: 'md' as const,
          color: 'secondary' as const,
        }
      default:
        return null
    }
  }

  // Determine if we're using legacy variants or new design system
  const isLegacyVariant = ['simple', 'button', 'footer'].includes(
    variant as string
  )
  const isUsingNewDesignSystem =
    !isLegacyVariant ||
    size !== 'md' ||
    color !== 'muted' ||
    interactive !== 'hover'

  // Apply legacy mapping only if using legacy variants AND default new props
  const legacyMapping =
    isLegacyVariant && !isUsingNewDesignSystem
      ? getLegacyMapping(variant as string)
      : null

  // If legacy mapping is used, use those values, otherwise use new design system
  let finalVariant: SocialIconVariant
  let finalSize: SocialIconSize
  let finalColor: SocialIconColor

  if (legacyMapping) {
    finalVariant = legacyMapping.variant
    finalSize = legacyMapping.size
    finalColor = legacyMapping.color
  } else {
    // Use new design system - if variant is legacy, map to appropriate new variant
    if (variant === 'simple') {
      finalVariant = 'icon'
    } else if (variant === 'button') {
      finalVariant = 'button'
    } else if (variant === 'footer') {
      finalVariant = 'text'
    } else {
      finalVariant = variant as SocialIconVariant
    }
    finalSize = size
    finalColor = color
  }

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
    xs: finalVariant === 'button' ? 'w-8 h-8' : '',
    sm: finalVariant === 'button' ? 'w-10 h-10' : '',
    md: finalVariant === 'button' ? 'w-12 h-12' : '',
    lg: finalVariant === 'button' ? 'w-14 h-14' : '',
    xl: finalVariant === 'button' ? 'w-16 h-16' : '',
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
    default: getColorVariantClasses('default', finalVariant, interactive),
    primary: getColorVariantClasses('primary', finalVariant, interactive),
    secondary: getColorVariantClasses('secondary', finalVariant, interactive),
    muted: getColorVariantClasses('muted', finalVariant, interactive),
    accent: getColorVariantClasses('accent', finalVariant, interactive),
  }

  function getColorVariantClasses(
    colorName: SocialIconColor,
    variantName: SocialIconVariant,
    interactiveType: SocialIconInteractive
  ): string {
    const isHover = interactiveType === 'hover'

    const colorMap = {
      default: {
        icon: isHover ? 'text-gray-900 hover:text-black' : 'text-gray-900',
        button: isHover
          ? 'text-gray-900 border-gray-300 hover:text-black hover:border-gray-400'
          : 'text-gray-900 border-gray-300',
        text: isHover ? 'text-gray-900 hover:text-black' : 'text-gray-900',
      },
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
  const iconSpacing = finalVariant === 'text' ? 'mr-3' : ''

  const iconClasses = [iconSizeClasses[finalSize], iconSpacing]
    .filter(Boolean)
    .join(' ')

  const combinedClasses = [
    baseClasses,
    variantClasses[finalVariant],
    sizeClasses[finalSize],
    colorClasses[finalColor],
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
      {finalVariant === 'text' && label}
    </a>
  )
}
