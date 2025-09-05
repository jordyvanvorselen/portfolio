import { render, screen } from '@testing-library/react'
import { ExperienceHero } from '@/domains/experience/ExperienceHero'

describe('ExperienceHero', () => {
  it('renders the title', () => {
    render(<ExperienceHero />)

    expect(
      screen.getByRole('heading', { name: 'Work Experience' })
    ).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ExperienceHero />)

    expect(
      screen.getByText(/A journey through innovative companies/)
    ).toBeInTheDocument()
  })

  it('renders the experience stat', () => {
    render(<ExperienceHero />)

    expect(screen.getByText('8+ Years Experience')).toBeInTheDocument()
  })

  it('renders the positions stat', () => {
    render(<ExperienceHero />)

    expect(screen.getByText('5 Positions at 5 Companies')).toBeInTheDocument()
  })
})
