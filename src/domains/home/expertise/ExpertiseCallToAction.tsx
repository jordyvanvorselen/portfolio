import { CircleCheckBig } from 'lucide-react'

import { Text } from '@/ui/Text'

export const ExpertiseCallToAction = () => {
  return (
    <section className="text-center mt-16" data-testid="call-to-action">
      <Text size="base" weight="normal" color="secondary">
        Ready to discuss how these skills can benefit your project?
      </Text>
      <address className="flex items-center justify-center space-x-2 text-[#10b981] not-italic">
        <CircleCheckBig className="w-5 h-5" role="img" />
        <Text size="base" weight="semibold" color="secondary">
          Available for remote consulting and full-time opportunities
        </Text>
      </address>
    </section>
  )
}
