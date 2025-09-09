import type { Locator } from '@playwright/test'

import { BaseSection } from '@/integration-tests/page-objects/base.section'

export class FaqSection extends BaseSection {
  override readonly section: Locator = this.page.locator('#faq-section')

  // Header elements
  readonly title: Locator = this.section.getByRole('heading', {
    name: 'Frequently Asked Questions',
  })
  readonly subtitle: Locator = this.section.getByText(
    'Find answers to common questions about my work, expertise, and approach to software development.'
  )

  // FAQ Items (clickable areas) - these are div elements with role="button"
  readonly availabilityFaq: Locator = this.section
    .getByRole('button')
    .filter({ hasText: 'Are you available for new projects?' })
  readonly rateFaq: Locator = this.section
    .getByRole('button')
    .filter({ hasText: 'What is your hourly rate?' })
  readonly technologyFaq: Locator = this.section
    .getByRole('button')
    .filter({ hasText: 'Are you experienced with <Some Other Technology>?' })
  readonly remoteFaq: Locator = this.section
    .getByRole('button')
    .filter({ hasText: 'Do you work remotely?' })
  readonly adviceFaq: Locator = this.section
    .getByRole('button')
    .filter({ hasText: 'I just want a bit of advice, can you help?' })
  readonly startupFaq: Locator = this.section.getByRole('button').filter({
    hasText: "I'm a startup and I don't have a big budget. Can you still help?",
  })

  // FAQ Answers (content that appears when expanded)
  readonly availabilityAnswer: Locator = this.section.getByText(
    'Yes, I am currently open to new opportunities and projects. Feel free to reach out to discuss how I can contribute to your team or project.'
  )
  readonly rateAnswer: Locator = this.section.getByText(
    'My hourly rate is €95,00 per hour.'
  )
  readonly technologyAnswer: Locator = this.section.getByText(
    /quickly mastering new technologies/
  )
  readonly remoteAnswer: Locator = this.section.getByText(
    /extensive experience working with distributed teams/
  )
  readonly adviceAnswer: Locator = this.section.getByText(
    /I offer consulting services/
  )
  readonly startupAnswer: Locator = this.section.getByText(
    /flexible pricing options/
  )

  // Chevron icons (for visual state verification) - ChevronDown components from lucide-react
  readonly availabilityChevron: Locator = this.availabilityFaq
    .locator('svg')
    .first()
  readonly rateChevron: Locator = this.rateFaq.locator('svg').first()
  readonly technologyChevron: Locator = this.technologyFaq
    .locator('svg')
    .first()
  readonly remoteChevron: Locator = this.remoteFaq.locator('svg').first()
  readonly adviceChevron: Locator = this.adviceFaq.locator('svg').first()
  readonly startupChevron: Locator = this.startupFaq.locator('svg').first()
}
