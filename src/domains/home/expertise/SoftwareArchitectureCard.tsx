import { Layers } from 'lucide-react'

import { ExpertiseCard } from '@/domains/home/expertise/ExpertiseCard'

export const SoftwareArchitectureCard = () => {
  return (
    <ExpertiseCard
      ariaLabel="Software Architecture"
      icon={<Layers className="w-7 h-7" aria-label="layers icon" />}
      iconColor="#14b8a6"
      title="Software Architecture"
      description="I design scalable, maintainable systems using proven architectural patterns. From monoliths to microservices, I choose the simplest architecture based on the requirements of each unique project."
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
