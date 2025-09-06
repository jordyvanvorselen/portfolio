import { render } from '@testing-library/react'
import { TimelineLayout } from '@/ui/TimelineLayout'

describe('TimelineLayout', () => {
  it('renders children correctly', () => {
    const testContent = 'Test Timeline Content'
    const { getByText } = render(
      <TimelineLayout>
        <div>{testContent}</div>
      </TimelineLayout>
    )

    expect(getByText(testContent)).toBeInTheDocument()
  })

  it('renders with additional className when provided', () => {
    const { getByText } = render(
      <TimelineLayout className="custom-layout-class">
        <div>Custom Layout Content</div>
      </TimelineLayout>
    )

    expect(getByText('Custom Layout Content')).toBeInTheDocument()
  })

  it('renders timeline structure elements', () => {
    const { getByText } = render(
      <TimelineLayout>
        <div>Timeline Content</div>
      </TimelineLayout>
    )

    expect(getByText('Timeline Content')).toBeInTheDocument()
  })
})
