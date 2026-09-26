import { Metadata } from 'next'

import { Scorecard } from '@/domains/scorecard/Scorecard'

export const metadata: Metadata = {
  title: 'AI Delivery Scorecard | Jordy van Vorselen',
  description:
    'Is AI making your team faster, or just busier? Score your delivery on six rails in 3 minutes.',
}

const ScorecardPage = () => {
  return (
    <main className="bg-gray-950 overflow-x-hidden">
      <Scorecard />
    </main>
  )
}

export default ScorecardPage
