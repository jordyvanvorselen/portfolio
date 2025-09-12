import { render, screen } from '@testing-library/react'
import { BLOCKS } from '@contentful/rich-text-types'

import { Markdown } from '@/lib/markdown'

// Mock content creator for tests
const createMockContent = (content: unknown) =>
  content as Parameters<typeof Markdown>[0]['content']

describe('Markdown', () => {
  it('renders simple rich text content', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Hello world',
                marks: [],
                data: {},
              },
            ],
          },
        ],
      },
      links: {
        assets: { block: [] },
        entries: { block: [] },
      },
    }

    render(<Markdown content={createMockContent(content)} />)
    expect(screen.getByText('Hello world')).toBeVisible()
  })

  it('renders embedded code blocks with title', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.EMBEDDED_ENTRY,
            data: {
              target: {
                sys: {
                  id: 'test-code-block-id',
                },
              },
            },
            content: [],
          },
        ],
      },
      links: {
        assets: { block: [] },
        entries: {
          block: [
            {
              sys: { id: 'test-code-block-id' },
              title: 'Example Code',
              programmingLanguage: 'JavaScript',
              code: 'console.log("Hello, world!");',
            },
          ],
        },
      },
    }

    render(<Markdown content={createMockContent(content)} />)

    expect(screen.getByText('Example Code')).toBeVisible()
    expect(screen.getByText('console.log("Hello, world!");')).toBeVisible()

    const codeElement = screen.getByText('console.log("Hello, world!");')
    expect(codeElement).toHaveClass('language-javascript')
  })

  it('renders code block without title', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.EMBEDDED_ENTRY,
            data: {
              target: {
                sys: {
                  id: 'test-code-block-no-title',
                },
              },
            },
            content: [],
          },
        ],
      },
      links: {
        assets: { block: [] },
        entries: {
          block: [
            {
              sys: { id: 'test-code-block-no-title' },
              title: '',
              programmingLanguage: 'Python',
              code: 'print("Hello")',
            },
          ],
        },
      },
    }

    render(<Markdown content={createMockContent(content)} />)

    expect(screen.getByText('print("Hello")')).toBeVisible()
    // Title section should not be rendered when title is empty
    expect(screen.queryByText('Example Code')).not.toBeInTheDocument()
  })

  it('handles missing code block entry gracefully', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.EMBEDDED_ENTRY,
            data: {
              target: {
                sys: {
                  id: 'missing-entry-id',
                },
              },
            },
            content: [],
          },
        ],
      },
      links: {
        assets: { block: [] },
        entries: { block: [] }, // No matching entry
      },
    }

    const { container } = render(
      <Markdown content={createMockContent(content)} />
    )

    // Should render without errors, but no code block
    expect(container.querySelector('pre')).not.toBeInTheDocument()
  })

  it('handles complex content with multiple elements', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Introduction text',
                marks: [],
                data: {},
              },
            ],
          },
          {
            nodeType: BLOCKS.EMBEDDED_ENTRY,
            data: {
              target: {
                sys: {
                  id: 'code-example',
                },
              },
            },
            content: [],
          },
          {
            nodeType: BLOCKS.PARAGRAPH,
            data: {},
            content: [
              {
                nodeType: 'text',
                value: 'Conclusion text',
                marks: [],
                data: {},
              },
            ],
          },
        ],
      },
      links: {
        assets: { block: [] },
        entries: {
          block: [
            {
              sys: { id: 'code-example' },
              title: 'Code Example',
              programmingLanguage: 'TypeScript',
              code: 'const x: string = "test";',
            },
          ],
        },
      },
    }

    render(<Markdown content={createMockContent(content)} />)

    expect(screen.getByText('Introduction text')).toBeVisible()
    expect(screen.getByText('Code Example')).toBeVisible()
    expect(screen.getByText('const x: string = "test";')).toBeVisible()
    expect(screen.getByText('Conclusion text')).toBeVisible()
  })

  it('converts programming language to lowercase for CSS class', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.EMBEDDED_ENTRY,
            data: {
              target: {
                sys: {
                  id: 'uppercase-lang',
                },
              },
            },
            content: [],
          },
        ],
      },
      links: {
        assets: { block: [] },
        entries: {
          block: [
            {
              sys: { id: 'uppercase-lang' },
              title: 'Test',
              programmingLanguage: 'JAVASCRIPT',
              code: 'test code',
            },
          ],
        },
      },
    }

    render(<Markdown content={createMockContent(content)} />)

    const codeElement = screen.getByText('test code')
    expect(codeElement).toHaveClass('language-javascript')
  })

  it('renders embedded assets with images', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.EMBEDDED_ASSET,
            data: {
              target: {
                sys: {
                  id: 'test-asset-id',
                },
              },
            },
            content: [],
          },
        ],
      },
      links: {
        assets: {
          block: [
            {
              sys: { id: 'test-asset-id' },
              url: 'https://example.com/image.jpg',
              description: 'Test image description',
            },
          ],
        },
        entries: { block: [] },
      },
    }

    const { container } = render(
      <Markdown content={createMockContent(content)} />
    )

    // Should render an image
    const image = container.querySelector('img')
    expect(image).toBeInTheDocument()
  })

  it('handles asset without URL gracefully', () => {
    const content = {
      json: {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [
          {
            nodeType: BLOCKS.EMBEDDED_ASSET,
            data: {
              target: {
                sys: {
                  id: 'asset-no-url',
                },
              },
            },
            content: [],
          },
        ],
      },
      links: {
        assets: {
          block: [
            {
              sys: { id: 'asset-no-url' },
              url: '',
              description: 'Asset without URL',
            },
          ],
        },
        entries: { block: [] },
      },
    }

    const { container } = render(
      <Markdown content={createMockContent(content)} />
    )

    // Should render without errors, but no image
    expect(container.querySelector('img')).not.toBeInTheDocument()
  })
})
