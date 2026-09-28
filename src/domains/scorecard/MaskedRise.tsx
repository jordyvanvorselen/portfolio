import type { ReactNode } from 'react'

interface MaskedRiseProps {
  children: ReactNode
  delayMs?: number
  isShown?: boolean
  className?: string
}

export const MaskedRise = ({
  children,
  delayMs = 0,
  isShown = true,
  className = '',
}: MaskedRiseProps) => (
  <span className={`block overflow-hidden ${className}`}>
    <span
      className={`block ${isShown ? 'motion-safe:animate-mask-rise' : 'translate-y-[105%]'}`}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </span>
  </span>
)
