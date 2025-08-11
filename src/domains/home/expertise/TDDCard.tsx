import { TestTube } from 'lucide-react'

import { ExpertiseCard } from '@/domains/home/expertise/ExpertiseCard'

export const TDDCard = () => {
  return (
    <ExpertiseCard
      ariaLabel="Test-Driven Development"
      icon={<TestTube className="w-7 h-7" aria-label="test tube icon" />}
      iconColor="#10b981"
      title="Test-Driven Development"
      description="I write tests first, then code. This approach ensures robust, bug-free software with comprehensive test coverage. My TDD practice leads to better design decisions and maintainable codebases."
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
