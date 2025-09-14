import { createMockDataFactory } from '@/test/msw/mock-data/createMockDataFactory'

// Contentful API response structure for blog posts
export interface ContentfulBlogPostEntry {
  sys: {
    id: string
    contentType: { sys: { id: string } }
  }
  fields: {
    slug: string
    title: string
    description: string
    publicationDate: string
    content: {
      nodeType: string
      data?: any
      content: Array<{
        nodeType: string
        data?: any
        content?: Array<{
          nodeType: string
          value?: string
          marks?: any[]
          data?: any
        }>
      }>
    }
    featuredImage: {
      fields: { file: { url: string } }
    }
    tags: string[]
    canonicalUrl?: string
  }
}

export interface ContentfulBlogPostsResponse {
  sys: { type: string }
  total: number
  items: ContentfulBlogPostEntry[]
  includes?: {
    Asset?: Array<{
      sys: { id: string }
      fields: { file: { url: string }; description: string }
    }>
    Entry?: Array<{
      sys: { id: string }
      fields: {
        title: string
        programmingLanguage: string
        code: string
      }
    }>
  }
}

// Default mock blog posts data
const defaultBlogPostsResponse: ContentfulBlogPostsResponse = {
  sys: { type: 'Array' },
  total: 4,
  items: [
    {
      sys: {
        id: '1',
        contentType: { sys: { id: 'blogPost' } },
      },
      fields: {
        slug: 'react-hooks-guide',
        title: 'React Hooks Guide',
        description: 'Learn about React hooks and how to use them effectively',
        publicationDate: '2024-01-01',
        content: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Learn about React hooks and how to use them effectively in your applications.',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'embedded-entry-block',
              data: {
                target: {
                  sys: {
                    id: 'codeblock-1',
                    type: 'Link',
                    linkType: 'Entry',
                  },
                },
              },
              content: [],
            },
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'This code example shows how to use the useState hook.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        featuredImage: {
          fields: {
            file: {
              url: '//images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
            },
          },
        },
        tags: ['React', 'JavaScript', 'Frontend'],
        canonicalUrl: 'https://example.com/react-hooks-guide',
      },
    },
    {
      sys: {
        id: '2',
        contentType: { sys: { id: 'blogPost' } },
      },
      fields: {
        slug: 'react-components',
        title: 'React Components',
        description: 'Building React components with best practices',
        publicationDate: '2024-01-02',
        content: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Building React components with best practices and modern patterns.',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'embedded-entry-block',
              data: {
                target: {
                  sys: {
                    id: 'codeblock-2',
                    type: 'Link',
                    linkType: 'Entry',
                  },
                },
              },
              content: [],
            },
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'This TypeScript interface defines a clean component API.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        featuredImage: {
          fields: {
            file: {
              url: '//images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
            },
          },
        },
        tags: ['React', 'Components'],
      },
    },
    {
      sys: {
        id: '3',
        contentType: { sys: { id: 'blogPost' } },
      },
      fields: {
        slug: 'python-tips',
        title: 'Python Tips',
        description: 'Useful Python tips for better development',
        publicationDate: '2024-01-03',
        content: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Useful Python tips for better development and performance optimization.',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'embedded-asset-block',
              data: {
                target: {
                  sys: {
                    id: 'asset-1',
                    type: 'Link',
                    linkType: 'Asset',
                  },
                },
              },
              content: [],
            },
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Here are some advanced Python techniques to improve your code.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        featuredImage: {
          fields: {
            file: {
              url: '//images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
            },
          },
        },
        tags: ['Python', 'Backend'],
      },
    },
    {
      sys: {
        id: '4',
        contentType: { sys: { id: 'blogPost' } },
      },
      fields: {
        slug: 'typescript-advanced',
        title: 'Advanced TypeScript',
        description: 'Advanced TypeScript techniques and patterns',
        publicationDate: '2024-01-04',
        content: {
          nodeType: 'document',
          data: {},
          content: [
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'Advanced TypeScript techniques and patterns for modern web development.',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'embedded-entry-block',
              data: {
                target: {
                  sys: {
                    id: 'codeblock-2',
                    type: 'Link',
                    linkType: 'Entry',
                  },
                },
              },
              content: [],
            },
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'This interface demonstrates advanced TypeScript concepts.',
                  marks: [],
                  data: {},
                },
              ],
            },
            {
              nodeType: 'embedded-entry-block',
              data: {
                target: {
                  sys: {
                    id: 'mermaid-1',
                    type: 'Link',
                    linkType: 'Entry',
                  },
                },
              },
              content: [],
            },
            {
              nodeType: 'paragraph',
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value:
                    'The diagram above shows the relationship between these concepts.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        featuredImage: {
          fields: {
            file: {
              url: '//images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
            },
          },
        },
        tags: ['TypeScript', 'JavaScript', 'Frontend'],
      },
    },
  ],
  includes: {
    Asset: [
      {
        sys: { id: 'asset-1' },
        fields: {
          file: {
            url: '//images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
          },
          description: 'Sample asset 1',
        },
      },
    ],
    Entry: [
      {
        sys: { id: 'codeblock-1' },
        fields: {
          title: 'JavaScript Example',
          programmingLanguage: 'JavaScript',
          code: 'console.log("Hello, World!");',
        },
      },
      {
        sys: { id: 'codeblock-2' },
        fields: {
          title: 'TypeScript Interface',
          programmingLanguage: 'TypeScript',
          code: 'interface User {\n  name: string;\n  id: number;\n}',
        },
      },
      {
        sys: { id: 'mermaid-1' },
        fields: {
          title: 'TypeScript Architecture Diagram',
          programmingLanguage: 'mermaid',
          code: 'graph TD\n    A[Component] --> B[Props]\n    A --> C[State]\n    B --> D[Render]\n    C --> D',
        },
      },
    ],
  },
}

// Create the mock data factory
export const createMockBlogPostsResponse = createMockDataFactory(
  defaultBlogPostsResponse
)
