import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ContinuousDeliveryCard extends BaseSection {
  override readonly section: Locator = this.page.getByRole('article', {
    name: /continuous delivery/i,
  })

  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Continuous Delivery',
  })
  readonly description: Locator = this.section.getByText(
    /I implement robust CI\/CD pipelines that enable teams to ship features rapidly/
  )
  readonly keySkillsLabel: Locator =
    this.section.getByText('KEY SKILLS & TOOLS')

  // Skills section for scoped skill badge queries
  readonly skillsSection: Locator = this.section
    .locator('div')
    .filter({ hasText: 'KEY SKILLS & TOOLS' })
    .first()

  // Skill badges
  readonly githubActionsBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'GitHub Actions' })
  readonly dockerKubernetesBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Docker & Kubernetes' })
  readonly infrastructureAsCodeBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Infrastructure as Code' })
  readonly progressiveDeploymentBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Progressive Deployment' })
  readonly automatedRollbacksBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Automated Rollbacks' })

  // Publications section
  readonly publicationsCount: Locator = this.section.getByText('18')
  readonly publicationsLabel: Locator = this.section.getByText('Publications')
  readonly publicationsSubtext: Locator =
    this.section.getByText('on this topic')
}
