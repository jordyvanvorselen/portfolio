import { Text } from '@/ui/Text'

export const HeroDescription = () => {
  return (
    <div className="flex flex-col">
      <Text
        size="lg"
        weight="medium"
        color="secondary"
        alignment="center"
        lineHeight="relaxed"
        className="md:text-xl pt-4 max-w-3xl mx-auto"
      >
        I help teams deliver software of <b>exceptional quality</b> — and help
        them deliver it to the customers <b>a lot faster</b>, while we&apos;re
        at it.
      </Text>
      <Text
        size="lg"
        weight="medium"
        color="secondary"
        alignment="center"
        lineHeight="relaxed"
        className="md:text-xl pt-8 pb-6 max-w-3xl mx-auto"
      >
        Need someone like me to strengthen your team?
      </Text>
    </div>
  )
}
