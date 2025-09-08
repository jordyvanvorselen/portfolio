export interface FlagIconProps {
  country: string
  className?: string
  squared?: boolean
  style?: React.CSSProperties
}

export const FlagIcon = ({
  country,
  className = '',
  squared = false,
  style,
}: FlagIconProps) => {
  // Construct the flag-icons class name
  const baseClass = 'fi'
  const countryClass = `fi-${country.toLowerCase()}`
  const squaredClass = squared ? 'fis' : ''

  return (
    <span
      className={`${baseClass} ${countryClass} ${squaredClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}
