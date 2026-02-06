import type { BlogPost } from '@/lib/api'
import type { SerializedEditorState } from '@/types/lexical'

// Mock Lexical content with various node types for comprehensive testing
export const mockContent: SerializedEditorState = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [
          {
            type: 'text',
            text: 'Introduction to React Hooks',
            format: 0,
            version: 1,
          },
        ],
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Learn about React hooks and how to use them ',
            format: 0,
            version: 1,
          },
          {
            type: 'text',
            text: 'effectively',
            format: 1, // bold
            version: 1,
          },
          {
            type: 'text',
            text: ' in your applications.',
            format: 0,
            version: 1,
          },
        ],
        version: 1,
      },
      {
        type: 'block',
        id: 'code-block-1',
        fields: {
          blockType: 'codeBlock',
          language: 'javascript',
          code: 'const [count, setCount] = useState(0);',
        },
        children: [],
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The ',
            format: 0,
            version: 1,
          },
          {
            type: 'text',
            text: 'useState',
            format: 16, // code
            version: 1,
          },
          {
            type: 'text',
            text: ' hook allows you to add state to functional components.',
            format: 0,
            version: 1,
          },
        ],
        version: 1,
      },
      {
        type: 'list',
        listType: 'bullet',
        children: [
          {
            type: 'listitem',
            children: [
              {
                type: 'text',
                text: 'useState for state management',
                format: 0,
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'listitem',
            children: [
              {
                type: 'text',
                text: 'useEffect for side effects',
                format: 0,
                version: 1,
              },
            ],
            version: 1,
          },
          {
            type: 'listitem',
            children: [
              {
                type: 'text',
                text: 'useContext for context values',
                format: 0,
                version: 1,
              },
            ],
            version: 1,
          },
        ],
        version: 1,
      },
      {
        type: 'quote',
        children: [
          {
            type: 'text',
            text: 'Hooks let you use state and other React features without writing a class.',
            format: 0,
            version: 1,
          },
        ],
        version: 1,
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
} as unknown as SerializedEditorState

// Mock content with Mermaid diagram
export const mockContentWithMermaid: SerializedEditorState = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [
          {
            type: 'text',
            text: 'Component Architecture',
            format: 0,
            version: 1,
          },
        ],
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Understanding the relationship between components, props, and state.',
            format: 0,
            version: 1,
          },
        ],
        version: 1,
      },
      {
        type: 'block',
        id: 'mermaid-block-1',
        fields: {
          blockType: 'codeBlock',
          language: 'mermaid',
          code: 'graph TD\n    A[Component] --> B[Props]\n    A --> C[State]\n    B --> D[Render]\n    C --> D',
        },
        children: [],
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'The diagram above illustrates the data flow in React components.',
            format: 0,
            version: 1,
          },
        ],
        version: 1,
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    version: 1,
  },
} as unknown as SerializedEditorState

// Mock blog posts array for Payload API
export const mockBlogPosts: BlogPost[] = [
  {
    slug: 'typescript-advanced',
    title: 'Advanced TypeScript',
    description: 'Advanced TypeScript techniques and patterns',
    date: 'January 4, 2024',
    readTime: '1 min read',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    tags: ['TypeScript', 'JavaScript', 'Frontend'],
  },
  {
    slug: 'python-tips',
    title: 'Python Tips',
    description: 'Useful Python tips for better development',
    date: 'January 3, 2024',
    readTime: '1 min read',
    image:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
    tags: ['Python', 'Backend'],
  },
  {
    slug: 'react-performance',
    title: 'React Performance',
    description: 'Optimizing React applications for better performance',
    date: 'January 2, 2024',
    readTime: '1 min read',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    tags: ['React', 'Performance', 'Frontend'],
  },
  {
    slug: 'react-hooks-guide',
    title: 'React Hooks Guide',
    description: 'Learn about React hooks and how to use them effectively',
    date: 'January 1, 2024',
    readTime: '1 min read',
    image:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    tags: ['React', 'JavaScript', 'Frontend'],
    canonicalUrl: 'https://example.com/react-hooks-guide',
  },
]
