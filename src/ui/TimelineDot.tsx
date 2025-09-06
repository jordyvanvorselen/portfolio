interface TimelineDotProps {
  color?:
    | 'teal'
    | 'purple'
    | 'amber'
    | 'pink'
    | 'blue'
    | 'emerald'
    | 'red'
    | 'orange'
    | 'cyan'
    | 'indigo'
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
    blue: 'bg-blue-500 ring-gray-950 shadow-blue-500/50',
    emerald: 'bg-emerald-500 ring-gray-950 shadow-emerald-500/50',
    red: 'bg-red-500 ring-gray-950 shadow-red-500/50',
    orange: 'bg-orange-500 ring-gray-950 shadow-orange-500/50',
    cyan: 'bg-cyan-500 ring-gray-950 shadow-cyan-500/50',
    indigo: 'bg-indigo-500 ring-gray-950 shadow-indigo-500/50',
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
