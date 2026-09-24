import { render, screen } from '@testing-library/react'

import { SubstackSubscribe } from '@/ui/SubstackSubscribe'

describe('SubstackSubscribe', () => {
  it('embeds the Substack signup form of the publication', () => {
    render(
      <SubstackSubscribe publicationUrl="https://jordyvanvorselen.substack.com" />
    )

    expect(screen.getByTitle('blog.post.subscribeFormTitle')).toHaveAttribute(
      'src',
      'https://jordyvanvorselen.substack.com/embed'
    )
  })

  it('shows the caption above the form', () => {
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
