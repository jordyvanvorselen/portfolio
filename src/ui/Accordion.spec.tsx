import { render, screen, fireEvent } from '@testing-library/react'

import { Accordion, useAccordion } from '@/ui/Accordion'

describe('Accordion', () => {
  const mockOnOpenChange = jest.fn()

  it('renders children inside the accordion container', () => {
    render(
      <Accordion openIndex={null} onOpenChange={mockOnOpenChange}>
        <div>Test child 1</div>
        <div>Test child 2</div>
      </Accordion>
    )

    expect(screen.getByText('Test child 1')).toBeVisible()
    expect(screen.getByText('Test child 2')).toBeVisible()
  })

  it('provides context value with openIndex and setOpenIndex', () => {
    const TestComponent = () => {
      const { openIndex, setOpenIndex } = useAccordion()
      return (
        <div>
          <span data-testid="open-index">{openIndex}</span>
          <button onClick={() => setOpenIndex(1)}>Set Index</button>
        </div>
      )
    }

    render(
      <Accordion openIndex={2} onOpenChange={mockOnOpenChange}>
        <TestComponent />
      </Accordion>
    )

    expect(screen.getByTestId('open-index')).toHaveTextContent('2')
  })

  it('calls onOpenChange when setOpenIndex is called from context', () => {
    const TestComponent = () => {
      const { setOpenIndex } = useAccordion()
      return <button onClick={() => setOpenIndex(3)}>Set Index</button>
    }

    render(
      <Accordion openIndex={null} onOpenChange={mockOnOpenChange}>
        <TestComponent />
      </Accordion>
    )

    const button = screen.getByRole('button', { name: 'Set Index' })
    fireEvent.click(button)

    expect(mockOnOpenChange).toHaveBeenCalledWith(3)
  })

  it('provides allowMultiple context value when specified', () => {
    const TestComponent = () => {
      const { allowMultiple } = useAccordion()
      return <span data-testid="allow-multiple">{String(allowMultiple)}</span>
    }

    render(
      <Accordion
        openIndex={null}
        onOpenChange={mockOnOpenChange}
        allowMultiple={true}
      >
        <TestComponent />
      </Accordion>
    )

    expect(screen.getByTestId('allow-multiple')).toHaveTextContent('true')
  })

  it('defaults allowMultiple to false when not specified', () => {
    const TestComponent = () => {
      const { allowMultiple } = useAccordion()
      return <span data-testid="allow-multiple">{String(allowMultiple)}</span>
    }

    render(
      <Accordion openIndex={null} onOpenChange={mockOnOpenChange}>
        <TestComponent />
      </Accordion>
    )

    expect(screen.getByTestId('allow-multiple')).toHaveTextContent('false')
  })

  it('applies custom className when provided', () => {
    const { container } = render(
      <Accordion
        openIndex={null}
        onOpenChange={mockOnOpenChange}
        className="custom-accordion"
      >
        <div>Child</div>
      </Accordion>
    )

    const accordionDiv = container.querySelector('div.custom-accordion')
    expect(accordionDiv).toBeVisible()
  })

  it('applies default spacing class', () => {
    const { container } = render(
      <Accordion openIndex={null} onOpenChange={mockOnOpenChange}>
        <div>Child</div>
      </Accordion>
    )

    const accordionDiv = container.querySelector('div.space-y-4')
    expect(accordionDiv).toBeVisible()
  })

  it('handles null openIndex correctly', () => {
    const TestComponent = () => {
      const { openIndex } = useAccordion()
      return (
        <span data-testid="open-index">
          {openIndex === null ? 'null' : openIndex}
        </span>
      )
    }

    render(
      <Accordion openIndex={null} onOpenChange={mockOnOpenChange}>
        <TestComponent />
      </Accordion>
    )

    expect(screen.getByTestId('open-index')).toHaveTextContent('null')
  })
})

describe('useAccordion hook', () => {
  it('throws error when used outside of Accordion context', () => {
    const TestComponent = () => {
      useAccordion() // This should throw
      return <div>Test</div>
    }

    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<TestComponent />)).toThrow(
      'useAccordion must be used within an Accordion'
    )

    consoleSpy.mockRestore()
  })

  it('works correctly when used within Accordion context', () => {
    const TestComponent = () => {
      const context = useAccordion()
      return (
        <div data-testid="context-exists">{context ? 'exists' : 'missing'}</div>
      )
    }

    render(
      <Accordion openIndex={0} onOpenChange={jest.fn()}>
        <TestComponent />
      </Accordion>
    )

    expect(screen.getByTestId('context-exists')).toHaveTextContent('exists')
  })
})
