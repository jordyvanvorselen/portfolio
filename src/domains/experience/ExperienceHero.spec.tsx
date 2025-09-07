import { render, screen } from '@testing-library/react'
import { ExperienceHero } from '@/domains/experience/ExperienceHero'

describe('ExperienceHero', () => {
  const defaultProps = {
    positionCount: 7,
    companyCount: 6,
  }

  it('renders the title', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(
      screen.getByRole('heading', { name: 'Work Experience' })
    ).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(
      screen.getByText(/A journey through innovative companies/)
    ).toBeInTheDocument()
  })

  it('renders the experience stat', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(screen.getByText('8+ Years Experience')).toBeInTheDocument()
  })

  it('renders the positions stat with correct counts', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(screen.getByText('7 Positions at 6 Companies')).toBeInTheDocument()
  })

  it('renders positions stat with different counts', () => {
    render(<ExperienceHero positionCount={10} companyCount={8} />)

    expect(screen.getByText('10 Positions at 8 Companies')).toBeInTheDocument()
  })
})
