interface TimelineDotProps {
  color?: 'teal' | 'purple' | 'amber' | 'pink'
  className?: string
}

export const TimelineDot = ({
  color = 'teal',
  className = '',
}: TimelineDotProps) => {
  const colorStyles = {
    teal: 'bg-teal-500 ring-gray-950 shadow-teal-500/50',
    purple: 'bg-purple-500 ring-gray-950 shadow-purple-500/50',
    amber: 'bg-amber-500 ring-gray-950 shadow-amber-500/50',
    pink: 'bg-pink-500 ring-gray-950 shadow-pink-500/50',
  }

  const combinedClasses = [
    'w-3 h-3 rounded-full ring-4 shadow-lg',
    colorStyles[color],
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return <div className={combinedClasses} />
}
