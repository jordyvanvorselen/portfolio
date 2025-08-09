import { render, screen } from '@testing-library/react'
import { Github } from 'lucide-react'

import { SocialIcon } from './SocialIcon'

describe('SocialIcon', () => {
  it('renders social icon link with proper attributes', () => {
    render(
      <SocialIcon href="https://github.com/test" label="GitHub" icon={Github} />
    )

    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', 'https://github.com/test')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders icon component', () => {
    render(
      <SocialIcon href="https://github.com/test" label="GitHub" icon={Github} />
    )

    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link.querySelector('svg')).toBeInTheDocument()
  })

  it('accepts different variants', () => {
    render(
      <SocialIcon
        href="https://github.com/test"
        label="GitHub"
        icon={Github}
        variant="button"
      />
    )

    expect(screen.getByRole('link', { name: 'GitHub' })).toBeVisible()
  })

  it('accepts custom className', () => {
    render(
      <SocialIcon
        href="https://github.com/test"
        label="GitHub"
        icon={Github}
        className="custom-class"
      />
    )

    const link = screen.getByRole('link', { name: 'GitHub' })
    expect(link).toHaveClass('custom-class')
  })
})
