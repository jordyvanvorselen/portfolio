import { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class Footer extends BaseSection {
  override readonly section: Locator = this.page.getByRole('contentinfo')

  readonly footer: Locator = this.section
  readonly authorName: Locator = this.section.getByRole('heading', {
    name: 'Jordy van Vorselen',
  })
  readonly authorDescription: Locator = this.section.getByText(
    /Senior Software Engineer passionate about building/
  )
  readonly location: Locator = this.section.getByText(
    '📍 Noord-Brabant, the Netherlands 🇳🇱'
  )
  readonly email: Locator = this.section.getByText(
    '✉️ jordyvanvorselen@gmail.com'
  )
  readonly quickLinksSection: Locator = this.section.getByRole('heading', {
    name: 'Quick Links',
  })
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
  readonly connectSection: Locator = this.section.getByRole('heading', {
    name: "Let's Connect",
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
  readonly getInTouchButton: Locator = this.section.getByRole('link', {
    name: 'Get In Touch',
  })
  readonly copyright: Locator = this.section.getByText(
    /© 2025 Jordy van Vorselen/
  )
  readonly availabilityStatus: Locator = this.section.getByText(
    'Available for remote opportunities'
  )
  readonly backToTopButton: Locator = this.section.getByRole('button', {
    name: 'Back to top',
  })
}
