import type { CollectionConfig } from 'payload'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CodeBlock } from '@/collections/blocks/CodeBlock'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publicationDate', '_status'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier for the post',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 150,
      admin: {
        description: 'Brief summary of the post (max 150 characters)',
      },
    },
    {
      name: 'publicationDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Date when the post was published',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image displayed in blog cards and post header',
      },
    },
    {
      name: 'tags',
      type: 'json',
      admin: {
        description: 'Array of tags/topics (stored as JSON array of strings)',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      admin: {
        description:
          'Optional canonical URL if this post was originally published elsewhere',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [CodeBlock],
          }),
        ],
      }),
    },
  ],
}
