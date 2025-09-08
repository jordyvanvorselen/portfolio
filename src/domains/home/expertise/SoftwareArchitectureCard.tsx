import { Layers } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ExpertiseCard } from '@/domains/home/expertise/ExpertiseCard'

export const SoftwareArchitectureCard = () => {
  const t = useTranslations()

  return (
    <ExpertiseCard
      ariaLabel={t('expertise.architecture.ariaLabel')}
      icon={<Layers className="w-7 h-7" aria-label="layers icon" />}
      iconColor="#14b8a6"
      title={t('expertise.architecture.title')}
      description={t('expertise.architecture.description')}
      skills={[
        'Microservices',
        'Domain-Driven Design',
        'Event Sourcing',
        'CQRS',
        'Clean Architecture',
        'Hexagonal Architecture',
      ]}
      publicationCount={8}
    />
  )
}
