import type { Block } from 'payload'

export const CodeBlock: Block = {
  slug: 'codeBlock',
  fields: [
    {
      name: 'language',
      type: 'text',
      required: true,
      admin: {
        description:
          'Programming language for syntax highlighting (e.g., typescript, python, mermaid)',
      },
    },
    {
      name: 'code',
      type: 'code',
      required: true,
      admin: {
        language: 'javascript',
      },
    },
  ],
}
