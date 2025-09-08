import { render, screen } from '@testing-library/react'

import { SocialLinks } from '@/domains/home/hero/SocialLinks'

describe('SocialLinks', () => {
  it('renders GitHub link with translated label', () => {
    render(<SocialLinks />)

    expect(screen.getByRole('link', { name: 'social.github' })).toBeVisible()
  })

  it('renders LinkedIn link with translated label', () => {
    render(<SocialLinks />)

    expect(screen.getByRole('link', { name: 'social.linkedin' })).toBeVisible()
  })

  it('renders Email link with translated label', () => {
    render(<SocialLinks />)

    expect(screen.getByRole('link', { name: 'social.email' })).toBeVisible()
  })
})
