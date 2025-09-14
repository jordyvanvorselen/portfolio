import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  redirects: async () => [
    {
      source: '/:path*',
      destination: 'https://www.morethanbits.io/:path*',
      permanent: true,
      has: [
        {
          type: 'host',
          value: 'www.jordyvanvorselen.com',
        },
      ],
    },
    {
      source: '/:path*',
      destination: 'https://www.morethanbits.io/:path*',
      permanent: true,
      has: [
        {
          type: 'host',
          value: 'www.jordyvanvorselen.nl',
        },
      ],
    },
    {
      source: '/:path*',
      destination: 'https://www.morethanbits.io/:path*',
      permanent: true,
      has: [
        {
          type: 'host',
          value: 'www.morethanbits.nl',
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
    ],
  },
  ...(process.env['NEXT_PUBLIC_E2E_TESTING'] === 'true'
    ? { devIndicators: false }
    : {}),
}

export default withNextIntl(nextConfig)
