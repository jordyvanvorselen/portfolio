import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class Hero extends BaseSection {
  override readonly section: Locator = this.page.locator('section').first()
  readonly availabilityBadge: Locator = this.section.getByText(
    'Available for new remote opportunities'
  )
  readonly name: Locator = this.section.getByRole('heading', {
    name: 'Jordy van Vorselen',
    level: 1,
  })
  readonly title: Locator = this.section.getByText('Senior Software Engineer')
  readonly description: Locator = this.section.getByText(
    /I help engineering teams deliver better software faster/
  )
  readonly getInTouchButton: Locator = this.section.getByRole('button', {
    name: 'Get in Touch',
  })
  readonly downloadResumeButton: Locator = this.section.getByRole('button', {
    name: 'Download Resume',
  })
  readonly githubLink: Locator = this.section.getByRole('link', {
    name: 'GitHub',
  })
  readonly linkedinLink: Locator = this.section.getByRole('link', {
    name: 'LinkedIn',
  })
  readonly emailLink: Locator = this.section.getByRole('link', {
    name: 'Email',
  })
  readonly scrollIndicator: Locator = this.section.getByText('SCROLL')
  readonly scrollIndicatorTitle: Locator = this.section.getByText(
    'Discover My Core Expertise'
  )
  readonly scrollIndicatorSubtitle: Locator = this.section.getByText(
    'Explore the skills I master'
  )
  readonly scrollIndicatorIcon: Locator = this.section.locator(
    '[aria-hidden="true"]'
  )
}
