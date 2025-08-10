import { Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'
import { Hero } from '@/integration-tests/page-objects/sections/hero.section'
import { ExpertiseSection } from '@/integration-tests/page-objects/sections/expertise-section.section'
import { TddCard } from '@/integration-tests/page-objects/sections/tdd-card.section'
import { SoftwareArchitectureCard } from '@/integration-tests/page-objects/sections/software-architecture-card.section'
import { AiCard } from '@/integration-tests/page-objects/sections/ai-card.section'

export class HomePage extends BasePage {
  readonly hero: Hero = new Hero(this.page)
  readonly expertiseSection: ExpertiseSection = new ExpertiseSection(this.page)
  readonly tddCard: TddCard = new TddCard(this.page)
  readonly softwareArchitectureCard: SoftwareArchitectureCard =
    new SoftwareArchitectureCard(this.page)
  readonly aiCard: AiCard = new AiCard(this.page)

  static async goto(page: Page): Promise<HomePage> {
    await page.goto('/')
    return new HomePage(page)
  }
}
