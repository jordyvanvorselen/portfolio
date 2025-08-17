import { render, screen } from '@testing-library/react'

import { ProjectsCollaboration } from '@/domains/projects/ProjectsCollaboration'

describe('ProjectsCollaboration', () => {
  it('renders collaboration title', () => {
    render(<ProjectsCollaboration />)

    expect(
      screen.getByRole('heading', {
        name: /Let's Build Something Amazing Together/i,
      })
    ).toBeVisible()
  })

  it('renders collaboration description', () => {
    render(<ProjectsCollaboration />)

    expect(
      screen.getByText(/Interested in collaborating on open source projects/i)
    ).toBeVisible()
  })

  it('renders github button with correct link', () => {
    render(<ProjectsCollaboration />)

    const githubButton = screen.getByRole('link', { name: /Follow on GitHub/i })
    expect(githubButton).toBeVisible()
  })

  it('renders contact button', () => {
    render(<ProjectsCollaboration />)

    const contactButton = screen.getByRole('link', { name: /Get in Touch/i })
    expect(contactButton).toBeVisible()
  })
})
