import { CircleCheckBig } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Text } from '@/ui/Text'

export const ExpertiseCallToAction = () => {
  const t = useTranslations()

  return (
    <section className="text-center mt-10 mb-14" data-testid="call-to-action">
      <Text
        size="base"
        weight="normal"
        color="secondary"
        alignment="center"
        className="mb-6 px-10"
      >
        {t('expertise.callToAction.description')}
      </Text>
      <address className="flex items-center justify-center space-x-2 not-italic px-10">
        <CircleCheckBig className="w-5 h-5 text-[#10b981]" role="img" />
        <Text size="base" weight="semibold" color="success">
          {t('expertise.callToAction.availability')}
        </Text>
      </address>
    </section>
  )
}
