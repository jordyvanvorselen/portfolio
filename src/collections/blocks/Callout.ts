import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Callout: Block = {
  slug: 'callout',
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
    },
  ],
}
