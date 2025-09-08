import { useTranslations } from 'next-intl'

import { Title } from '@/ui/Title'

export const HeroName = () => {
  const t = useTranslations()

  return (
    <Title size="5xl" weight="bold" color="gradient" align="center" as="h1">
      {t('hero.name')}
    </Title>
  )
}
