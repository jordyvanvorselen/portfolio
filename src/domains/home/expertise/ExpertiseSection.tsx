import { useTranslations } from 'next-intl'

import { Text } from '@/ui/Text'
import { Title } from '@/ui/Title'
import { TDDCard } from '@/domains/home/expertise/TDDCard'
import { SoftwareArchitectureCard } from '@/domains/home/expertise/SoftwareArchitectureCard'
import { ContinuousDeliveryCard } from '@/domains/home/expertise/ContinuousDeliveryCard'
import { ExpertiseCallToAction } from '@/domains/home/expertise/ExpertiseCallToAction'

export const ExpertiseSection = () => {
  const t = useTranslations()
  return (
    <section
      id="expertise-section"
      aria-label={t('expertise.section.ariaLabel')}
      className="content-section-min relative overflow-hidden py-6 md:py-8 lg:py-8 lg:pt-16 bg-gray-950 border-t border-gray-800"
    >
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-950" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-full flex items-center justify-center px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <Title
            size="3xl"
            weight="bold"
            color="gradient"
            align="center"
            as="h2"
            className="mb-8"
          >
            {t('expertise.section.title')}
          </Title>
          <Text
            size="lg"
            weight="medium"
            color="secondary"
            alignment="center"
            lineHeight="relaxed"
            className="max-w-2xl mx-auto mb-8 md:mb-12"
          >
            {t('expertise.section.description')}
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-12 md:mt-16 lg:mt-20 max-w-7xl mx-auto">
            <TDDCard />
            <SoftwareArchitectureCard />
            <ContinuousDeliveryCard />
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <ExpertiseCallToAction />
      </div>
    </section>
  )
}
