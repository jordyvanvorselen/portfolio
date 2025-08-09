import Link from 'next/link'

import { Title } from '@/ui/Title'

interface LogoProps {
  className?: string
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link href="/" className={className}>
      <Title variant="logo">Jordy van Vorselen</Title>
    </Link>
  )
}
