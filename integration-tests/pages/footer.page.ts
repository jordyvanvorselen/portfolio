import { Locator, Page } from '@playwright/test'

export class FooterPage {
  readonly footer: Locator
  readonly authorName: Locator
  readonly authorDescription: Locator
  readonly location: Locator
  readonly email: Locator
  readonly quickLinksSection: Locator
  readonly aboutLink: Locator
  readonly expertiseLink: Locator
  readonly projectsLink: Locator
  readonly experienceLink: Locator
  readonly contactLink: Locator
  readonly connectSection: Locator
  readonly githubLink: Locator
  readonly linkedinLink: Locator
  readonly emailLink: Locator
  readonly getInTouchButton: Locator
  readonly copyright: Locator
  readonly availabilityStatus: Locator
  readonly backToTopButton: Locator

  constructor(public readonly page: Page) {
    this.footer = this.page.getByRole('contentinfo')
    this.authorName = this.footer.getByRole('heading', {
      name: 'Jordy van Vorselen',
    })
    this.authorDescription = this.footer.getByText(
      /Senior Software Engineer passionate about building/
    )
    this.location = this.footer.getByText(
      '📍 Noord-Brabant, the Netherlands 🇳🇱'
    )
    this.email = this.footer.getByText('✉️ jordyvanvorselen@gmail.com')
    this.quickLinksSection = this.footer.getByRole('heading', {
      name: 'Quick Links',
    })
    this.aboutLink = this.footer.getByRole('link', { name: 'About' })
    this.expertiseLink = this.footer.getByRole('link', { name: 'Expertise' })
    this.projectsLink = this.footer.getByRole('link', { name: 'Projects' })
    this.experienceLink = this.footer.getByRole('link', { name: 'Experience' })
    this.contactLink = this.footer.getByRole('link', { name: 'Contact' })
    this.connectSection = this.footer.getByRole('heading', {
      name: "Let's Connect",
    })
    this.githubLink = this.footer.getByRole('link', { name: 'GitHub' })
    this.linkedinLink = this.footer.getByRole('link', { name: 'LinkedIn' })
    this.emailLink = this.footer.getByRole('link', { name: 'Email' })
    this.getInTouchButton = this.footer.getByRole('link', {
      name: 'Get In Touch',
    })
    this.copyright = this.footer.getByText(/© 2025 Jordy van Vorselen/)
    this.availabilityStatus = this.footer.getByText(
      'Available for remote opportunities'
    )
    this.backToTopButton = this.footer.getByRole('button', {
      name: 'Back to top',
    })
  }
}
