import Link from 'next/link'

import { Title } from '@/ui/Title'

interface LogoProps {
  className?: string
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link href="/" className={className}>
      <Title
        as="span"
        size="md"
        weight="bold"
        color="primary"
        align="left"
        className="hover:text-gray-300 transition-colors"
      >
        More Than Bits
      </Title>
    </Link>
  )
}
