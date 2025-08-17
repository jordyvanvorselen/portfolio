import { Text } from '@/ui/Text'

export const HeroDescription = () => {
  return (
    <Text
      size="lg"
      weight="medium"
      color="secondary"
      alignment="center"
      lineHeight="relaxed"
      className="md:text-xl max-w-3xl mx-auto"
    >
      I help engineering teams deliver better software faster through
      Test-Driven Development, solid architecture, and collaborative mentorship.
      With 8+ years of experience, I help teams build maintainable systems that
      stand the test of time.
    </Text>
  )
}
