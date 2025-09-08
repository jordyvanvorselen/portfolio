import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link'
type ButtonColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'muted'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface BaseButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
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
        : 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white shadow shadow-teal-500/20 transition-all duration-300',
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
        : 'bg-slate-900/15 hover:bg-slate-800/15 text-white border-2 border-gray-500/30',
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
    muted: {
      solid: disabled
        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700',
      outline: disabled
        ? 'border border-gray-200 text-gray-400 cursor-not-allowed'
        : 'border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200',
      ghost: disabled
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700 active:bg-gray-200',
      link: disabled
        ? 'text-gray-400 cursor-not-allowed'
        : 'text-gray-600 hover:text-gray-700 active:text-gray-800 underline-offset-4 hover:underline',
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
    'inline-flex items-center justify-center transition-all duration-300 click-feedback'

  const sizeConfig = {
    xs: 'h-8 px-3 text-xs font-medium rounded-md',
    sm: 'h-9 px-4 text-sm font-medium rounded-md',
    md: 'px-4 py-2 text-base font-medium rounded-lg',
    lg: 'px-6 py-3 text-lg font-medium rounded-lg',
    xl: 'px-8 md:px-12 lg:px-18 py-4 md:py-5 lg:py-7 text-lg md:text-xl lg:text-2xl font-bold rounded-lg lg:rounded-xl',
  }

  // Remove default padding for link variant
  if (variant === 'link') {
    const linkSizes = {
      xs: 'text-xs font-medium',
      sm: 'text-sm font-medium',
      md: 'text-base font-medium',
      lg: 'text-lg font-medium',
      xl: 'text-lg md:text-xl lg:text-2xl font-bold',
    }
    return `${baseStyles} ${linkSizes[size]}`
  }

  return `${baseStyles} ${sizeConfig[size]}`
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
    const variantStyles = getVariantStyles(variant, color, disabled)
    const sizeStyles = getSizeStyles(size, variant)

    const baseClassName =
      `${sizeStyles} ${variantStyles} ${className || ''}`.trim()

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
