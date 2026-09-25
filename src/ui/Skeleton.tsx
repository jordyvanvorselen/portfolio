interface SkeletonProps {
  className?: string
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const roundedClasses = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

export const Skeleton = ({ className = '', rounded = 'md' }: SkeletonProps) => (
  <div
    aria-hidden="true"
    data-testid="skeleton"
    className={`animate-pulse bg-gray-800 ${roundedClasses[rounded]} ${className}`}
  />
)
