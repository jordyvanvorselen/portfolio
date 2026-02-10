import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import './globals.css'
import { Header } from '@/domains/common/Header'
import { Footer } from '@/domains/common/Footer'
import { MockServiceWorkerWrapper } from '@/test/msw/MockServiceWorkerWrapper.component'
import { isExcluded } from '@/test/msw/exclude'

import { SpeedInsights } from '@vercel/speed-insights/next'

// Setup MSW server in development/test when mocking is enabled
if (process.env['NEXT_PUBLIC_MOCK_BACKEND'] === 'true') {
  const { server } = await import('@/test/msw/register.server')
  server.listen({
    onUnhandledRequest(request, print) {
      if (isExcluded(request)) return
      print.warning()
    },
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('layout')

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className="bg-gray-900">
      <body className="antialiased min-h-full flex flex-col bg-gray-900">
        <NextIntlClientProvider messages={messages}>
          <MockServiceWorkerWrapper>
            <Header />
            {children}
            <Footer />
            <SpeedInsights />
          </MockServiceWorkerWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
