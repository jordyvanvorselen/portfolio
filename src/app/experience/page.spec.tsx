import { render, screen } from '@testing-library/react'
import ExperiencePage from '@/app/experience/page'

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
      screen.getAllByRole('heading', { name: 'Senior Software Engineer' })
    ).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('TechCorp Solutions')).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('3+ years')).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('San Francisco, CA')).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('Full-time')).toHaveLength(6) // 3 Full-time jobs × 2 layouts (mobile + desktop)
    expect(screen.getAllByText('Current')).toHaveLength(2) // One for mobile, one for desktop
  })

  it('displays experience card achievements and technologies', () => {
    render(<ExperiencePage />)

    expect(
      screen.getAllByRole('heading', { name: /Key Achievements/i })
    ).toHaveLength(8) // 4 cards × 2 layouts (mobile + desktop)
    expect(
      screen.getAllByText(/Reduced system latency by 40% through optimization/)
    ).toHaveLength(2) // One for mobile, one for desktop
    expect(
      screen.getAllByText(/Led team of 8 engineers on critical projects/)
    ).toHaveLength(2) // One for mobile, one for desktop

    expect(
      screen.getAllByRole('heading', { name: /Technologies Used/i })
    ).toHaveLength(8) // 4 cards × 2 layouts (mobile + desktop)
    expect(screen.getAllByText('React')).toHaveLength(4) // 2 cards × 2 layouts (mobile + desktop)
    expect(screen.getAllByText('Node.js')).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('TypeScript')).toHaveLength(2) // One for mobile, one for desktop
  })

  it('renders multiple experience cards in a responsive grid', () => {
    render(<ExperiencePage />)

    expect(
      screen.getAllByRole('heading', { name: 'Senior Software Engineer' })
    ).toHaveLength(2) // One for mobile, one for desktop
    expect(
      screen.getAllByRole('heading', { name: 'Full Stack Developer' })
    ).toHaveLength(2) // One for mobile, one for desktop
    expect(
      screen.getAllByRole('heading', { name: 'Junior Developer' })
    ).toHaveLength(2) // One for mobile, one for desktop
    expect(
      screen.getAllByRole('heading', { name: 'Software Engineering Intern' })
    ).toHaveLength(2) // One for mobile, one for desktop

    expect(screen.getAllByText('InnovateLabs')).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('StartupHub')).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('DataTech Inc')).toHaveLength(2) // One for mobile, one for desktop
    expect(screen.getAllByText('Internship')).toHaveLength(2) // One for mobile, one for desktop
  })
})
