import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'
type ButtonColor = 'primary' | 'secondary' | 'danger' | 'neutral' | 'accent'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface BaseButtonProps {
  children: React.ReactNode
  variant?:
    | ButtonVariant
    | 'primary'
    | 'primary-blue'
    | 'secondary'
    | 'footer-action'
    | 'project-secondary'
    | 'github'
    | 'demo'
  color?: ButtonColor
  size?: ButtonSize | 'small' | 'large'
  disabled?: boolean
  className?: string
}

interface ButtonAsButton
  extends BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never
}

interface ButtonAsLink
  extends BaseButtonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> {
  href: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink

// Design system utility functions
const getVariantStyles = (
  variant: ButtonVariant,
  color: ButtonColor,
  disabled?: boolean
) => {
  const colorConfig = {
    primary: {
      solid: disabled
        ? 'bg-teal-300 text-white cursor-not-allowed'
        : 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white shadow shadow-teal-500/20',
      outline: disabled
        ? 'border border-teal-300 text-teal-300 cursor-not-allowed'
        : 'border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600',
      ghost: disabled
        ? 'text-teal-300 cursor-not-allowed'
        : 'text-teal-500 hover:bg-teal-500/10 hover:text-teal-600 active:bg-teal-500/20',
      link: disabled
        ? 'text-teal-300 cursor-not-allowed'
        : 'text-teal-500 hover:text-teal-600 active:text-teal-700 underline-offset-4 hover:underline',
    },
    secondary: {
      solid: disabled
        ? 'bg-gray-300 text-white cursor-not-allowed'
        : 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white',
      outline: disabled
        ? 'border border-gray-300 text-gray-300 cursor-not-allowed'
        : 'border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600',
      ghost: disabled
        ? 'text-gray-300 cursor-not-allowed'
        : 'text-gray-500 hover:bg-gray-500/10 hover:text-gray-600 active:bg-gray-500/20',
      link: disabled
        ? 'text-gray-300 cursor-not-allowed'
        : 'text-gray-500 hover:text-gray-600 active:text-gray-700 underline-offset-4 hover:underline',
    },
    danger: {
      solid: disabled
        ? 'bg-red-300 text-white cursor-not-allowed'
        : 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white',
      outline: disabled
        ? 'border border-red-300 text-red-300 cursor-not-allowed'
        : 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-600',
      ghost: disabled
        ? 'text-red-300 cursor-not-allowed'
        : 'text-red-500 hover:bg-red-500/10 hover:text-red-600 active:bg-red-500/20',
      link: disabled
        ? 'text-red-300 cursor-not-allowed'
        : 'text-red-500 hover:text-red-600 active:text-red-700 underline-offset-4 hover:underline',
    },
    neutral: {
      solid: disabled
        ? 'bg-slate-300 text-white cursor-not-allowed'
        : 'bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white',
      outline: disabled
        ? 'border border-gray-300 text-gray-300 cursor-not-allowed'
        : 'border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 active:bg-gray-900',
      ghost: disabled
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-gray-300 hover:text-white hover:bg-gray-800/50 active:bg-gray-800/70',
      link: disabled
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-gray-300 hover:text-white underline-offset-4 hover:underline',
    },
    accent: {
      solid: disabled
        ? 'bg-blue-300 text-white cursor-not-allowed'
        : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white',
      outline: disabled
        ? 'border border-teal-300 text-teal-300 cursor-not-allowed'
        : 'bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 hover:text-teal-200 active:bg-teal-500/40',
      ghost: disabled
        ? 'text-blue-300 cursor-not-allowed'
        : 'text-blue-500 hover:bg-blue-500/10 hover:text-blue-600 active:bg-blue-500/20',
      link: disabled
        ? 'text-blue-300 cursor-not-allowed'
        : 'text-blue-500 hover:text-blue-600 active:text-blue-700 underline-offset-4 hover:underline',
    },
  }

  return colorConfig[color][variant]
}

const getSizeStyles = (size: ButtonSize, variant: ButtonVariant) => {
  const baseStyles =
    'inline-flex items-center justify-center transition-all duration-300 font-medium'

  const sizeConfig = {
    xs: 'h-8 px-3 text-xs rounded-md',
    sm: 'h-9 px-4 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg',
    xl: 'px-8 md:px-12 lg:px-18 py-4 md:py-5 lg:py-7 text-lg md:text-xl lg:text-2xl font-bold rounded-lg lg:rounded-xl',
  }

  // Remove default padding for link variant
  if (variant === 'link') {
    const linkSizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-lg md:text-xl lg:text-2xl font-bold',
    }
    return `${baseStyles} ${linkSizes[size]}`
  }

  return `${baseStyles} ${sizeConfig[size]}`
}

// Legacy variant mapping function
const mapLegacyVariant = (
  variant: string,
  size?: string
): { variant: ButtonVariant; color: ButtonColor; mappedSize: ButtonSize } => {
  const legacyMap: Record<
    string,
    { variant: ButtonVariant; color: ButtonColor; size?: ButtonSize }
  > = {
    primary: { variant: 'solid', color: 'primary' },
    'primary-blue': { variant: 'solid', color: 'accent' },
    secondary: { variant: 'solid', color: 'secondary' },
    'footer-action': { variant: 'ghost', color: 'neutral', size: 'xs' },
    'project-secondary': { variant: 'outline', color: 'neutral' },
    github: { variant: 'outline', color: 'accent' },
    demo: { variant: 'ghost', color: 'neutral' },
  }

  const mapped = legacyMap[variant] || {
    variant: 'solid' as ButtonVariant,
    color: 'primary' as ButtonColor,
  }

  // Handle size mapping
  let mappedSize: ButtonSize = mapped.size || 'md'
  if (size === 'small') mappedSize = 'md'
  if (size === 'large') mappedSize = 'xl'

  return { variant: mapped.variant, color: mapped.color, mappedSize }
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      children,
      className,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      disabled = false,
      ...props
    },
    ref
  ) => {
    // Handle legacy variants
    let finalVariant: ButtonVariant = variant as ButtonVariant
    let finalColor: ButtonColor = color
    let finalSize: ButtonSize = size as ButtonSize

    // Check if this is a legacy variant or unknown variant
    const legacyVariants = [
      'primary',
      'primary-blue',
      'secondary',
      'footer-action',
      'project-secondary',
      'github',
      'demo',
    ]
    const isNewVariant = ['solid', 'outline', 'ghost', 'link'].includes(
      variant as string
    )

    if (legacyVariants.includes(variant as string) || !isNewVariant) {
      const mapped = mapLegacyVariant(variant as string, size as string)
      finalVariant = mapped.variant
      finalColor = mapped.color
      finalSize = mapped.mappedSize
    } else if (size === 'small' || size === 'large') {
      // Handle legacy size mapping for new variants
      finalSize = size === 'small' ? 'md' : 'xl'
    }

    const variantStyles = getVariantStyles(finalVariant, finalColor, disabled)
    const sizeStyles = getSizeStyles(finalSize, finalVariant)

    // Special handling for github and demo variants (rounded-full)
    const specialRounding =
      variant === 'github' || variant === 'demo' ? 'rounded-full' : ''

    // Special handling for large secondary variant
    const specialStyles =
      variant === 'secondary' && size === 'large'
        ? 'bg-slate-900/15 hover:bg-slate-800/15 text-white border-2 border-gray-500/30'
        : ''

    // Special handling for primary-blue large variant
    const primaryBlueSpecial =
      variant === 'primary-blue' && size === 'large'
        ? 'bg-teal-500 hover:bg-teal-600 text-white border-transparent shadow-xl shadow-teal-500/25'
        : ''

    const baseClassName =
      `${sizeStyles} ${specialStyles || primaryBlueSpecial || variantStyles} ${specialRounding} ${className || ''}`.trim()

    if ('href' in props && props.href) {
      const { href, ...anchorProps } = props as ButtonAsLink

      // Use Next.js Link for internal routes, regular anchor for external links
      const isInternalLink = href.startsWith('/') || href.startsWith('#')

      if (isInternalLink) {
        // Filter out undefined optional properties for Next.js Link
        const filteredProps = Object.fromEntries(
          Object.entries(anchorProps).filter(([, value]) => value !== undefined)
        )

        return (
          <Link
            href={href}
            ref={ref as React.ForwardedRef<HTMLAnchorElement>}
            className={baseClassName}
            {...filteredProps}
          >
            {children}
          </Link>
        )
      }

      return (
        <a
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          className={baseClassName}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...anchorProps}
        >
          {children}
        </a>
      )
    }

    const buttonProps = props as ButtonAsButton
    return (
      <button
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        className={baseClassName}
        disabled={disabled}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
