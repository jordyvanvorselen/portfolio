import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe(Home, () => {
  it('renders main element', () => {
    render(<Home />)

    const main = screen.getByRole('main')
    expect(main).toBeVisible()
  })
})
