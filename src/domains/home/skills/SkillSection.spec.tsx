import { render, screen } from '@testing-library/react'

import { SkillSection } from '@/domains/home/skills/SkillSection'

describe('SkillSection', () => {
  it('renders skills section with correct id', () => {
    render(<SkillSection />)

    const section = document.getElementById('skills-section')
    expect(section).toBeInTheDocument()
    expect(section).toBeVisible()
  })

  it('displays all company logos with correct alt text', () => {
    render(<SkillSection />)

    expect(screen.getByAltText('ASML logo')).toBeVisible()
    expect(screen.getByAltText('Signify logo')).toBeVisible()
    expect(screen.getByAltText('Kabisa logo')).toBeVisible()
  })

  it('displays main heading with correct text', () => {
    render(<SkillSection />)

    const heading = screen.getByRole('heading', {
      name: 'skills.title',
      level: 2,
    })
    expect(heading).toBeVisible()
  })

  it('displays subtitle with correct text', () => {
    render(<SkillSection />)

    expect(screen.getByText('skills.subtitle')).toBeVisible()
  })

  it('displays experience overview link', () => {
    render(<SkillSection />)

    const link = screen.getByRole('link', {
      name: /skills\.experienceOverview/,
    })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', '/experience')
  })

  it('renders all technology cards through TechnologyGrid', () => {
    render(<SkillSection />)

    // Verify all 10 technologies are displayed
    expect(screen.getByText('TypeScript')).toBeVisible()
    expect(screen.getByText('Java')).toBeVisible()
    expect(screen.getByText('Elixir')).toBeVisible()
    expect(screen.getByText('Python')).toBeVisible()
    expect(screen.getByText('Ruby')).toBeVisible()
    expect(screen.getByText('C#')).toBeVisible()
    expect(screen.getByText('AWS')).toBeVisible()
    expect(screen.getByText('Flutter')).toBeVisible()
    expect(screen.getByText('DevOps')).toBeVisible()
    expect(screen.getByText('Blockchain')).toBeVisible()
  })

  it('renders TechnologyGrid component', () => {
    render(<SkillSection />)

    // TechnologyGrid should be rendered and display the technologies
    const typescriptCard = screen.getByText('TypeScript')
    expect(typescriptCard).toBeVisible()
  })
})
