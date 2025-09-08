import { Rocket } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { ExpertiseCard } from '@/domains/home/expertise/ExpertiseCard'

export const ContinuousDeliveryCard = () => {
  const t = useTranslations()

  return (
    <ExpertiseCard
      ariaLabel={t('expertise.delivery.ariaLabel')}
      icon={<Rocket className="w-7 h-7" aria-label="rocket icon" />}
      iconColor="#10b981"
      title={t('expertise.delivery.title')}
      description={t('expertise.delivery.description')}
      skills={[
        'GitHub Actions',
        'Docker & Kubernetes',
        'Infrastructure as Code',
        'Progressive Deployment',
        'Automated Rollbacks',
      ]}
      publicationCount={18}
    />
  )
}
