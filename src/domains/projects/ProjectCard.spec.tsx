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

  it('displays project technologies', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('React')).toBeVisible()
    expect(screen.getByText('TypeScript')).toBeVisible()
  })

  it('shows GitHub and live demo links', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByRole('link', { name: /view source/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /live demo/i })).toBeVisible()
  })

  it('displays stars and forks count', () => {
    render(<ProjectCard project={mockProject} />)

    expect(screen.getByText('100')).toBeVisible()
    expect(screen.getByText('25')).toBeVisible()
  })
})
