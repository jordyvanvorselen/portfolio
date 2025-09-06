import { render, screen } from '@testing-library/react'
import ExperiencePage from '@/app/experience/page'

// Mock the useMediaQuery hook
jest.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: jest.fn().mockReturnValue(true), // Default to desktop view
}))

describe('Experience Page', () => {
  it('renders experience hero section', () => {
    render(<ExperiencePage />)

    expect(
      screen.getByRole('heading', { name: 'Work Experience' })
    ).toBeInTheDocument()
  })

  it('renders professional journey section', () => {
    render(<ExperiencePage />)

    expect(
      screen.getByRole('heading', { name: 'Professional Journey' })
    ).toBeVisible()
    expect(
      screen.getByText(
        "From early internships to senior engineering roles, here's how my journey in software development has evolved through continuous learning and impactful contributions."
      )
    ).toBeVisible()
  })

  it('renders experience card with job details', () => {
    render(<ExperiencePage />)

    expect(
      screen.getAllByRole('heading', { name: 'Lead Developer' })
    ).toHaveLength(3)
    expect(screen.getAllByText('Hertek GmbH')).toHaveLength(2)
    expect(screen.getByText('1 year 8 months')).toBeInTheDocument()
    expect(screen.getAllByText('Remote - Weert, NL')).toHaveLength(4)
    expect(screen.getAllByText('Full-time')).toHaveLength(7) // 7 Full-time jobs
    expect(screen.getAllByText('Current')).toHaveLength(2)
  })

  it('displays experience card achievements and technologies', () => {
    render(<ExperiencePage />)

    expect(
      screen.getAllByRole('heading', { name: /Key Achievements/i })
    ).toHaveLength(10) // 10 cards
    expect(
      screen.getByText(/Developed multiple Java backend services/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Full-stack development across multiple technologies/)
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('heading', { name: /Technologies Used/i })
    ).toHaveLength(10) // 10 cards
    expect(screen.getAllByText('React')).toHaveLength(4) // 4 cards have React
    expect(screen.getAllByText('Java')).toHaveLength(4) // 4 cards have Java
    expect(screen.getAllByText('Spring Boot')).toHaveLength(4)
  })

  it('renders multiple experience cards in a responsive grid', () => {
    render(<ExperiencePage />)

    expect(
      screen.getAllByRole('heading', { name: 'Lead Developer' })
    ).toHaveLength(3)
    expect(
      screen.getByRole('heading', { name: 'Back-End Tech Lead' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Full-Stack Engineer' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Software Engineering Intern' })
    ).toBeInTheDocument()

    expect(screen.getAllByText('Hertek GmbH')).toHaveLength(2)
    expect(screen.getAllByText('Kabisa')).toHaveLength(2)
    expect(screen.getAllByText('ASML')).toHaveLength(2)
    expect(screen.getByText('Internship')).toBeInTheDocument()
  })
})
