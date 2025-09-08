import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'
import { Header } from '@/integration-tests/page-objects/sections/header.section'

export class MobileMenu extends BaseSection {
  override readonly section: Locator = this.page.getByTestId('mobile-menu')

  readonly closeButton: Locator = this.section.getByRole('button', {
    name: 'Close navigation menu',
  })

  // Navigation links
  readonly homeLink: Locator = this.section.getByRole('link', {
    name: 'Home',
  })
  readonly blogLink: Locator = this.section.getByRole('link', {
    name: 'Blog',
  })
  readonly projectsLink: Locator = this.section.getByRole('link', {
    name: 'Projects',
  })
  readonly experienceLink: Locator = this.section.getByRole('link', {
    name: 'Experience',
  })
  readonly contactLink: Locator = this.section.getByRole('link', {
    name: 'Contact',
  })

  // Social links
  readonly githubLink: Locator = this.section.getByRole('link', {
    name: 'GitHub',
  })
  readonly linkedinLink: Locator = this.section.getByRole('link', {
    name: 'LinkedIn',
  })

  // Language switcher
  readonly languageSwitcher: Locator = this.section.getByRole('button', {
    name: /(English|Nederlands)/,
  })

  async close(): Promise<Header> {
    await this.closeButton.click()
    return new Header(this.page)
  }
}
