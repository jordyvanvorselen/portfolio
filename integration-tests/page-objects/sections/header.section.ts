import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class Header extends BaseSection {
  override readonly section: Locator = this.page.getByRole('banner')

  readonly brandingLink: Locator = this.section.getByRole('link', {
    name: 'More Than Bits',
  })
  readonly homeLink: Locator = this.section
    .getByRole('link', {
      name: 'Home',
    })
    .first()
  readonly blogLink: Locator = this.section
    .getByRole('link', {
      name: 'Blog',
    })
    .first()
  readonly projectsLink: Locator = this.section
    .getByRole('link', {
      name: 'Projects',
    })
    .first()
  readonly experienceLink: Locator = this.section
    .getByRole('link', {
      name: 'Experience',
    })
    .first()
  readonly contactLink: Locator = this.section
    .getByRole('link', {
      name: 'Contact',
    })
    .first()
  readonly availabilityStatus: Locator = this.section.getByText('Available')
  readonly availabilityIcon: Locator = this.section
    .locator('address')
    .getByRole('img')
  readonly githubLink: Locator = this.section.getByRole('link', {
    name: 'GitHub',
  })
  readonly linkedinLink: Locator = this.section.getByRole('link', {
    name: 'LinkedIn',
  })
  readonly navigation: Locator = this.section.getByRole('navigation')
  readonly mobileMenuButton: Locator = this.section.getByRole('button', {
    name: 'Open navigation menu',
  })
  readonly languageSwitcher: Locator = this.section.getByRole('button', {
    name: /Switch to (Dutch|English)/,
  })
}
