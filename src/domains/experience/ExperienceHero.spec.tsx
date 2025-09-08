import { render, screen } from '@testing-library/react'
import { ExperienceHero } from '@/domains/experience/ExperienceHero'

describe('ExperienceHero', () => {
  const defaultProps = {
    positionCount: 7,
    companyCount: 6,
  }

  it('renders the title using translation key', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(
      screen.getByRole('heading', { name: 'experience.hero.title' })
    ).toBeInTheDocument()
  })

  it('renders the description using translation key', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(screen.getByText('experience.hero.description')).toBeInTheDocument()
  })

  it('renders the experience stat using translation key', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(
      screen.getByText('experience.hero.stats.yearsExperience')
    ).toBeInTheDocument()
  })

  it('renders the positions stat with correct counts using translation key', () => {
    render(<ExperienceHero {...defaultProps} />)

    expect(
      screen.getByText(
        'experience.hero.stats.positionsAndCompanies positionCount=7 companyCount=6'
      )
    ).toBeInTheDocument()
  })

  it('renders positions stat with different counts using translation key', () => {
    render(<ExperienceHero positionCount={10} companyCount={8} />)

    expect(
      screen.getByText(
        'experience.hero.stats.positionsAndCompanies positionCount=10 companyCount=8'
      )
    ).toBeInTheDocument()
  })
})
