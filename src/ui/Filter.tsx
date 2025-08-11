import { ReactNode } from 'react'

interface FilterProps {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export const Filter = ({
  children,
  active = false,
  onClick,
  className = '',
}: FilterProps) => {
  const baseStyles =
    'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-8 rounded-md px-3 text-xs cursor-pointer'

  const variantStyles = active
    ? 'bg-teal-500 hover:bg-teal-600 text-white shadow'
    : 'border border-gray-600 text-gray-300 hover:text-white hover:border-teal-500 bg-transparent shadow-sm hover:bg-accent'

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
