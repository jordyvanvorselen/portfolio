import { useTranslations } from 'next-intl'

import { Title } from '@/ui/Title'

export const HeroTitle = () => {
  const t = useTranslations()

  return (
    <Title
      size="xl"
      weight="normal"
      color="secondary"
      align="center"
      as="p"
      className="mt-4"
    >
      {t('hero.title')}
    </Title>
  )
}
