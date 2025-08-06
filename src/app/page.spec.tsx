import { render, screen } from '@testing-library/react'
import Home from './page'

describe(Home, () => {
  it('renders main element', () => {
    render(<Home />)
    
    const main = screen.getByRole('main')
    expect(main).toBeVisible()
  })

  it('renders welcome heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeVisible()
    expect(heading).toHaveTextContent("Welcome to Jordy van Vorselen's Portfolio")
  })
})