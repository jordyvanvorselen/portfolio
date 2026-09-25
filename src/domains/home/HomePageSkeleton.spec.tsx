import { render, screen } from '@testing-library/react'

import { HomePageSkeleton } from '@/domains/home/HomePageSkeleton'

describe('HomePageSkeleton', () => {
  it('tells screen reader users that the page is loading', () => {
    render(<HomePageSkeleton />)

    expect(screen.getByRole('status')).toHaveTextContent('pages.home.loading')
  })

  it('shows placeholders for the hero and the expertise cards', () => {
    render(<HomePageSkeleton />)

    expect(screen.getByTestId('home-hero-skeleton')).toBeVisible()
    expect(screen.getAllByTestId('expertise-card-skeleton')).toHaveLength(3)
  })
})
