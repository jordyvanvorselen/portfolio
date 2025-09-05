import { Rocket } from 'lucide-react'

import { ExpertiseCard } from '@/domains/home/expertise/ExpertiseCard'

export const ContinuousDeliveryCard = () => {
  return (
    <ExpertiseCard
      ariaLabel="Continuous Delivery"
      icon={<Rocket className="w-7 h-7" aria-label="rocket icon" />}
      iconColor="#10b981"
      title="Continuous Delivery"
      description="I implement robust CI/CD pipelines that enable teams to ship features rapidly and reliably. Through automated testing, progressive deployments, and infrastructure as code, I help organizations achieve true continuous delivery with confidence."
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
