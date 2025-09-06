import { expect } from '@playwright/test'
import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('Experience Page', () => {
  test('displays hero section with title, description and stats', async ({
    experiencePage,
  }) => {
    await expect(experiencePage.hero.title).toBeVisible()
    await expect(experiencePage.hero.title).toHaveText('Work Experience')

    await expect(experiencePage.hero.description).toBeVisible()
    await expect(experiencePage.hero.description).toContainText(
      'A journey through innovative companies'
    )

    await expect(experiencePage.hero.experienceStat).toBeVisible()
    await expect(experiencePage.hero.experienceStat).toContainText(
      '8+ Years Experience'
    )

    await expect(experiencePage.hero.positionsStat).toBeVisible()
    await expect(experiencePage.hero.positionsStat).toContainText(
      '5 Positions at 5 Companies'
    )

    await expect(experiencePage.hero.trendingUpIcon).toBeVisible()
    await expect(experiencePage.hero.animatedDot).toBeVisible()
  })

  test('displays experience cards with professional journey section', async ({
    experiencePage,
  }) => {
    await expect(experiencePage.professionalJourneyTitle).toBeVisible()
    await expect(experiencePage.professionalJourneyDescription).toBeVisible()

    await expect(experiencePage.firstExperienceCard).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByRole('heading', {
        name: /Lead Developer/i,
      })
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByText('Hertek GmbH')
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByText('1 year 8 months')
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByText('Remote - Weert, NL')
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByText('Full-time')
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByText('Current')
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByRole('heading', {
        name: /Key Achievements/i,
      })
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByText(
        /Developed multiple Java backend services/
      )
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByRole('heading', {
        name: /Technologies Used/i,
      })
    ).toBeVisible()

    await expect(
      experiencePage.firstExperienceCard.getByText('React', { exact: true })
    ).toBeVisible()
  })
})
