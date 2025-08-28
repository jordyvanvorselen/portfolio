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
    expect(screen.getByText('Full-time')).toBeVisible()
    expect(screen.getByText('Current')).toBeVisible()
  })

  it('displays experience card achievements and technologies', () => {
    render(<ExperiencePage />)

    expect(
      screen.getByRole('heading', { name: /Key Achievements/i })
    ).toBeVisible()
    expect(screen.getByText(/Reduced system latency by 40%/)).toBeVisible()

    expect(
      screen.getByRole('heading', { name: /Technologies Used/i })
    ).toBeVisible()
    expect(screen.getByText('React')).toBeVisible()
    expect(screen.getByText('Node.js')).toBeVisible()
    expect(screen.getByText('TypeScript')).toBeVisible()
  })
})
