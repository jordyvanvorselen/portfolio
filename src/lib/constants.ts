export const BASE_URL =
  process.env['NEXT_PUBLIC_SITE_URL'] ||
  (process.env['VERCEL_URL']
    ? `https://${process.env['VERCEL_URL']}`
    : 'http://localhost:3000')

export const SITE_TITLE = 'Jordy van Vorselen'
export const SITE_DESCRIPTION = 'Full-stack developer and entrepreneur'
