import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'

export const FaqHeader = () => {
  return (
    <div className="text-center mb-12">
      <Title
        size="3xl"
        weight="bold"
        color="gradient"
        align="center"
        as="h2"
        className="mb-6"
      >
        Frequently Asked Questions
      </Title>

      <Text
        size="lg"
        weight="medium"
        color="secondary"
        alignment="center"
        lineHeight="relaxed"
        className="max-w-2xl mx-auto"
      >
        Find answers to common questions about my work, expertise, and approach
        to software development.
      </Text>
    </div>
  )
}
