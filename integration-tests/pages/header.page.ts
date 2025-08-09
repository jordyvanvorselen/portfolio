import { Locator, Page } from '@playwright/test'

export class HeaderPage {
  readonly locator: Locator = this.page.getByRole('banner')

  readonly brandingLink: Locator = this.locator.getByRole('link', {
    name: 'Jordy van Vorselen',
  })
  readonly aboutLink: Locator = this.locator
    .getByRole('link', {
      name: 'About',
    })
    .filter({ visible: true })
    .first()
  readonly expertiseLink: Locator = this.locator
    .getByRole('link', {
      name: 'Expertise',
    })
    .filter({ visible: true })
    .first()
  readonly projectsLink: Locator = this.locator
    .getByRole('link', {
      name: 'Projects',
    })
    .filter({ visible: true })
    .first()
  readonly experienceLink: Locator = this.locator
    .getByRole('link', {
      name: 'Experience',
    })
    .filter({ visible: true })
    .first()
  readonly contactLink: Locator = this.locator
    .getByRole('link', {
      name: 'Contact',
    })
    .filter({ visible: true })
    .first()
  readonly hireMeButton: Locator = this.locator.getByRole('button', {
    name: /hire/i,
  })
  readonly githubLink: Locator = this.locator.getByRole('link', {
    name: 'GitHub',
  })
  readonly linkedinLink: Locator = this.locator.getByRole('link', {
    name: 'LinkedIn',
  })

  constructor(public readonly page: Page) {}

  async goto(): Promise<HeaderPage> {
    await this.page.goto('/')
    return this
  }
}
