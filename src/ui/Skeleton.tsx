interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div
    aria-hidden="true"
    data-testid="skeleton"
    className={`animate-pulse rounded-md bg-gray-800 ${className}`}
  />
)
