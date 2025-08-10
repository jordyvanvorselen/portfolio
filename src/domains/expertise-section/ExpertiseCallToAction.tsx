import { CircleCheckBig } from 'lucide-react'

import { Text } from '@/ui/Text'

export const ExpertiseCallToAction = () => {
  return (
    <section className="text-center mt-16" data-testid="call-to-action">
      <Text variant="call-to-action-question">
        Ready to discuss how these skills can benefit your project?
      </Text>
      <address className="flex items-center justify-center space-x-2 text-[#10b981] not-italic">
        <CircleCheckBig className="w-5 h-5" role="img" />
        <Text variant="call-to-action-availability">
          Available for consulting and full-time opportunities
        </Text>
      </address>
    </section>
  )
}
