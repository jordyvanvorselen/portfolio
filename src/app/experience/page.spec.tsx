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
      screen.getByRole('heading', { name: 'Senior Software Engineer' })
    ).toBeInTheDocument()
    expect(screen.getByText('TechCorp Solutions')).toBeInTheDocument()
    expect(screen.getByText('3+ years')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
    expect(screen.getAllByText('Full-time')).toHaveLength(3) // 3 Full-time jobs
    expect(screen.getByText('Current')).toBeInTheDocument()
  })

  it('displays experience card achievements and technologies', () => {
    render(<ExperiencePage />)

    expect(
      screen.getAllByRole('heading', { name: /Key Achievements/i })
    ).toHaveLength(4) // 4 cards
    expect(
      screen.getByText(/Reduced system latency by 40% through optimization/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Led team of 8 engineers on critical projects/)
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('heading', { name: /Technologies Used/i })
    ).toHaveLength(4) // 4 cards
    expect(screen.getAllByText('React')).toHaveLength(2) // 2 cards have React
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders multiple experience cards in a responsive grid', () => {
    render(<ExperiencePage />)

    expect(
      screen.getByRole('heading', { name: 'Senior Software Engineer' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Full Stack Developer' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Junior Developer' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Software Engineering Intern' })
    ).toBeInTheDocument()

    expect(screen.getByText('InnovateLabs')).toBeInTheDocument()
    expect(screen.getByText('StartupHub')).toBeInTheDocument()
    expect(screen.getByText('DataTech Inc')).toBeInTheDocument()
    expect(screen.getByText('Internship')).toBeInTheDocument()
  })
})
