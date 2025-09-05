import { render } from '@testing-library/react'
import { TimelineItem } from '@/ui/TimelineItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'

// Mock the TimelineDot component
jest.mock('@/ui/TimelineDot', () => ({
  TimelineDot: ({ color }: { color: string }) => (
    <div data-testid="timeline-dot" data-color={color} />
  ),
}))

// Mock the useMediaQuery hook
jest.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: jest.fn(),
}))

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>

describe('TimelineItem', () => {
  const defaultProps = {
    dotColor: 'teal' as const,
    alignment: 'left' as const,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Desktop layout (min-width: 768px)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true)
    })

    it('renders children correctly', () => {
      const testContent = 'Test Timeline Item Content'
      const { getByText } = render(
        <TimelineItem {...defaultProps}>
          <div>{testContent}</div>
        </TimelineItem>
      )

      expect(getByText(testContent)).toBeInTheDocument()
    })

    it('renders timeline dot with correct color', () => {
      const { getByTestId } = render(
        <TimelineItem {...defaultProps} dotColor="purple">
          <div>Content</div>
        </TimelineItem>
      )

      const dot = getByTestId('timeline-dot')
      expect(dot).toHaveAttribute('data-color', 'purple')
    })

    it('applies left alignment layout', () => {
      const { container } = render(
        <TimelineItem {...defaultProps} alignment="left">
          <div>Content</div>
        </TimelineItem>
      )

      const leftContainer = container.querySelector('.w-full.pr-24')
      const rightContainer = container.querySelector('.w-4\\/5.pl-12')

      expect(leftContainer).toBeInTheDocument()
      expect(rightContainer).toBeInTheDocument()
    })

    it('applies right alignment layout', () => {
      const { container } = render(
        <TimelineItem {...defaultProps} alignment="right">
          <div>Content</div>
        </TimelineItem>
      )

      const leftContainer = container.querySelector('.w-4\\/5.pr-12')
      const rightContainer = container.querySelector('.w-4\\/5.pl-12')

      expect(leftContainer).toBeInTheDocument()
      expect(rightContainer).toBeInTheDocument()
    })

    it('applies normal spacing by default', () => {
      const { container } = render(
        <TimelineItem {...defaultProps}>
          <div>Content</div>
        </TimelineItem>
      )
      const item = container.firstChild as HTMLElement

      expect(item).toHaveClass('mb-16')
      expect(item).not.toHaveClass('-mt-64')
    })

    it('applies close spacing when specified', () => {
      const { container } = render(
        <TimelineItem {...defaultProps} spacing="close">
          <div>Content</div>
        </TimelineItem>
      )
      const item = container.firstChild as HTMLElement

      expect(item).toHaveClass('mb-16', '-mt-64')
    })

    it('applies custom className', () => {
      const { container } = render(
        <TimelineItem {...defaultProps} className="custom-item-class">
          <div>Content</div>
        </TimelineItem>
      )
      const item = container.firstChild as HTMLElement

      expect(item).toHaveClass('custom-item-class')
    })

    it('renders timeline dot in centered position', () => {
      const { container } = render(
        <TimelineItem {...defaultProps}>
          <div>Content</div>
        </TimelineItem>
      )

      const dotContainer = container.querySelector(
        '.absolute.left-1\\/2.transform.-translate-x-1\\/2.z-10'
      )
      expect(dotContainer).toBeInTheDocument()
    })
  })

  describe('Mobile layout (max-width: 767px)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false)
    })

    it('renders children correctly', () => {
      const testContent = 'Test Timeline Item Content'
      const { getByText } = render(
        <TimelineItem {...defaultProps}>
          <div>{testContent}</div>
        </TimelineItem>
      )

      expect(getByText(testContent)).toBeInTheDocument()
    })

    it('does not render timeline dot on mobile', () => {
      const { queryByTestId } = render(
        <TimelineItem {...defaultProps}>
          <div>Content</div>
        </TimelineItem>
      )

      const dot = queryByTestId('timeline-dot')
      expect(dot).not.toBeInTheDocument()
    })

    it('applies mobile spacing', () => {
      const { container } = render(
        <TimelineItem {...defaultProps}>
          <div>Content</div>
        </TimelineItem>
      )
      const item = container.firstChild as HTMLElement

      expect(item).toHaveClass('mb-8')
      expect(item).not.toHaveClass('mb-16')
    })

    it('applies custom className on mobile', () => {
      const { container } = render(
        <TimelineItem {...defaultProps} className="custom-mobile-class">
          <div>Content</div>
        </TimelineItem>
      )
      const item = container.firstChild as HTMLElement

      expect(item).toHaveClass('custom-mobile-class')
    })

    it('ignores alignment on mobile (full width)', () => {
      const { container: leftContainer } = render(
        <TimelineItem {...defaultProps} alignment="left">
          <div>Left Content</div>
        </TimelineItem>
      )

      const { container: rightContainer } = render(
        <TimelineItem {...defaultProps} alignment="right">
          <div>Right Content</div>
        </TimelineItem>
      )

      // Both should have the same simple mobile layout
      expect(leftContainer.querySelector('.relative.mb-8')).toBeInTheDocument()
      expect(rightContainer.querySelector('.relative.mb-8')).toBeInTheDocument()
    })

    it('ignores spacing on mobile', () => {
      const { container: normalContainer } = render(
        <TimelineItem {...defaultProps} spacing="normal">
          <div>Normal Content</div>
        </TimelineItem>
      )

      const { container: closeContainer } = render(
        <TimelineItem {...defaultProps} spacing="close">
          <div>Close Content</div>
        </TimelineItem>
      )

      // Both should have same mobile spacing
      const normalItem = normalContainer.firstChild as HTMLElement
      const closeItem = closeContainer.firstChild as HTMLElement

      expect(normalItem).toHaveClass('mb-8')
      expect(closeItem).toHaveClass('mb-8')
      expect(closeItem).not.toHaveClass('-mt-64')
    })
  })

  it('calls useMediaQuery with correct breakpoint', () => {
    render(
      <TimelineItem {...defaultProps}>
        <div>Content</div>
      </TimelineItem>
    )

    expect(mockUseMediaQuery).toHaveBeenCalledWith('(min-width: 768px)')
  })
})
