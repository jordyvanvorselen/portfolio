import { render, screen } from '@testing-library/react'

import ProjectsPage, { generateMetadata } from '@/app/projects/page'

describe('ProjectsPage', () => {
  it('renders projects hero section', () => {
    render(<ProjectsPage />)

    expect(
      screen.getByRole('heading', { name: 'projects.hero.title' })
    ).toBeVisible()
    expect(screen.getByText('projects.hero.description')).toBeVisible()
  })

  it('displays project statistics in hero', () => {
    render(<ProjectsPage />)

    // Check for the actual numbers displayed
    expect(screen.getByText('6')).toBeVisible()
    expect(screen.getByText('12,037')).toBeVisible()
    expect(screen.getByText('1,543')).toBeVisible()

    // Check for the translated labels using flexible text matchers
    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'projects.hero.stats.projects'
      )
    ).toBeVisible()
    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'projects.hero.stats.stars'
      )
    ).toBeVisible()
    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'projects.hero.stats.forks'
      )
    ).toBeVisible()
  })

  it('renders projects grid section', () => {
    render(<ProjectsPage />)

    expect(screen.getByRole('region', { name: 'projects grid' })).toBeVisible()
    // Check for project title and description using flexible matchers
    expect(screen.getByText('Microservice Orchestrator')).toBeVisible()
    expect(
      screen.getByText(
        'A powerful orchestration platform for managing complex microservice architectures with automated deployment, monitoring, and scaling capabilities.'
      )
    ).toBeVisible()
  })

  it('renders collaboration section', () => {
    render(<ProjectsPage />)

    expect(screen.getByRole('region', { name: 'collaboration' })).toBeVisible()
    expect(
      screen.getByRole('heading', {
        name: 'projects.collaboration.title',
      })
    ).toBeVisible()
    expect(screen.getByText('projects.collaboration.description')).toBeVisible()
  })

  it('generates metadata with translated title and description', async () => {
    const result = await generateMetadata()

    expect(result).toEqual({
      title: 'pages.projects.title',
      description: 'pages.projects.description',
    })
  })
})
