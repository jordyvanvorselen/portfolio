import type { ReactNode } from 'react'

type Args = {
  children: ReactNode
}

// Simplified layout for Payload admin - will be properly configured later
const Layout = ({ children }: Args) => (
  <html>
    <body>{children}</body>
  </html>
)

export default Layout
