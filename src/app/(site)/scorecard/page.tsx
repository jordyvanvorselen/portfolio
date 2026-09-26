import { Metadata } from 'next'

import { Scorecard } from '@/domains/scorecard/Scorecard'

export const metadata: Metadata = {
  title: 'AI Delivery Scorecard | Jordy van Vorselen',
  description:
    'AI made your team faster. How much faster could it be? Score the six rails that decide how much of AI’s speed reaches your users.',
}

const ScorecardPage = () => {
  return (
    <main className="bg-gray-950 overflow-x-hidden">
      <Scorecard />
    </main>
  )
}

export default ScorecardPage
