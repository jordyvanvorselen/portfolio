import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'
import { ScorecardPage } from '@/integration-tests/page-objects/pages/scorecard.page'

test.describe('AI Delivery Scorecard', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } })

  test.describe('intro', () => {
    test('introduces the scorecard with a start button and a sample report', async ({
      scorecardPage,
    }) => {
      const { intro } = scorecardPage

      await expect(intro.title).toHaveText(
        'AI made your team faster. How much faster could it be?'
      )
      await expect(intro.facts).toBeVisible()
      await expect(intro.startButton).toBeVisible()
      await expect(intro.sampleReportButton).toBeVisible()
    })

    test('shows the review and incident symptoms as multipliers', async ({
      scorecardPage,
    }) => {
      const { symptoms } = scorecardPage

      await expect(symptoms.quotes).toHaveCount(2)
      await expect(symptoms.reviewMultiplier).toBeVisible()
      await expect(symptoms.incidentMultiplier).toBeVisible()
    })

    test('backs each of the six rails with research that opens in a new tab', async ({
      scorecardPage,
    }) => {
      const { intro } = scorecardPage

      await expect(intro.railNames).toHaveText([
        'Speedometer',
        'Test signal',
        'Definition of correct',
        'Pipeline gates',
        'Review flow',
        'Release rhythm',
      ])
      await expect(intro.evidenceLinks).toHaveCount(6)
      await expect(
        intro.evidenceLink(/Faros AI 2026 · 22,000 developers/)
      ).toHaveAttribute(
        'href',
        'https://www.faros.ai/research/ai-acceleration-whiplash'
      )
      await expect(
        intro.evidenceLink(/Faros AI 2026 · 22,000 developers/)
      ).toHaveAttribute('target', '_blank')
    })

    test('starts the scorecard from the closing call to action', async ({
      scorecardPage,
    }) => {
      await scorecardPage.closingCta.startButton.click()

      await scorecardPage.quiz.expectQuestionNumber(1)
    })
  })

  test.describe('quiz', () => {
    test('asks 14 questions and shows progress', async ({ scorecardPage }) => {
      const quiz = await scorecardPage.startQuiz()

      await quiz.expectQuestionNumber(1)
      await expect(quiz.progress).toHaveAttribute('aria-valuemax', '14')
      await expect(quiz.question).toHaveText(
        'How many engineers ship code in your product team?'
      )
      await expect(quiz.options).toHaveCount(4)
    })

    test('moves to the next question after an answer is clicked', async ({
      scorecardPage,
    }) => {
      const quiz = await scorecardPage.startQuiz()

      await quiz.answer('6–15 engineers')

      await quiz.expectQuestionNumber(2)
      await expect(quiz.question).toHaveText(
        'Roughly how much of your new code do AI agents write?'
      )
    })

    test('answers with the number keys', async ({ scorecardPage }) => {
      const quiz = await scorecardPage.startQuiz()

      await quiz.answerWithKey('3')

      await quiz.expectQuestionNumber(2)
    })

    test('goes back to the previous question and keeps the answer', async ({
      scorecardPage,
    }) => {
      const quiz = await scorecardPage.startQuiz()
      await quiz.answer('16–30 engineers')
      await quiz.expectQuestionNumber(2)

      await quiz.backButton.click()

      await quiz.expectQuestionNumber(1)
      await expect(quiz.option('16–30 engineers')).toHaveAttribute(
        'aria-pressed',
        'true'
      )
    })

    test('returns to the intro from the first question', async ({
      scorecardPage,
    }) => {
      const quiz = await scorecardPage.startQuiz()

      await quiz.backButton.click()

      await expect(scorecardPage.intro.startButton).toBeVisible()
    })
  })

  test.describe('delivery checks', () => {
    test('runs a check per rail from the visitor’s own answers', async ({
      scorecardPage,
    }) => {
      const quiz = await scorecardPage.startQuiz()
      await quiz.answerAll(['1', '1', ...Array<string>(12).fill('1')])

      const { analyzing } = scorecardPage
      await expect(analyzing.heading).toBeVisible()
      await expect(analyzing.logLine('Run Review flow')).toBeVisible()
      await expect(
        analyzing.logLine(/Mostly me, I’m the bottleneck/)
      ).toBeVisible()
      await expect(analyzing.status).toHaveText(
        'Done. Biggest leak: Speedometer.'
      )
      await expect(analyzing.seeReportButton).toBeVisible()
    })

    test('opens the report from the button', async ({ scorecardPage }) => {
      await scorecardPage.intro.sampleReportButton.click()

      await scorecardPage.analyzing.seeReportButton.click()

      await expect(scorecardPage.results.tier).toBeVisible()
    })
  })

  test.describe('sample report', () => {
    test('scores the sample team as leaking', async ({ scorecardPage }) => {
      const results = await scorecardPage.openSampleReport()

      await expect(results.tier).toHaveText('Leaking')
      await expect(results.scoreLine).toHaveText(/^Your delivery scores 42/)
      await expect(results.radar).toBeVisible()
    })

    test('names the biggest leak with a first fix and its cost', async ({
      scorecardPage,
    }) => {
      const results = await scorecardPage.openSampleReport()

      await expect(results.biggestLeakEyebrow).toBeVisible()
      await expect(results.heading('Review flow')).toBeVisible()
      await expect(results.firstFixHeading).toBeVisible()
      await expect(results.costHeading).toHaveText(
        'Speed you leave on the table'
      )
      await expect(results.hoursLost).toHaveText('~35h')
    })

    test('offers the audit call and the Substack newsletter', async ({
      scorecardPage,
    }) => {
      const results = await scorecardPage.openSampleReport()

      await expect(results.auditCallButton).toHaveAttribute(
        'href',
        'mailto:jordy@vanvorselen.com?subject=AI%20Delivery%20Audit'
      )
      await expect(results.substackLink).toHaveAttribute(
        'href',
        'https://jordyvanvorselen.substack.com/subscribe'
      )
    })

    test('retakes the scorecard from the report', async ({ scorecardPage }) => {
      const results = await scorecardPage.openSampleReport()

      await results.retakeButton.click()

      await expect(scorecardPage.intro.startButton).toBeVisible()
    })

    test('copies the report link when sharing', async ({ page }) => {
      await ScorecardPage.stubClipboard(page)
      const scorecardPage = await ScorecardPage.goto(page)
      const results = await scorecardPage.openSampleReport()

      await results.shareButton.click()

      await expect(results.shareButton).toHaveText('Link copied')
      expect(await scorecardPage.copiedText()).toContain('/scorecard')
    })
  })

  test.describe('perfect score', () => {
    test('finishes the checks with all rails healthy', async ({
      scorecardPage,
    }) => {
      const quiz = await scorecardPage.startQuiz()
      await quiz.answerEverythingBest()

      const { analyzing } = scorecardPage
      await expect(analyzing.logLine('━━ No leaks found')).toBeVisible()
      await expect(analyzing.logLine('All rails healthy')).toBeVisible()
      await expect(analyzing.status).toHaveText('Done. No leaks found.')
    })

    test('celebrates a perfect score without naming a leak', async ({
      scorecardPage,
    }) => {
      const quiz = await scorecardPage.startQuiz()
      await quiz.answerEverythingBest()
      await scorecardPage.analyzing.seeReportButton.click()

      const { results } = scorecardPage
      await expect(results.tier).toHaveText('Overdrive')
      await expect(results.heading('A perfect score')).toBeVisible()
      await expect(results.noLeaksEyebrow).toBeVisible()
      await expect(results.biggestLeakBadges).toHaveCount(0)
      await expect(results.costHeading).toHaveText('Nothing left on the table')
    })
  })

  test.describe('language', () => {
    test('shows the scorecard in Dutch when the visitor picks Dutch', async ({
      page,
    }) => {
      await ScorecardPage.useLocale(page, 'nl')
      const scorecardPage = await ScorecardPage.goto(page)

      await expect(scorecardPage.page).toHaveTitle(
        'AI Delivery Scorecard | Jordy van Vorselen'
      )
      await expect(scorecardPage.intro.title).toHaveText(
        'AI heeft je team sneller gemaakt. Hoeveel sneller kan het nog?'
      )
    })
  })

  test.describe('visual regression', () => {
    test('scorecard intro visual regression', async ({ scorecardPage }) => {
      await scorecardPage.prepareForScreenshot()

      await expect(scorecardPage.intro.section).toHaveScreenshot(
        'scorecard-intro.png'
      )
    })

    test('scorecard question visual regression', async ({ scorecardPage }) => {
      const quiz = await scorecardPage.startQuiz()
      await quiz.answerAll(['2', '3'])
      await quiz.expectQuestionNumber(3)
      await scorecardPage.prepareForScreenshot()

      await expect(quiz.section).toHaveScreenshot('scorecard-question.png')
    })

    test('scorecard delivery checks visual regression', async ({
      scorecardPage,
    }) => {
      await scorecardPage.intro.sampleReportButton.click()
      const { analyzing } = scorecardPage
      await expect(analyzing.seeReportButton).toBeVisible()
      await scorecardPage.prepareForScreenshot()

      await expect(analyzing.section).toHaveScreenshot(
        'scorecard-delivery-checks.png',
        { mask: [analyzing.countdown] }
      )
    })

    test('scorecard sample report visual regression', async ({
      scorecardPage,
    }) => {
      const results = await scorecardPage.openSampleReport()
      await expect(results.tier).toBeVisible()
      await scorecardPage.prepareForScreenshot()

      await expect(results.section).toHaveScreenshot(
        'scorecard-sample-report.png'
      )
    })

    test('scorecard perfect report visual regression', async ({
      scorecardPage,
    }) => {
      const quiz = await scorecardPage.startQuiz()
      await quiz.answerEverythingBest()
      await scorecardPage.analyzing.seeReportButton.click()
      await expect(scorecardPage.results.tier).toHaveText('Overdrive')
      await scorecardPage.prepareForScreenshot()

      await expect(scorecardPage.results.section).toHaveScreenshot(
        'scorecard-perfect-report.png'
      )
    })

    test.describe('on a phone', () => {
      test.use({ viewport: { width: 390, height: 844 } })

      test('scorecard intro on a phone visual regression', async ({
        scorecardPage,
      }) => {
        await scorecardPage.prepareForScreenshot()

        await expect(scorecardPage.intro.section).toHaveScreenshot(
          'scorecard-intro-phone.png'
        )
      })

      test('scorecard question on a phone visual regression', async ({
        scorecardPage,
      }) => {
        const quiz = await scorecardPage.startQuiz()
        await quiz.answerAll(['2', '3'])
        await quiz.expectQuestionNumber(3)
        await scorecardPage.prepareForScreenshot()

        await expect(quiz.section).toHaveScreenshot(
          'scorecard-question-phone.png'
        )
      })

      test('scorecard sample report on a phone visual regression', async ({
        scorecardPage,
      }) => {
        const results = await scorecardPage.openSampleReport()
        await expect(results.tier).toBeVisible()
        await scorecardPage.prepareForScreenshot()

        await expect(results.section).toHaveScreenshot(
          'scorecard-sample-report-phone.png'
        )
      })
    })
  })
})

test.describe('AI Delivery Scorecard with motion', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } })

  test('opens the report by itself 5 seconds after the checks finish', async ({
    page,
  }) => {
    await page.clock.install()
    const scorecardPage = await ScorecardPage.goto(page)
    await scorecardPage.intro.sampleReportButton.click()

    await page.clock.runFor(10_000)
    await expect(scorecardPage.analyzing.seeReportButton).toBeVisible()
    await page.clock.runFor(5_000)

    await expect(scorecardPage.results.tier).toHaveText('Leaking')
  })
})
