import { render, screen } from '@testing-library/react'

import { BlogHeroSection } from '@/domains/blog/BlogHeroSection'

describe('BlogHeroSection', () => {
  it('displays the main heading', () => {
    render(<BlogHeroSection />)

    expect(
      screen.getByRole('heading', { name: 'More Than Bits' })
    ).toBeVisible()
  })

  it('displays the subtitle text', () => {
    render(<BlogHeroSection />)

    expect(
      screen.getByText(/thoughts, tutorials, and deep dives/i)
    ).toBeVisible()
  })

  it('displays articles count stat', () => {
    render(<BlogHeroSection />)

    expect(screen.getByText('6 Articles')).toBeVisible()
  })

  it('displays regularly updated status', () => {
    render(<BlogHeroSection />)

    expect(screen.getByText('Regularly Updated')).toBeVisible()
  })
})
