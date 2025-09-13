import { render } from '@testing-library/react'
import { FlagIcon } from '@/ui/FlagIcon'

describe('FlagIcon', () => {
  it('renders with correct base classes', () => {
    const { container } = render(<FlagIcon country="us" />)
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveClass('fi', 'fi-us')
    expect(flagElement.tagName).toBe('SPAN')
  })

  it('applies country code in lowercase', () => {
    const { container } = render(<FlagIcon country="GB" />)
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveClass('fi-gb')
  })

  it('adds squared class when squared prop is true', () => {
    const { container } = render(<FlagIcon country="nl" squared />)
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveClass('fi', 'fi-nl', 'fis')
  })

  it('does not add squared class when squared prop is false', () => {
    const { container } = render(<FlagIcon country="nl" squared={false} />)
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveClass('fi', 'fi-nl')
    expect(flagElement).not.toHaveClass('fis')
  })

  it('applies additional className when provided', () => {
    const { container } = render(
      <FlagIcon country="fr" className="w-8 h-8 custom-class" />
    )
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveClass('fi', 'fi-fr', 'w-8', 'h-8', 'custom-class')
  })

  it('applies inline styles when provided', () => {
    const customStyle = { backgroundColor: 'red', margin: '10px' }
    const { container } = render(<FlagIcon country="de" style={customStyle} />)
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveStyle('background-color: red')
    expect(flagElement).toHaveStyle('margin: 10px')
  })

  it('has aria-hidden attribute for accessibility', () => {
    const { container } = render(<FlagIcon country="es" />)
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('handles empty className gracefully', () => {
    const { container } = render(<FlagIcon country="it" className="" />)
    const flagElement = container.firstChild as HTMLElement

    expect(flagElement).toHaveClass('fi', 'fi-it')
    expect(flagElement.className).not.toContain('undefined')
  })
})
