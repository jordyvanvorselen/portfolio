import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  turbopack: {
    root: path.join(__dirname, '.'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  ...(process.env['NEXT_PUBLIC_E2E_TESTING'] === 'true'
    ? { devIndicators: false }
    : {}),
}

export default withPayload(withNextIntl(nextConfig))
