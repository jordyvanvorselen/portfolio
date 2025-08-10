import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class AiCard extends BaseSection {
  override readonly section: Locator = this.page.getByRole('article', {
    name: /ai-accelerated development/i,
  })

  readonly title: Locator = this.section.getByRole('heading', {
    name: 'AI-Accelerated Development',
  })
  readonly description: Locator = this.section.getByText(
    /I leverage AI tools to accelerate team velocity while maintaining code quality/
  )
  readonly keySkillsLabel: Locator =
    this.section.getByText('KEY SKILLS & TOOLS')

  // Skills section for scoped skill badge queries
  readonly skillsSection: Locator = this.section
    .locator('div')
    .filter({ hasText: 'KEY SKILLS & TOOLS' })
    .first()

  // Skill badges
  readonly claudeCodeBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Claude Code' })
  readonly trunkBasedBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Trunk-Based Development' })
  readonly continuousDeploymentBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Continuous Deployment' })
  readonly pairProgrammingBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Pair Programming' })
  readonly automatedTestingBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Automated Testing' })

  // Publications section
  readonly publicationsCount: Locator = this.section.getByText('15')
  readonly publicationsLabel: Locator = this.section.getByText('Publications')
  readonly publicationsSubtext: Locator =
    this.section.getByText('on this topic')
}
