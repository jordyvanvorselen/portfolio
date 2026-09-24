import { render, screen } from '@testing-library/react'

import { SubstackButton } from '@/ui/SubstackButton'

describe('SubstackButton', () => {
  it('links to the action on Substack', () => {
    render(
      <SubstackButton
        label="Leave a comment"
        url="https://substack.com/@jordyvanvorselen/note/p-1"
      />
    )

    expect(
      screen.getByRole('link', { name: /Leave a comment/ })
    ).toHaveAttribute('href', 'https://substack.com/@jordyvanvorselen/note/p-1')
  })

  it('tells the reader the link leaves the blog for Substack', () => {
    render(
      <SubstackButton
        label="Leave a comment"
        url="https://substack.com/@jordyvanvorselen/note/p-1"
      />
    )

    const link = screen.getByRole('link', {
      name: 'Leave a comment blog.post.opensOnSubstack',
    })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
