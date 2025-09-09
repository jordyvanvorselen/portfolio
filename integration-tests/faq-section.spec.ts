import { expect } from '@playwright/test'

import { test } from '@/integration-tests/fixtures/pages.fixture'

test.describe('FAQ Section', () => {
  test('displays FAQ section with header and all items', async ({
    homePage,
  }) => {
    // Verify section is visible
    await expect(homePage.faqSection.section).toBeVisible()

    // Verify header elements
    await expect(homePage.faqSection.title).toBeVisible()
    await expect(homePage.faqSection.title).toHaveText(
      'Frequently Asked Questions'
    )
    await expect(homePage.faqSection.subtitle).toBeVisible()
    await expect(homePage.faqSection.subtitle).toContainText(
      'Find answers to common questions about my work, expertise, and approach to software development.'
    )

    // Verify all FAQ items are present and closed by default
    await expect(homePage.faqSection.availabilityFaq).toBeVisible()
    await expect(homePage.faqSection.rateFaq).toBeVisible()
    await expect(homePage.faqSection.technologyFaq).toBeVisible()
    await expect(homePage.faqSection.remoteFaq).toBeVisible()
    await expect(homePage.faqSection.adviceFaq).toBeVisible()
    await expect(homePage.faqSection.startupFaq).toBeVisible()
  })

  test('FAQ items expand and collapse correctly', async ({ homePage }) => {
    // All FAQ items should be collapsed initially
    await expect(homePage.faqSection.availabilityAnswer).not.toBeVisible()
    await expect(homePage.faqSection.rateAnswer).not.toBeVisible()

    // Click first FAQ item to expand
    await homePage.faqSection.availabilityFaq.click()
    await expect(homePage.faqSection.availabilityAnswer).toBeVisible()
    await expect(homePage.faqSection.availabilityAnswer).toContainText(
      'Yes, I am currently open to new opportunities and projects'
    )

    // Verify chevron rotates when expanded
    await expect(homePage.faqSection.availabilityChevron).toHaveClass(
      /rotate-180/
    )
    await expect(homePage.faqSection.availabilityChevron).toHaveClass(
      /text-teal-400/
    )

    // Click second FAQ item - first should collapse, second should expand
    await homePage.faqSection.rateFaq.click()
    await expect(homePage.faqSection.availabilityAnswer).not.toBeVisible()
    await expect(homePage.faqSection.rateAnswer).toBeVisible()
    await expect(homePage.faqSection.rateAnswer).toContainText(
      'My hourly rate is €95,00 per hour'
    )

    // Click same FAQ item again to collapse
    await homePage.faqSection.rateFaq.click()
    await expect(homePage.faqSection.rateAnswer).not.toBeVisible()
    await expect(homePage.faqSection.rateChevron).not.toHaveClass(/rotate-180/)
  })

  test('FAQ items are keyboard accessible', async ({ homePage, page }) => {
    // Focus directly on the first FAQ item
    await homePage.faqSection.availabilityFaq.focus()

    // Verify first FAQ is focused
    await expect(homePage.faqSection.availabilityFaq).toBeFocused()

    // Press Enter to expand
    await page.keyboard.press('Enter')
    await expect(homePage.faqSection.availabilityAnswer).toBeVisible()

    // Press Enter again to collapse
    await page.keyboard.press('Enter')
    await expect(homePage.faqSection.availabilityAnswer).not.toBeVisible()
  })

  test('only one FAQ can be open at a time', async ({ homePage }) => {
    // Open first FAQ
    await homePage.faqSection.availabilityFaq.click()
    await expect(homePage.faqSection.availabilityAnswer).toBeVisible()

    // Open second FAQ - first should automatically close
    await homePage.faqSection.rateFaq.click()
    await expect(homePage.faqSection.availabilityAnswer).not.toBeVisible()
    await expect(homePage.faqSection.rateAnswer).toBeVisible()

    // Open third FAQ - second should automatically close
    await homePage.faqSection.technologyFaq.click()
    await expect(homePage.faqSection.rateAnswer).not.toBeVisible()
    await expect(homePage.faqSection.technologyAnswer).toBeVisible()
  })

  test('all FAQ content is correctly displayed', async ({ homePage }) => {
    const faqTests = [
      {
        trigger: homePage.faqSection.availabilityFaq,
        answer: homePage.faqSection.availabilityAnswer,
        expectedText: 'Yes, I am currently open to new opportunities',
      },
      {
        trigger: homePage.faqSection.rateFaq,
        answer: homePage.faqSection.rateAnswer,
        expectedText: 'My hourly rate is €95,00 per hour',
      },
      {
        trigger: homePage.faqSection.technologyFaq,
        answer: homePage.faqSection.technologyAnswer,
        expectedText: 'quickly mastering new technologies',
      },
      {
        trigger: homePage.faqSection.remoteFaq,
        answer: homePage.faqSection.remoteAnswer,
        expectedText: 'extensive experience working with distributed teams',
      },
      {
        trigger: homePage.faqSection.adviceFaq,
        answer: homePage.faqSection.adviceAnswer,
        expectedText: 'I offer consulting services',
      },
      {
        trigger: homePage.faqSection.startupFaq,
        answer: homePage.faqSection.startupAnswer,
        expectedText: 'flexible pricing options',
      },
    ]

    for (const { trigger, answer, expectedText } of faqTests) {
      await trigger.click()
      await expect(answer).toBeVisible()
      await expect(answer).toContainText(expectedText)
      await trigger.click() // Collapse for next test
      await expect(answer).not.toBeVisible()
    }
  })

  test('FAQ items show hover feedback', async ({ homePage }) => {
    // Hover over FAQ item and verify chevron color changes
    await homePage.faqSection.availabilityFaq.hover()
    await expect(homePage.faqSection.availabilityChevron).toHaveClass(
      /hover:text-teal-400/
    )

    // Verify entire FAQ item is clickable (cursor pointer behavior)
    await expect(homePage.faqSection.availabilityFaq).toHaveCSS(
      'cursor',
      'pointer'
    )
  })

  test('FAQ section visual regression', async ({ homePage }) => {
    await homePage.hideHeader()
    await expect(homePage.faqSection.section).toHaveScreenshot(
      'faq-section.png'
    )
  })

  test('FAQ section visual regression with expanded item', async ({
    homePage,
  }) => {
    await homePage.hideHeader()

    // Expand the first FAQ item
    await homePage.faqSection.availabilityFaq.click()
    await expect(homePage.faqSection.availabilityAnswer).toBeVisible()

    await expect(homePage.faqSection.section).toHaveScreenshot(
      'faq-section-expanded.png'
    )
  })
})
