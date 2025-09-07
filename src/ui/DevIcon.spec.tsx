import { render } from '@testing-library/react'
import { DevIcon } from '@/ui/DevIcon'

describe('DevIcon', () => {
  it('renders with required name prop', () => {
    const { container } = render(<DevIcon name="react" />)

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('devicon-react-plain')
    expect(icon).toHaveClass('colored')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders with wordmark variant', () => {
    const { container } = render(<DevIcon name="java" wordmark />)

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-java-plain-wordmark')
    expect(icon).toHaveClass('colored')
  })

  it('renders without wordmark (default)', () => {
    const { container } = render(<DevIcon name="python" wordmark={false} />)

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-python-plain')
    expect(icon).toHaveClass('colored')
  })

  it('renders with colored set to false', () => {
    const { container } = render(<DevIcon name="nodejs" colored={false} />)

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-nodejs-plain')
    expect(icon).not.toHaveClass('colored')
  })

  it('renders with colored set to true (default)', () => {
    const { container } = render(<DevIcon name="typescript" colored={true} />)

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-typescript-plain')
    expect(icon).toHaveClass('colored')
  })

  it('renders with custom className', () => {
    const { container } = render(
      <DevIcon name="javascript" className="custom-class w-6 h-6" />
    )

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-javascript-plain')
    expect(icon).toHaveClass('colored')
    expect(icon).toHaveClass('custom-class')
    expect(icon).toHaveClass('w-6')
    expect(icon).toHaveClass('h-6')
  })

  it('renders with custom style', () => {
    const customStyle = { fontSize: '24px', color: 'red' }
    const { container } = render(<DevIcon name="css3" style={customStyle} />)

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveStyle({ fontSize: '24px', color: 'rgb(255, 0, 0)' })
  })

  it('renders with all props combined', () => {
    const customStyle = { margin: '10px' }
    const { container } = render(
      <DevIcon
        name="html5"
        wordmark={true}
        className="test-class"
        colored={false}
        style={customStyle}
      />
    )

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-html5-plain-wordmark')
    expect(icon).toHaveClass('test-class')
    expect(icon).not.toHaveClass('colored')
    expect(icon).toHaveStyle({ margin: '10px' })
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders with empty className by default', () => {
    const { container } = render(<DevIcon name="vue" />)

    const icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-vue-plain')
    expect(icon).toHaveClass('colored')
  })

  it('constructs correct class names for different technology names', () => {
    const { container, rerender } = render(<DevIcon name="amazonwebservices" />)

    let icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-amazonwebservices-plain')

    rerender(<DevIcon name="spring" />)
    icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-spring-plain')

    rerender(<DevIcon name="kubernetes" />)
    icon = container.querySelector('i[aria-hidden="true"]')!
    expect(icon).toHaveClass('devicon-kubernetes-plain')
  })
})
