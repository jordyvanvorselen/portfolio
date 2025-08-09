import { render, screen } from '@testing-library/react'

import { SocialLinks } from '@/domains/hero-section/SocialLinks'

describe('SocialLinks', () => {
  it('renders GitHub link', () => {
    render(<SocialLinks />)

    expect(screen.getByRole('link', { name: 'GitHub' })).toBeVisible()
  })

  it('renders LinkedIn link', () => {
    render(<SocialLinks />)

    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeVisible()
  })

  it('renders Email link', () => {
    render(<SocialLinks />)

    expect(screen.getByRole('link', { name: 'Email' })).toBeVisible()
  })
})
