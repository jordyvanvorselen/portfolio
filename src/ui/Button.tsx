import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

interface BaseButtonProps {
  children: React.ReactNode
  variant?:
    | 'primary'
    | 'secondary'
    | 'cta'
    | 'footer-action'
    | 'project-primary'
    | 'project-secondary'
    | 'github'
    | 'demo'
  size?: 'small' | 'large'
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

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    { children, className, variant = 'primary', size = 'small', ...props },
    ref
  ) => {
    const variantStyles = {
      primary:
        size === 'large'
          ? 'bg-teal-500 hover:bg-teal-600 text-white border-transparent shadow-xl shadow-teal-500/25'
          : 'bg-blue-500 text-white hover:bg-blue-600',
      secondary:
        size === 'large'
          ? 'bg-slate-900/15 hover:bg-slate-800/15 text-white border-2 border-gray-500/30'
          : 'bg-gray-500 text-white hover:bg-gray-600',
      cta: 'bg-teal-500 hover:bg-teal-600 text-white shadow shadow-teal-500/20 h-9 px-4 py-2 w-full rounded-md text-sm font-medium',
      'footer-action':
        'text-[#cbd5e1] hover:text-white h-8 px-3 text-xs hover:bg-accent rounded-md',
      'project-primary':
        'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-teal-500/25 transition-all duration-300',
      'project-secondary':
        'border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300',
      github:
        'bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:bg-teal-500/30 hover:text-teal-200 transition-all duration-300 rounded-full px-6 h-9 py-2',
      demo: 'text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 rounded-full px-6 h-9 py-2',
    }

    const sizeStyles = {
      small: 'px-4 py-2 text-base rounded-lg',
      large:
        'px-8 md:px-12 lg:px-18 py-4 md:py-5 lg:py-7 text-lg md:text-xl lg:text-2xl font-bold rounded-lg lg:rounded-xl',
    }

    const baseClassName = `inline-flex items-center justify-center transition-colors duration-200 cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className || ''}`

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
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
