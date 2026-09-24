import { render, screen } from '@testing-library/react'

import { SubstackSubscribe } from '@/ui/SubstackSubscribe'

describe('SubstackSubscribe', () => {
  it('links to the subscribe page of the publication on Substack', () => {
    render(
      <SubstackSubscribe publicationUrl="https://jordyvanvorselen.substack.com" />
    )

    const link = screen.getByRole('link', {
      name: 'blog.post.subscribeOnSubstack blog.post.opensOnSubstack',
    })
    expect(link).toHaveAttribute(
      'href',
      'https://jordyvanvorselen.substack.com/subscribe'
    )
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('shows the caption above the button', () => {
    render(
      <SubstackSubscribe
        publicationUrl="https://jordyvanvorselen.substack.com"
        caption="Subscribe for free to get the next post."
      />
    )

    expect(
      screen.getByText('Subscribe for free to get the next post.')
    ).toBeVisible()
  })
})
