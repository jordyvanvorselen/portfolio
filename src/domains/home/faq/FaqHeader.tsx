import { useTranslations } from 'next-intl'

import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export const FaqHeader = () => {
  const t = useTranslations()
  return (
    <div className="text-center mb-12">
      <Title
        size="3xl"
        weight="bold"
        color="gradient"
        align="center"
        as="h2"
        className="mb-6"
      >
        {t('faq.section.title')}
      </Title>

      <Text
        size="lg"
        weight="medium"
        color="secondary"
        alignment="center"
        lineHeight="relaxed"
        className="max-w-2xl mx-auto"
      >
        {t('faq.section.description')}
      </Text>
    </div>
  )
}
