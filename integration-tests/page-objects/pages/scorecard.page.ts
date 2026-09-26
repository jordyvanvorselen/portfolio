import { Page } from '@playwright/test'

import { BasePage } from '@/integration-tests/page-objects/base.page'
import { ScorecardAnalyzing } from '@/integration-tests/page-objects/sections/scorecard-analyzing.section'
import { ScorecardClosingCta } from '@/integration-tests/page-objects/sections/scorecard-closing-cta.section'
import { ScorecardIntro } from '@/integration-tests/page-objects/sections/scorecard-intro.section'
import { ScorecardQuiz } from '@/integration-tests/page-objects/sections/scorecard-quiz.section'
import { ScorecardResults } from '@/integration-tests/page-objects/sections/scorecard-results.section'
import { ScorecardSymptoms } from '@/integration-tests/page-objects/sections/scorecard-symptoms.section'

export class ScorecardPage extends BasePage {
  readonly intro: ScorecardIntro = new ScorecardIntro(this.page)
  readonly symptoms: ScorecardSymptoms = new ScorecardSymptoms(this.page)
  readonly closingCta: ScorecardClosingCta = new ScorecardClosingCta(this.page)
  readonly quiz: ScorecardQuiz = new ScorecardQuiz(this.page)
  readonly analyzing: ScorecardAnalyzing = new ScorecardAnalyzing(this.page)
  readonly results: ScorecardResults = new ScorecardResults(this.page)

  static async stubClipboard(page: Page): Promise<void> {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', { value: undefined })
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: async (text: string) => {
            document.documentElement.dataset['copiedText'] = text
          },
        },
      })
    })
  }

  static async useLocale(page: Page, locale: 'en' | 'nl'): Promise<void> {
    await page
      .context()
      .addCookies([
        { name: 'NEXT_LOCALE', value: locale, domain: '127.0.0.1', path: '/' },
      ])
  }

  static async goto(page: Page): Promise<ScorecardPage> {
    await page.goto('/scorecard')
    await page.evaluate(() => document.fonts.ready)
    return new ScorecardPage(page)
  }

  async startQuiz(): Promise<ScorecardQuiz> {
    await this.intro.startButton.click()
    return this.quiz
  }

  async openSampleReport(): Promise<ScorecardResults> {
    await this.intro.sampleReportButton.click()
    await this.analyzing.seeReportButton.click()
    return this.results
  }

  async copiedText(): Promise<string | undefined> {
    return this.page.evaluate(
      () => document.documentElement.dataset['copiedText']
    )
  }

  async prepareForScreenshot(): Promise<void> {
    await this.hideHeader()
    await this.page.mouse.move(0, 0)
    await this.page.evaluate(() => document.fonts.ready)
  }
}
