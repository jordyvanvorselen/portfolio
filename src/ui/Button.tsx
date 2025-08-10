import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'footer-cta' | 'footer-action'
  size?: 'small' | 'large'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      'footer-cta':
        'bg-[#14b8a6] hover:bg-[#0ea5e9] text-white shadow h-9 px-4 py-2 w-full rounded-md text-sm font-medium',
      'footer-action':
        'text-[#cbd5e1] hover:text-white h-8 px-3 text-xs hover:bg-accent rounded-md',
    }

    const sizeStyles = {
      small: 'px-4 py-2 text-base rounded',
      large:
        'px-8 md:px-12 lg:px-18 py-4 md:py-5 lg:py-7 text-lg md:text-xl lg:text-2xl font-bold rounded-lg lg:rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center transition-colors duration-200 cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${className || ''}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
