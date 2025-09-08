import { TestTube } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ExpertiseCard } from '@/domains/home/expertise/ExpertiseCard'

export const TDDCard = () => {
  const t = useTranslations()

  return (
    <ExpertiseCard
      ariaLabel={t('expertise.tdd.ariaLabel')}
      icon={<TestTube className="w-7 h-7" aria-label="test tube icon" />}
      iconColor="#10b981"
      title={t('expertise.tdd.title')}
      description={t('expertise.tdd.description')}
      skills={[
        'Jest',
        'Cypress',
        'Testing Library',
        'Unit Testing',
        'Integration Testing',
        'E2E Testing',
      ]}
      publicationCount={12}
    />
  )
}
