const MARK_PATH =
  'M0 28C0 15.5 6.5 6.5 17 3l2.2 4.2C12.6 10 9.6 14 9.2 18.1A10 10 0 1 1 0 28Z'

interface QuoteMarkProps {
  className?: string
}

export const QuoteMark = ({ className = '' }: QuoteMarkProps) => (
  <svg viewBox="0 0 44 40" className={className} aria-hidden="true">
    <path d={MARK_PATH} />
    <path d={MARK_PATH} transform="translate(23 0)" />
  </svg>
)
