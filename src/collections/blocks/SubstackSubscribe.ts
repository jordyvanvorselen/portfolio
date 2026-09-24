import type { Block } from 'payload'

export const SubstackSubscribe: Block = {
  slug: 'substackSubscribe',
  fields: [
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'publicationUrl',
      type: 'text',
      required: true,
      admin: {
        description:
          'Substack publication URL (e.g. https://name.substack.com)',
      },
    },
  ],
}
