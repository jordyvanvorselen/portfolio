import { expect, Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class ScorecardQuiz extends BaseSection {
  override readonly section: Locator = this.page.getByRole('region', {
    name: 'AI Delivery Scorecard',
  })

  readonly progress: Locator = this.section.getByRole('progressbar', {
    name: 'Scorecard progress',
  })
  readonly question: Locator = this.section.getByRole('heading', { level: 2 })
  readonly options: Locator = this.section
    .getByRole('group')
    .getByRole('button')
  readonly backButton: Locator = this.section.getByRole('button', {
    name: /^(Back|Intro)$/,
  })

  option(label: string): Locator {
    return this.section.getByRole('group').getByRole('button', { name: label })
  }

  async expectQuestionNumber(number: number): Promise<void> {
    await expect(this.progress).toHaveAttribute('aria-valuenow', String(number))
  }

  async answer(label: string): Promise<ScorecardQuiz> {
    await this.option(label).click()
    return this
  }

  async answerWithKey(key: string): Promise<ScorecardQuiz> {
    await this.page.keyboard.press(key)
    return this
  }

  async answerAll(keys: string[]): Promise<ScorecardQuiz> {
    for (const [index, key] of keys.entries()) {
      await this.expectQuestionNumber(index + 1)
      await this.answerWithKey(key)
    }
    return this
  }

  async answerEverythingBest(): Promise<ScorecardQuiz> {
    return this.answerAll(['2', '2', ...Array<string>(12).fill('4')])
  }
}
