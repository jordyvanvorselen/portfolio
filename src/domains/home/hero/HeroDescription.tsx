import { useTranslations } from 'next-intl'

import { Text } from '@/ui/Text'

export const HeroDescription = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col">
      <Text
        size="lg"
        weight="medium"
        color="secondary"
        alignment="center"
        lineHeight="relaxed"
        className="md:text-xl pt-6 lg:pt-8 max-w-3xl mx-auto"
      >
        {t.rich('hero.description.main', { b: chunks => <b>{chunks}</b> })}
      </Text>
      <Text
        size="lg"
        weight="medium"
        color="secondary"
        alignment="center"
        lineHeight="relaxed"
        className="md:text-xl pt-8 pb-2 lg:pb-6 max-w-3xl mx-auto"
      >
        {t('hero.description.cta')}
      </Text>
    </div>
  )
}
