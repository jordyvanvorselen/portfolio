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
      validate: (value: string | null | undefined) => {
        const kebabCaseRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
        if (!value || !kebabCaseRegex.test(value)) {
          return 'Slug must be kebab-case (e.g., my-blog-post)'
        }
        return true
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
      type: 'text',
      hasMany: true,
      admin: {
        description: 'Tags/topics for the post',
      },
    },
    {
      name: 'canonicalUrl',
      type: 'text',
      admin: {
        description:
          'Optional canonical URL if this post was originally published elsewhere',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        const urlRegex =
          /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?$/
        if (!urlRegex.test(value)) {
          return 'Must be a valid URL (http/https/ftp)'
        }
        return true
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
