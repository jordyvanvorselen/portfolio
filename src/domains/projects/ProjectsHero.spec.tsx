import { render, screen } from '@testing-library/react'

import { ProjectsHero } from '@/domains/projects/ProjectsHero'

describe('ProjectsHero', () => {
  it('renders hero section with translated title and description', () => {
    render(<ProjectsHero />)

    expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
    expect(screen.getByText('projects.hero.title')).toBeVisible()
    expect(screen.getByText('projects.hero.description')).toBeVisible()
  })

  it('displays project statistics with translated labels', () => {
    render(<ProjectsHero />)

    expect(screen.getByText('3')).toBeVisible()
    expect(screen.getByText('67')).toBeVisible()
    expect(screen.getByText('9')).toBeVisible()
    expect(screen.getByText('projects.hero.stats.projects')).toBeVisible()
    expect(screen.getByText('projects.hero.stats.stars')).toBeVisible()
    expect(screen.getByText('projects.hero.stats.forks')).toBeVisible()
  })
})
