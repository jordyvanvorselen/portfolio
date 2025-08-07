import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  ...(process.env['NEXT_PUBLIC_E2E_TESTING'] === 'true'
    ? { devIndicators: false }
    : {}),
}

export default nextConfig
