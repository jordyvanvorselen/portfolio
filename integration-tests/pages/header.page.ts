import { Locator, Page } from '@playwright/test'

export class HeaderPage {
  readonly locator: Locator = this.page.getByRole('banner')

  readonly brandingLink: Locator = this.locator.getByRole('link', {
    name: 'Jordy van Vorselen',
  })
  readonly aboutLink: Locator = this.locator.getByRole('link', {
    name: 'About',
  })
  readonly expertiseLink: Locator = this.locator.getByRole('link', {
    name: 'Expertise',
  })
  readonly projectsLink: Locator = this.locator.getByRole('link', {
    name: 'Projects',
  })
  readonly experienceLink: Locator = this.locator.getByRole('link', {
    name: 'Experience',
  })
  readonly contactLink: Locator = this.locator.getByRole('link', {
    name: 'Contact',
  })
  readonly hireMeButton: Locator = this.locator.getByRole('button', {
    name: 'Hire Me',
  })
  readonly githubLink: Locator = this.page.getByRole('link', { name: 'GitHub' })
  readonly linkedinLink: Locator = this.page.getByRole('link', {
    name: 'LinkedIn',
  })

  constructor(public readonly page: Page) {}

  async goto(): Promise<HeaderPage> {
    await this.page.goto('/')
    return this
  }
}
