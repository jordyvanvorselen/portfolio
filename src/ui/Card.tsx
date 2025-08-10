import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  'aria-label'?: string
}

export const Card = ({ children, 'aria-label': ariaLabel }: CardProps) => {
  return (
    <article
      aria-label={ariaLabel}
      className="rounded-xl border text-card-foreground shadow bg-[#1e3a4c]/60 border-[#334155]/50 hover:border-[#0ea5e9]/50 transition-all duration-500 hover:transform hover:scale-[1.02] backdrop-blur-sm group relative overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/20 to-[#14b8a6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-8 relative z-10 h-full flex flex-col">{children}</div>
    </article>
  )
}
