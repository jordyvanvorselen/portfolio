import { render, screen } from '@testing-library/react'

import { ProjectCard } from '@/domains/projects/ProjectCard'
import { Project } from '@/types/project'

const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  description: 'A test project description',
  longDescription: 'A longer test project description with more details',
  image: '/test-image.jpg',
  technologies: ['React', 'TypeScript'],
  githubUrl: 'https://github.com/test/project',
  liveUrl: 'https://test-project.com',
  stars: 100,
  forks: 25,
}

describe('ProjectCard', () => {
  it('renders project card with title and description', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByRole('article')).toBeVisible()
    expect(screen.getByRole('heading', { name: 'Test Project' })).toBeVisible()
    expect(screen.getByText('A test project description')).toBeVisible()
  })

  it('displays project technologies with translated label', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('projects.card.technologies')).toBeVisible()
    expect(screen.getByText('React')).toBeVisible()
    expect(screen.getByText('TypeScript')).toBeVisible()
  })

  it('shows GitHub and live demo links with translated labels', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('projects.card.viewSource')).toBeVisible()
    expect(screen.getByText('projects.card.liveDemo')).toBeVisible()
  })

  it('displays stars and forks count', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('100')).toBeVisible()
    expect(screen.getByText('25')).toBeVisible()
  })

  it('shows active status for featured projects (index < 4)', () => {
    render(<ProjectCard project={mockProject} index={0} />)

    expect(screen.getByText('projects.card.status.active')).toBeVisible()
  })

  it('shows maintained status for non-featured projects (index >= 4)', () => {
    render(<ProjectCard project={mockProject} index={5} />)

    expect(screen.getByText('projects.card.status.maintained')).toBeVisible()
  })

  it('applies reversed layout when reversed prop is true', () => {
    render(<ProjectCard project={mockProject} reversed={true} />)

    const article = screen.getByRole('article')
    expect(article).toBeVisible()
    // The component should still render properly with reversed layout
  })

  it('renders without live URL when not provided', () => {
    const { liveUrl, ...projectWithoutLiveUrl } = mockProject
    render(<ProjectCard project={projectWithoutLiveUrl} />)

    expect(screen.getByRole('article')).toBeVisible()
    expect(screen.getByText('projects.card.viewSource')).toBeVisible()
    // Live demo button should not be present
    expect(screen.queryByText('projects.card.liveDemo')).not.toBeInTheDocument()
  })
})
