import { ReactNode } from 'react'

export interface MobileMenuOverlayProps {
  children: ReactNode
  isVisible: boolean
  'data-testid'?: string
}

export const MobileMenuOverlay = ({
  children,
  isVisible,
  'data-testid': testId = 'mobile-menu-overlay',
}: MobileMenuOverlayProps) => {
  return (
    <div
      data-testid={testId}
      className={`fixed inset-0 z-50 bg-gray-950/80 backdrop-blur-md md:hidden transform transition-all duration-300 ease-in-out overflow-hidden ${
        isVisible
          ? 'translate-x-0 opacity-100 pointer-events-auto'
          : 'translate-x-full opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {children}
    </div>
  )
}
