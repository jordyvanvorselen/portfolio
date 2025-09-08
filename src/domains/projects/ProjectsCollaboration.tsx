import { useTranslations } from 'next-intl'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Button } from '@/ui/Button'

export const ProjectsCollaboration = () => {
  const t = useTranslations()
  return (
    <section
      className="relative py-24"
      role="region"
      aria-label="collaboration"
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Title
          size="2xl"
          weight="bold"
          color="primary"
          align="center"
          as="h2"
          className="mb-6"
        >
          {t('projects.collaboration.title')}
        </Title>

        <Text
          size="xl"
          weight="normal"
          color="secondary"
          alignment="center"
          className="mb-8"
        >
          {t('projects.collaboration.description')}
        </Text>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href="https://github.com/jordyvanvorselen"
            variant="solid"
            color="primary"
            size="md"
          >
            {t('projects.collaboration.actions.followGithub')}
          </Button>

          <Button
            href="mailto:contact@jordyvanvorselen.com"
            variant="outline"
            color="neutral"
            size="md"
          >
            {t('projects.collaboration.actions.getInTouch')}
          </Button>
        </div>
      </div>
    </section>
  )
}
