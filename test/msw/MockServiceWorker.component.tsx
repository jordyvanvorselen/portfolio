'use client'

import { FC, PropsWithChildren, Suspense, use, useMemo } from 'react'

import { isExcluded } from '@/test/msw/exclude'

async function initMockServiceWorker() {
  const { worker } = await import('@/test/msw/register.client')
  await worker.start({
    onUnhandledRequest(request, print) {
      if (isExcluded(request)) return
      print.warning()
    },
  })
}

const MockServiceWorkerInner: FC<
  PropsWithChildren<{ mswPromise: Promise<unknown> }>
> = ({ children, mswPromise }) => {
  use(mswPromise)
  return children
}

export const MockServiceWorker: FC<PropsWithChildren> = ({ children }) => {
  const isMockEnabled = process.env['NEXT_PUBLIC_MOCK_BACKEND'] === 'true'
  const isServerSide = typeof window === 'undefined'
  const isMswEnabled = !isServerSide && isMockEnabled

  const mswPromise = useMemo(
    () => (isMswEnabled ? initMockServiceWorker() : Promise.resolve(null)),
    [isMswEnabled]
  )

  // Only initialize the mock service worker in the browser and when mocking is enabled
  if (!isMswEnabled) return children

  return (
    <Suspense>
      <MockServiceWorkerInner mswPromise={mswPromise}>
        {children}
      </MockServiceWorkerInner>
    </Suspense>
  )
}
