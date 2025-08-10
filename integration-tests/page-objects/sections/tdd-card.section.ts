import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class TddCard extends BaseSection {
  override readonly section: Locator = this.page.getByRole('article', {
    name: /test-driven development/i,
  })

  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Test-Driven Development',
  })
  readonly description: Locator = this.section.getByText(
    /I write tests first, then code/
  )
  readonly keySkillsLabel: Locator =
    this.section.getByText('KEY SKILLS & TOOLS')

  // Skill badges
  readonly jestBadge: Locator = this.section.getByText('Jest')
  readonly cypressBadge: Locator = this.section.getByText('Cypress')
  readonly testingLibraryBadge: Locator =
    this.section.getByText('Testing Library')
  readonly unitTestingBadge: Locator = this.section.getByText('Unit Testing')
  readonly integrationTestingBadge: Locator = this.section.getByText(
    'Integration Testing'
  )
  readonly e2eTestingBadge: Locator = this.section.getByText('E2E Testing')

  // Publications section
  readonly publicationsCount: Locator = this.section.getByText('12')
  readonly publicationsLabel: Locator = this.section.getByText('Publications')
  readonly publicationsSubtext: Locator =
    this.section.getByText('on this topic')
}
