import { render, screen } from '@testing-library/react'
import { ExperienceCard } from '@/domains/experience/ExperienceCard'

describe('ExperienceCard', () => {
  const mockProps = {
    position: 'Senior Software Engineer',
    company: 'TechCorp Solutions',
    companyUrl: 'https://techcorp.com',
    logoUrl:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=48&h=48&q=80',
    logoAlt: 'TechCorp Solutions logo',
    duration: '3+ years',
    location: 'San Francisco, CA',
    employmentType: 'Full-time' as const,
    description:
      'Leading the development of scalable microservices architecture.',
    achievements: ['Reduced system latency by 40%'],
    technologies: [
      { name: 'React', iconKey: 'react' },
      { name: 'Node.js', iconKey: 'nodejs' },
      { name: 'TypeScript', iconKey: 'typescript' },
    ],
    isCurrentJob: true,
    alignment: 'left' as const,
    dotColor: '#14b8a6',
  }

  it('renders job position as heading', () => {
    render(<ExperienceCard {...mockProps} />)

    expect(
      screen.getByRole('heading', { name: 'Senior Software Engineer' })
    ).toBeVisible()
  })

  it('displays company name', () => {
    render(<ExperienceCard {...mockProps} />)

    expect(screen.getByText('TechCorp Solutions')).toBeVisible()
  })

  it('shows employment details', () => {
    render(<ExperienceCard {...mockProps} />)

    expect(screen.getByText('3+ years')).toBeVisible()
    expect(screen.getByText('San Francisco, CA')).toBeVisible()
    expect(screen.getByText('Full-time')).toBeVisible()
  })

  it('displays current job badge using translation key when isCurrentJob is true', () => {
    render(<ExperienceCard {...mockProps} />)

    expect(screen.getByText('experience.card.current')).toBeVisible()
  })

  it('does not display current job badge when isCurrentJob is false', () => {
    render(<ExperienceCard {...mockProps} isCurrentJob={false} />)

    expect(
      screen.queryByText('experience.card.current')
    ).not.toBeInTheDocument()
  })

  it('does not display current job badge when isCurrentJob is undefined (uses default)', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isCurrentJob, ...propsWithoutCurrentJob } = mockProps

    render(<ExperienceCard {...propsWithoutCurrentJob} />)

    expect(
      screen.queryByText('experience.card.current')
    ).not.toBeInTheDocument()
  })

  it('shows key achievements section using translation key', () => {
    render(<ExperienceCard {...mockProps} />)

    expect(
      screen.getByRole('heading', { name: 'experience.card.keyAchievements' })
    ).toBeVisible()
    expect(screen.getByText('Reduced system latency by 40%')).toBeVisible()
  })

  it('displays technologies section using translation key', () => {
    render(<ExperienceCard {...mockProps} />)

    expect(
      screen.getByRole('heading', { name: 'experience.card.technologiesUsed' })
    ).toBeVisible()
    expect(screen.getByText('React')).toBeVisible()
  })

  it('displays external link with translation key when companyUrl is provided', () => {
    render(<ExperienceCard {...mockProps} />)

    expect(
      screen.getByLabelText(
        'experience.card.visitWebsite company=TechCorp Solutions'
      )
    ).toBeInTheDocument()
  })

  it('does not display external link when companyUrl is not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { companyUrl, ...propsWithoutCompanyUrl } = mockProps

    render(<ExperienceCard {...propsWithoutCompanyUrl} />)

    expect(
      screen.queryByLabelText(/experience\.card\.visitWebsite/)
    ).not.toBeInTheDocument()
  })
})
