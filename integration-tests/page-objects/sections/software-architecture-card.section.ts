import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class SoftwareArchitectureCard extends BaseSection {
  override readonly section: Locator = this.page.getByRole('article', {
    name: /software architecture/i,
  })

  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Software Architecture',
  })
  readonly description: Locator = this.section.getByText(
    /I design scalable, maintainable systems using proven architectural patterns/
  )
  readonly keySkillsLabel: Locator =
    this.section.getByText('KEY SKILLS & TOOLS')

  // Skills section for scoped skill badge queries
  readonly skillsSection: Locator = this.section
    .locator('div')
    .filter({ hasText: 'KEY SKILLS & TOOLS' })
    .first()

  // Skill badges
  readonly microservicesBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Microservices' })
  readonly dddBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Domain-Driven Design' })
  readonly eventSourcingBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Event Sourcing' })
  readonly cqrsBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'CQRS' })
  readonly cleanArchitectureBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Clean Architecture' })
  readonly hexagonalArchitectureBadge: Locator = this.skillsSection
    .getByRole('status')
    .filter({ hasText: 'Hexagonal Architecture' })

  // Publications section
  readonly publicationsCount: Locator = this.section.getByText('8')
  readonly publicationsLabel: Locator = this.section.getByText('Publications')
  readonly publicationsSubtext: Locator =
    this.section.getByText('on this topic')
}
