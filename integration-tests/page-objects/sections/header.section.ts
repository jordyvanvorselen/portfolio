import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class Header extends BaseSection {
  override readonly section: Locator = this.page.getByRole('banner')

  readonly brandingLink: Locator = this.section.getByRole('link', {
    name: 'Jordy van Vorselen',
  })
  readonly aboutLink: Locator = this.section
    .getByRole('link', {
      name: 'About',
    })
    .first()
  readonly expertiseLink: Locator = this.section
    .getByRole('link', {
      name: 'Expertise',
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
  readonly hireMeButton: Locator = this.section.getByRole('button', {
    name: /hire/i,
  })
  readonly githubLink: Locator = this.section.getByRole('link', {
    name: 'GitHub',
  })
  readonly linkedinLink: Locator = this.section.getByRole('link', {
    name: 'LinkedIn',
  })
  readonly navigation: Locator = this.section.getByRole('navigation')
  readonly mobileMenuButton: Locator = this.section.getByRole('button', {
    name: 'Menu',
  })
}
