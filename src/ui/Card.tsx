import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  'aria-label'?: string
}

export const Card = ({ children, 'aria-label': ariaLabel }: CardProps) => {
  return (
    <article
      aria-label={ariaLabel}
      className="rounded-xl border text-card-foreground shadow bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
      <div className="p-8 relative z-10 h-full flex flex-col">{children}</div>
    </article>
  )
}
