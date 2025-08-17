'use client'

import { ArrowUp } from 'lucide-react'

type BackToTopButtonVariant = 'ghost' | 'outline' | 'solid'
type BackToTopButtonColor = 'neutral' | 'primary' | 'secondary'
type BackToTopButtonSize = 'xs' | 'sm' | 'md'

export interface BackToTopButtonProps {
  onClick?: () => void
  variant?: BackToTopButtonVariant
  color?: BackToTopButtonColor
  size?: BackToTopButtonSize
  className?: string
}

const getVariantStyles = (
  variant: BackToTopButtonVariant,
  color: BackToTopButtonColor
) => {
  const colorConfig = {
    neutral: {
      ghost:
        'text-gray-300 hover:text-white hover:bg-gray-800/50 active:bg-gray-800/70',
      outline:
        'border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-500 active:bg-gray-900',
      solid: 'bg-slate-700 hover:bg-slate-800 active:bg-slate-900 text-white',
    },
    primary: {
      ghost:
        'text-teal-500 hover:bg-teal-500/10 hover:text-teal-600 active:bg-teal-500/20',
      outline:
        'border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600',
      solid:
        'bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white shadow shadow-teal-500/20',
    },
    secondary: {
      ghost:
        'text-gray-500 hover:bg-gray-500/10 hover:text-gray-600 active:bg-gray-500/20',
      outline:
        'border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white active:bg-gray-600',
      solid: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white',
    },
  }

  return colorConfig[color][variant]
}

const getSizeStyles = (size: BackToTopButtonSize) => {
  const sizeConfig = {
    xs: 'h-8 px-3 text-xs',
    sm: 'h-9 px-4 text-sm',
    md: 'px-4 py-2 text-base',
  }

  return sizeConfig[size]
}

const getIconSize = (size: BackToTopButtonSize) => {
  const iconSizes = {
    xs: 'w-4 h-4',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  }

  return iconSizes[size]
}

export const BackToTopButton = ({
  onClick,
  variant = 'ghost',
  color = 'neutral',
  size = 'xs',
  className = '',
}: BackToTopButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const baseClasses =
    'inline-flex items-center justify-center transition-all duration-200 cursor-pointer rounded-md font-medium'
  const variantStyles = getVariantStyles(variant, color)
  const sizeStyles = getSizeStyles(size)
  const iconSizeClass = getIconSize(size)

  const combinedClasses = [baseClasses, variantStyles, sizeStyles, className]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <button
      onClick={handleClick}
      className={combinedClasses}
      aria-label="Back to top"
    >
      <ArrowUp className={`${iconSizeClass} mr-1`} />
      Back to top
    </button>
  )
}
