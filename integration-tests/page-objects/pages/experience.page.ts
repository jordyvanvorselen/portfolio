import { Page, Locator } from '@playwright/test'
import { BasePage } from '@/integration-tests/page-objects/base.page'
import { ExperienceHero } from '@/integration-tests/page-objects/sections/experience-hero.section'

export class ExperiencePage extends BasePage {
  readonly hero: ExperienceHero = new ExperienceHero(this.page)

  readonly professionalJourneyTitle: Locator = this.page.getByRole('heading', {
    name: 'Professional Journey',
  })
  readonly professionalJourneyDescription: Locator = this.page.getByText(
    'From early internships to senior engineering roles'
  )

  readonly firstExperienceCard: Locator = this.page.getByRole('article').first()

  static async goto(page: Page): Promise<ExperiencePage> {
    await page.goto('/experience')
    return new ExperiencePage(page)
  }
}
