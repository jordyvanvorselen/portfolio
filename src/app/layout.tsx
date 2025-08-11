import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/domains/header/Header'
import { Footer } from '@/domains/footer/Footer'

export const metadata: Metadata = {
  title: 'Jordy van Vorselen - Portfolio',
  description: 'Full-stack developer and software engineer portfolio',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full bg-gray-900">
      <body className="antialiased h-full flex flex-col bg-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
