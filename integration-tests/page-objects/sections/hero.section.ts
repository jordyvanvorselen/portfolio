import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class Hero extends BaseSection {
  override readonly section: Locator = this.page.locator('section').first()
  readonly name: Locator = this.section.getByRole('heading', {
    name: 'Jordy van Vorselen',
    level: 1,
  })
  readonly title: Locator = this.section.getByText(
    'Freelance Software Engineer'
  )
  readonly description: Locator = this.section.locator(
    'text=/exceptional quality|uitzonderlijke kwaliteit/'
  )
  readonly getInTouchButton: Locator = this.section.getByRole('link', {
    name: 'Get In Touch',
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
  readonly scrollIndicatorTitle: Locator = this.section
    .getByText('Discover My Core Expertise')
    .locator('visible=true')
    .first()
  readonly scrollIndicatorSubtitle: Locator = this.section
    .getByText('Explore what I can bring to your project')
    .locator('visible=true')
    .first()
  readonly scrollIndicatorIcon: Locator = this.section
    .getByTestId('chevron-down-icon')
    .locator('visible=true')
    .first()
}
