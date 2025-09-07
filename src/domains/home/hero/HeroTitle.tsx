import { useTranslation } from 'react-i18next'

import { Title } from '@/ui/Title'

export const HeroTitle = () => {
  const { t } = useTranslation()

  return (
    <Title size="xl" weight="normal" color="secondary" align="center" as="p">
      {t('hero.title')}
    </Title>
  )
}
