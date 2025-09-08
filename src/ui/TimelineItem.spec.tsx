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

    it('renders with left alignment', () => {
      const { getByText } = render(
        <TimelineItem {...defaultProps} alignment="left">
          <div>Left aligned content</div>
        </TimelineItem>
      )

      expect(getByText('Left aligned content')).toBeInTheDocument()
    })

    it('renders with right alignment', () => {
      const { getByText } = render(
        <TimelineItem {...defaultProps} alignment="right">
          <div>Right aligned content</div>
        </TimelineItem>
      )

      expect(getByText('Right aligned content')).toBeInTheDocument()
    })

    it('renders with normal spacing on desktop', () => {
      const { getByText } = render(
        <TimelineItem {...defaultProps} spacing="normal">
          <div>Normal spacing content</div>
        </TimelineItem>
      )

      expect(getByText('Normal spacing content')).toBeInTheDocument()
    })

    it('renders with close spacing on desktop', () => {
      const { getByText } = render(
        <TimelineItem {...defaultProps} spacing="close">
          <div>Close spacing content</div>
        </TimelineItem>
      )

      expect(getByText('Close spacing content')).toBeInTheDocument()
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

    it('renders content on mobile', () => {
      const { getByText } = render(
        <TimelineItem {...defaultProps}>
          <div>Mobile Content</div>
        </TimelineItem>
      )

      expect(getByText('Mobile Content')).toBeInTheDocument()
    })

    it('renders with different alignments on mobile', () => {
      const { getByText: getLeftText } = render(
        <TimelineItem {...defaultProps} alignment="left">
          <div>Left Content</div>
        </TimelineItem>
      )

      const { getByText: getRightText } = render(
        <TimelineItem {...defaultProps} alignment="right">
          <div>Right Content</div>
        </TimelineItem>
      )

      expect(getLeftText('Left Content')).toBeInTheDocument()
      expect(getRightText('Right Content')).toBeInTheDocument()
    })

    it('renders with different spacing options on mobile', () => {
      const { getByText: getNormalText } = render(
        <TimelineItem {...defaultProps} spacing="normal">
          <div>Normal Content</div>
        </TimelineItem>
      )

      const { getByText: getCloseText } = render(
        <TimelineItem {...defaultProps} spacing="close">
          <div>Close Content</div>
        </TimelineItem>
      )

      expect(getNormalText('Normal Content')).toBeInTheDocument()
      expect(getCloseText('Close Content')).toBeInTheDocument()
    })
  })

  it('calls useMediaQuery with correct breakpoint', () => {
    render(
      <TimelineItem {...defaultProps}>
        <div>Content</div>
      </TimelineItem>
    )

    expect(mockUseMediaQuery).toHaveBeenCalledWith('(min-width: 1280px)')
  })
})
