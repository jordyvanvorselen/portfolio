'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Title } from '@/ui/Title'

interface LogoProps {
  className?: string
}

export const Logo = ({ className = '' }: LogoProps) => {
  const t = useTranslations()

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
        {t('layout.brandName')}
      </Title>
    </Link>
  )
}
