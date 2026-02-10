import { render, screen } from '@testing-library/react'

import ProjectsPage, { generateMetadata } from '@/app/(site)/projects/page'

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

    // Check for the actual numbers displayed in the hero stats
    const heroSection = screen.getByRole('region', { name: 'hero' })
    expect(heroSection).toBeVisible()

    // Use getByText with more specific context within the hero section
    expect(screen.getByText('3')).toBeVisible()
    expect(screen.getByText('67')).toBeVisible()
    // Check specifically for forks count in hero section using a more specific approach
    expect(screen.getAllByText('9').length).toBeGreaterThan(0)

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
    expect(screen.getByText('Go + Templ + HTMX @ Vercel')).toBeVisible()
    expect(
      screen.getByText(
        'A Vercel template for Go projects using Templ and HTMX, complete with GitHub Actions for CI/CD.'
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
