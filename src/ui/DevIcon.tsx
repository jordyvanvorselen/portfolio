export interface DevIconProps {
  name: string
  wordmark?: boolean
  className?: string
  colored?: boolean
  style?: React.CSSProperties
}

export const DevIcon = ({
  name,
  wordmark = false,
  className = '',
  colored = true,
  style,
}: DevIconProps) => {
  // Construct the devicon class name
  const suffix = wordmark ? 'plain-wordmark' : 'plain'
  const deviconClass = `devicon-${name}-${suffix}`
  const coloredClass = colored ? 'colored' : ''

  return (
    <i
      className={`${deviconClass} ${className} ${coloredClass}`}
      style={style}
      aria-hidden="true"
    />
  )
}
