import { render, screen } from '@testing-library/react'
import RootLayout, { metadata } from '@/app/layout'

// Suppress all console errors for layout component tests
const originalConsoleError = console.error
beforeAll(() => {
  console.error = () => {}
})

afterAll(() => {
  console.error = originalConsoleError
})

describe(RootLayout, () => {
  it('renders header component', () => {
    render(
      <body>
        <RootLayout>Test content</RootLayout>
      </body>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeVisible()
  })

  it('renders children content', () => {
    render(
      <body>
        <RootLayout>Test children content</RootLayout>
      </body>
    )

    expect(screen.getByText('Test children content')).toBeVisible()
  })
})

describe('metadata', () => {
  it('has correct title and description', () => {
    expect(metadata.title).toBe('Jordy van Vorselen - Portfolio')
    expect(metadata.description).toBe(
      'Full-stack developer and software engineer portfolio'
    )
  })
})
