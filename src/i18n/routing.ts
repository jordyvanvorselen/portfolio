import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  domains: [
    {
      domain: 'morethanbits.nl',
      defaultLocale: 'nl',
      locales: ['nl', 'en'],
    },
    {
      domain: 'jordyvanvorselen.nl',
      defaultLocale: 'nl',
      locales: ['nl', 'en'],
    },
    {
      domain: 'morethanbits.io',
      defaultLocale: 'en',
      locales: ['en', 'nl'],
    },
    {
      domain: 'jordyvanvorselen.com',
      defaultLocale: 'en',
      locales: ['en', 'nl'],
    },
  ],
})

export type Locale = (typeof routing.locales)[number]
