import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Button } from '@/ui/Button'

export const ProjectsCollaboration = () => {
  return (
    <section
      className="relative py-24"
      role="region"
      aria-label="collaboration"
    >
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <Title variant="projects-grid-title" className="mb-6">
          Let&apos;s Build Something Amazing Together
        </Title>

        <Text variant="projects-grid-description" className="mb-8">
          Interested in collaborating on open source projects or have an idea
          you&apos;d like to discuss? I&apos;m always excited to start new
          initiatives.
        </Text>

        <div className="flex flex-wrap justify-center gap-4">
          <Button href="https://github.com/jordyvanvorselen" variant="primary">
            Follow on GitHub
          </Button>

          <Button
            href="mailto:contact@jordyvanvorselen.com"
            variant="project-secondary"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  )
}
