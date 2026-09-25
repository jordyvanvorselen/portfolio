import { render, screen } from '@testing-library/react'

import { ExperiencePageSkeleton } from '@/domains/experience/ExperiencePageSkeleton'

describe('ExperiencePageSkeleton', () => {
  it('tells screen reader users that the page is loading', () => {
    render(<ExperiencePageSkeleton />)

    expect(screen.getByRole('status')).toHaveTextContent(
      'pages.experience.loading'
    )
  })

  it('shows placeholders for the hero and the first jobs on the timeline', () => {
    render(<ExperiencePageSkeleton />)

    expect(screen.getByTestId('page-hero-skeleton')).toBeVisible()
    expect(screen.getAllByTestId('experience-card-skeleton')).toHaveLength(3)
  })
})
