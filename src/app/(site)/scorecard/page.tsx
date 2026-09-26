import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Scorecard } from '@/domains/scorecard/Scorecard'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('scorecard.meta')

  return {
    title: t('title'),
    description: t('description'),
  }
}

const ScorecardPage = () => {
  return (
    <main className="bg-gray-950 overflow-x-hidden">
      <Scorecard />
    </main>
  )
}

export default ScorecardPage
