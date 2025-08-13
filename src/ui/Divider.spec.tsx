import { render, screen } from '@testing-library/react'

import { Divider } from '@/ui/Divider'

describe('Divider', () => {
  it('renders with default variant', () => {
    render(<Divider data-testid="divider" />)

    const divider = screen.getByTestId('divider')
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveClass('border-t border-slate-700/50 pt-6')
  })

  it('renders with children content', () => {
    render(
      <Divider>
        <div>Content below divider</div>
      </Divider>
    )

    expect(screen.getByText('Content below divider')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Divider className="custom-class" data-testid="divider" />)

    const divider = screen.getByTestId('divider')
    expect(divider).toHaveClass(
      'border-t border-slate-700/50 pt-6 custom-class'
    )
  })

  it('renders vertical-gradient variant', () => {
    render(<Divider variant="vertical-gradient" data-testid="divider" />)

    const divider = screen.getByTestId('divider')
    expect(divider).toBeVisible()
  })

  it('renders horizontal-gradient variant', () => {
    render(<Divider variant="horizontal-gradient" data-testid="divider" />)

    const divider = screen.getByTestId('divider')
    expect(divider).toBeVisible()
  })
})
