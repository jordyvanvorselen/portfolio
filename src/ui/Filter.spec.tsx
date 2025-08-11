import { render, screen, fireEvent } from '@testing-library/react'

import { Filter } from '@/ui/Filter'

describe('Filter', () => {
  it('renders filter text', () => {
    render(<Filter>All</Filter>)

    expect(screen.getByText('All')).toBeVisible()
  })

  it('applies active styles when active prop is true', () => {
    render(<Filter active>All</Filter>)

    const filter = screen.getByText('All')
    expect(filter).toHaveClass('bg-teal-500')
  })

  it('applies inactive styles when active prop is false', () => {
    render(<Filter active={false}>All</Filter>)

    const filter = screen.getByText('All')
    expect(filter).toHaveClass('border-gray-600')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Filter onClick={handleClick}>All</Filter>)

    fireEvent.click(screen.getByText('All'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
