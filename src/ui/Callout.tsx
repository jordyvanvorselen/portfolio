import { ReactNode } from 'react'

export interface CalloutProps {
  children: ReactNode
}

// Highlighted box for the one fact a reader should remember
export const Callout = ({ children }: CalloutProps) => {
  return (
    <aside
      role="note"
      className="my-8 rounded-xl border border-teal-500/30 bg-teal-500/5 px-6 pt-6 pb-0 backdrop-blur-sm [&_p:last-child]:mb-6"
    >
      {children}
    </aside>
  )
}
