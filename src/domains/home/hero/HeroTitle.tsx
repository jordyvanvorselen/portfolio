import { useTranslations } from 'next-intl'

import { Title } from '@/ui/Title'

export const HeroTitle = () => {
  const t = useTranslations()

  return (
    <Title size="xl" weight="normal" color="secondary" align="center" as="p">
      {t('hero.title')}
    </Title>
  )
}
