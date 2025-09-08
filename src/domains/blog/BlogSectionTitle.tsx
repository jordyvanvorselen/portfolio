'use client'

import { useTranslations } from 'next-intl'
import { Title } from '@/ui/Title'

interface BlogSectionTitleProps {
  translationKey: string
}

export const BlogSectionTitle = ({ translationKey }: BlogSectionTitleProps) => {
  const t = useTranslations()

  return (
    <Title
      size="2xl"
      weight="bold"
      color="primary"
      align="left"
      as="h3"
      className="mb-8"
    >
      {t(translationKey)}
    </Title>
  )
}
