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

  it('applies default layout classes', () => {
    const { container } = render(
      <TimelineLayout>
        <div>Content</div>
      </TimelineLayout>
    )
    const layout = container.firstChild as HTMLElement

    expect(layout).toHaveClass('w-full', 'mx-auto', 'relative', 'px-4')
  })

  it('applies custom className', () => {
    const { container } = render(
      <TimelineLayout className="custom-layout-class">
        <div>Content</div>
      </TimelineLayout>
    )
    const layout = container.firstChild as HTMLElement

    expect(layout).toHaveClass('custom-layout-class')
  })

  it('renders vertical timeline line for desktop', () => {
    const { container } = render(
      <TimelineLayout>
        <div>Content</div>
      </TimelineLayout>
    )

    const timelineLine = container.querySelector('.hidden.md\\:block')
    expect(timelineLine).toBeInTheDocument()
    expect(timelineLine).toHaveClass(
      'absolute',
      'left-1/2',
      'transform',
      '-translate-x-1/2',
      'w-0.5',
      'h-full',
      'bg-gradient-to-b',
      'from-teal-500/20',
      'via-teal-500/40',
      'to-teal-500/20'
    )
  })
})
