import type { Block } from 'payload'

export const SubstackButton: Block = {
  slug: 'substackButton',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
  ],
}
