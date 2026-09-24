import type { Block } from 'payload'

export const LinkCard: Block = {
  slug: 'linkCard',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description:
          'Blog path (e.g. /blog/my-post) or full URL of the linked post',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'publicationDate',
      type: 'date',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
