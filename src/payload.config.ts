import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// eslint-disable-next-line no-restricted-imports -- Payload CLI cannot resolve @/ path aliases
import { Posts } from './collections/Posts'
// eslint-disable-next-line no-restricted-imports -- Payload CLI cannot resolve @/ path aliases
import { Media } from './collections/Media'
// eslint-disable-next-line no-restricted-imports -- Payload CLI cannot resolve @/ path aliases
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Posts, Media],
  editor: lexicalEditor(),
  secret: process.env['PAYLOAD_SECRET'] || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env['DATABASE_URL'] || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env['BLOB_READ_WRITE_TOKEN'] || '',
    }),
  ],
})
