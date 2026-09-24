import { render, screen } from '@testing-library/react'

import { LinkCard } from '@/ui/LinkCard'

describe('LinkCard', () => {
  it('links to the post it previews', () => {
    render(<LinkCard href="/blog/agents-dont-care" title="Agents don't care" />)

    expect(
      screen.getByRole('link', { name: /Agents don't care/ })
    ).toHaveAttribute('href', '/blog/agents-dont-care')
  })

  it('opens posts on other sites in a new tab', () => {
    render(
      <LinkCard
        href="https://jordyvanvorselen.substack.com/p/agents"
        title="Agents don't care"
      />
    )

    const link = screen.getByRole('link', { name: /Agents don't care/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('keeps blog posts in the same tab', () => {
    render(<LinkCard href="/blog/agents" title="Agents don't care" />)

    expect(
      screen.getByRole('link', { name: /Agents don't care/ })
    ).not.toHaveAttribute('target')
  })

  it('shows who wrote the post and when', () => {
    render(
      <LinkCard
        href="/blog/agents"
        title="Agents don't care"
        author="Jordy van Vorselen"
        date="22 Aug 2026"
      />
    )

    expect(screen.getByText('Jordy van Vorselen · 22 Aug 2026')).toBeVisible()
  })

  it('shows a byline with only the author when the date is unknown', () => {
    render(
      <LinkCard
        href="/blog/agents"
        title="Agents don't care"
        author="Jordy van Vorselen"
      />
    )

    expect(screen.getByText('Jordy van Vorselen')).toBeVisible()
  })

  it('shows a short summary of the post', () => {
    render(
      <LinkCard
        href="/blog/agents"
        title="Agents don't care"
        description="Rules get skipped. A failing test doesn't."
      />
    )

    expect(
      screen.getByText("Rules get skipped. A failing test doesn't.")
    ).toBeVisible()
  })

  it('shows the post cover as a thumbnail', () => {
    render(
      <LinkCard
        href="/blog/agents"
        title="Agents don't care"
        imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      />
    )

    expect(screen.getByRole('img', { name: "Agents don't care" })).toBeVisible()
  })

  it('invites the reader to read the full story', () => {
    render(<LinkCard href="/blog/agents" title="Agents don't care" />)

    expect(screen.getByText('blog.post.readFullStory')).toBeVisible()
  })
})
