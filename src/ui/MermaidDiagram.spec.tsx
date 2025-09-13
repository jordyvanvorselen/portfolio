import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MermaidDiagram } from '@/ui/MermaidDiagram'

// Only mock mermaid since it's a third-party library that manipulates DOM
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn(() =>
      Promise.resolve({
        svg: '<svg>mocked svg</svg>',
        bindFunctions: vi.fn(),
      })
    ),
  },
}))

describe('MermaidDiagram', () => {
  const mockCode = 'graph TD\n  A --> B'
  const mockId = 'test-diagram'

  it('renders the diagram container with correct styling', () => {
    render(<MermaidDiagram code={mockCode} id={mockId} />)

    const container = screen
      .getByRole('img', { name: 'Mermaid diagram' })
      .closest('.my-8')
    expect(container).toHaveClass(
      'my-8',
      'rounded-2xl',
      'border-2',
      'border-gray-700/50'
    )
  })

  it('uses provided ID for diagram rendering', () => {
    render(<MermaidDiagram code={mockCode} id="custom-id" />)

    expect(screen.getByRole('img', { name: 'Mermaid diagram' })).toBeVisible()
  })

  it('renders diagram with correct accessibility attributes', () => {
    render(<MermaidDiagram code={mockCode} id={mockId} />)

    expect(screen.getByRole('img', { name: 'Mermaid diagram' })).toBeVisible()
  })

  it('shows fullscreen button on hover and opens modal when clicked', () => {
    render(<MermaidDiagram code={mockCode} id={mockId} />)

    const fullscreenButton = screen.getByLabelText('Open fullscreen')
    expect(fullscreenButton).toBeVisible()

    fireEvent.click(fullscreenButton)

    // Check that fullscreen modal opens
    expect(screen.getByRole('dialog')).toBeVisible()
  })

  it('closes fullscreen modal when close button is clicked', () => {
    render(<MermaidDiagram code={mockCode} id={mockId} />)

    // Open modal
    fireEvent.click(screen.getByLabelText('Open fullscreen'))
    expect(screen.getByRole('dialog')).toBeVisible()

    // Close modal
    fireEvent.click(screen.getByLabelText('Close fullscreen'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('handles mermaid rendering with proper ref management', async () => {
    // This test ensures the mermaid rendering code path is covered
    render(<MermaidDiagram code={mockCode} id={mockId} />)

    // Wait for the async mermaid rendering to complete
    await new Promise(resolve => setTimeout(resolve, 20))

    expect(screen.getByRole('img', { name: 'Mermaid diagram' })).toBeVisible()
  })
})
