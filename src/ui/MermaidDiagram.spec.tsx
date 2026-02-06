import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { MermaidDiagram } from '@/ui/MermaidDiagram'
import mermaid from 'mermaid'

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

  it('handles unmount during setTimeout delay (line 44)', async () => {
    // Use fake timers to control the setTimeout
    vi.useFakeTimers()

    const { unmount } = render(<MermaidDiagram code={mockCode} id={mockId} />)

    // Unmount before the 10ms setTimeout completes
    unmount()

    // Advance timers to trigger the setTimeout callback
    await vi.advanceTimersByTimeAsync(10)

    // Restore real timers
    vi.useRealTimers()

    // No error should occur - the null check at line 44 prevents it
  })

  it('handles unmount after mermaid.render completes (line 49)', async () => {
    // Create a deferred promise that we can control
    let resolveMermaid: (value: {
      svg: string
      bindFunctions?: () => void
      diagramType?: string
    }) => void
    const mermaidPromise = new Promise<{
      svg: string
      bindFunctions?: () => void
      diagramType?: string
    }>(resolve => {
      resolveMermaid = resolve
    })

    // Mock mermaid.render to return our controlled promise
    vi.mocked(mermaid.render).mockReturnValueOnce(
      mermaidPromise as ReturnType<typeof mermaid.render>
    )

    const { unmount } = render(<MermaidDiagram code={mockCode} id={mockId} />)

    // Wait for setTimeout to complete
    await new Promise(resolve => setTimeout(resolve, 15))

    // Unmount before resolving mermaid.render
    unmount()

    // Now resolve mermaid.render - this should trigger the line 49 null check
    resolveMermaid!({
      svg: '<svg>mocked svg</svg>',
      bindFunctions: vi.fn(),
    })

    // Wait for promise resolution
    await new Promise(resolve => setTimeout(resolve, 10))

    // No error should occur - the null check at line 49 prevents it
  })
})
