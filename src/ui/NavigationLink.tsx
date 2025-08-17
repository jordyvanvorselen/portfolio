import Link from 'next/link'

// Design system types
type DesignVariant = 'default' | 'active' | 'muted'
type DesignSize = 'sm' | 'md' | 'lg'
type DesignColor = 'primary' | 'secondary' | 'muted' | 'accent'

// Legacy types for backward compatibility
type LegacyVariant = 'desktop' | 'mobile' | 'footer'

interface BaseNavigationLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

interface DesignSystemProps extends BaseNavigationLinkProps {
  variant?: DesignVariant
  size?: DesignSize
  color?: DesignColor
}

interface LegacyProps extends BaseNavigationLinkProps {
  variant?: LegacyVariant
}

type NavigationLinkProps = DesignSystemProps | LegacyProps

// Style configurations extracted as constants for maintainability
const LEGACY_VARIANT_STYLES: Record<LegacyVariant, string> = {
  desktop: 'text-gray-300 hover:text-white transition-colors font-medium',
  mobile:
    'text-gray-300 hover:text-white transition-colors font-medium text-sm',
  footer: 'block text-gray-300 hover:text-white transition-colors',
} as const

const DESIGN_VARIANT_STYLES: Record<DesignVariant, string> = {
  default: 'hover:text-white transition-colors',
  active: 'text-white font-semibold',
  muted: 'text-gray-500 hover:text-gray-400',
} as const

const SIZE_STYLES: Record<DesignSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const

const COLOR_STYLES: Record<DesignColor, string> = {
  primary: 'text-gray-300',
  secondary: 'text-gray-400',
  muted: 'text-gray-500',
  accent: 'text-teal-400',
} as const

const isLegacyVariant = (variant: string): variant is LegacyVariant => {
  return (Object.keys(LEGACY_VARIANT_STYLES) as LegacyVariant[]).includes(
    variant as LegacyVariant
  )
}

const combineClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(' ').trim()
}

export const NavigationLink = ({
  href,
  children,
  className = '',
  ...props
}: NavigationLinkProps) => {
  // Handle legacy variants for backward compatibility
  if ('variant' in props && props.variant && isLegacyVariant(props.variant)) {
    const combinedClasses = combineClasses(
      LEGACY_VARIANT_STYLES[props.variant],
      className
    )

    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  // Handle design system props
  const designProps = props as DesignSystemProps
  const variant = designProps.variant ?? 'default'
  const size = designProps.size ?? 'md'
  const color = designProps.color ?? 'primary'

  const combinedClasses = combineClasses(
    DESIGN_VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    COLOR_STYLES[color],
    className
  )

  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  )
}
