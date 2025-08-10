import { Zap } from 'lucide-react'

import { ExpertiseCard } from '@/domains/expertise-section/ExpertiseCard'

export const AIAcceleratedDevelopmentCard = () => {
  return (
    <ExpertiseCard
      ariaLabel="AI-Accelerated Development"
      icon={<Zap className="w-7 h-7" aria-label="zap icon" />}
      iconColor="#0ea5e9"
      title="AI-Accelerated Development"
      description="I leverage AI tools to accelerate team velocity while maintaining code quality at scale. Through disciplined practices like TDD and continuous deployment, teams can move fast without accumulating technical debt as the codebase grows."
      skills={[
        'Claude Code',
        'Trunk-Based Development',
        'Continuous Deployment',
        'Pair Programming',
        'Automated Testing',
      ]}
      publicationCount={15}
    />
  )
}
