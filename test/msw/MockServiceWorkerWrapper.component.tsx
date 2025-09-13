'use client'

import dynamic from 'next/dynamic'

// This approach ensures that:
// - MockServiceWorker dependencies only end up in the client bundle
// - MockServiceWorker component is only rendered client-side
// - No hydration errors occur
// See: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr
export const MockServiceWorkerWrapper = dynamic(
  () =>
    import('@/test/msw/MockServiceWorker.component').then(
      m => m.MockServiceWorker
    ),
  {
    // We only want to disable server-side rendering when mocking is enabled
    ssr: process.env['NEXT_PUBLIC_MOCK_BACKEND'] !== 'true',
  }
)
