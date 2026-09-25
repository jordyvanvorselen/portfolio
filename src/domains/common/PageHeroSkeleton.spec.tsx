import { render, screen } from '@testing-library/react'

import { PageHeroSkeleton } from '@/domains/common/PageHeroSkeleton'

describe('PageHeroSkeleton', () => {
  it('shows placeholders for the page title, description and stats', () => {
    render(<PageHeroSkeleton />)

    expect(screen.getByTestId('page-hero-skeleton')).toBeVisible()
    expect(screen.getAllByTestId('skeleton')).toHaveLength(4)
  })
})
