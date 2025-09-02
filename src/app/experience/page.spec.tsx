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
      screen.getByRole('heading', { name: 'Senior Software Engineer' })
    ).toBeVisible()
    expect(screen.getByText('TechCorp Solutions')).toBeVisible()
    expect(screen.getByText('3+ years')).toBeVisible()
    expect(screen.getByText('San Francisco, CA')).toBeVisible()
    expect(screen.getAllByText('Full-time')).toHaveLength(3)
    expect(screen.getByText('Current')).toBeVisible()
  })

  it('displays experience card achievements and technologies', () => {
    render(<ExperiencePage />)

    expect(
      screen.getAllByRole('heading', { name: /Key Achievements/i })
    ).toHaveLength(4)
    expect(screen.getByText(/Reduced system latency by 40% through optimization/)).toBeVisible()
    expect(screen.getByText(/Led team of 8 engineers on critical projects/)).toBeVisible()

    expect(
      screen.getAllByRole('heading', { name: /Technologies Used/i })
    ).toHaveLength(4)
    expect(screen.getAllByText('React')).toHaveLength(2)
    expect(screen.getByText('Node.js')).toBeVisible()
    expect(screen.getByText('TypeScript')).toBeVisible()
  })

  it('renders multiple experience cards in a responsive grid', () => {
    render(<ExperiencePage />)

    expect(
      screen.getByRole('heading', { name: 'Senior Software Engineer' })
    ).toBeVisible()
    expect(
      screen.getByRole('heading', { name: 'Full Stack Developer' })
    ).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Junior Developer' })).toBeVisible()
    expect(
      screen.getByRole('heading', { name: 'Software Engineering Intern' })
    ).toBeVisible()

    expect(screen.getByText('InnovateLabs')).toBeVisible()
    expect(screen.getByText('StartupHub')).toBeVisible()
    expect(screen.getByText('DataTech Inc')).toBeVisible()
    expect(screen.getByText('Internship')).toBeVisible()
  })
})
