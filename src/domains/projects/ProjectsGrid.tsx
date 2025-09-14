import { useTranslations } from 'next-intl'
import { ProjectCard } from '@/domains/projects/ProjectCard'
import { Title } from '@/ui/Title'
import { Text } from '@/ui/Text'
import { Project } from '@/types/project'

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Go + Templ + HTMX @ Vercel',
    description:
      'A Vercel template for Go projects using Templ and HTMX, complete with GitHub Actions for CI/CD.',
    longDescription:
      'Want to host your Go + Templ + HTMX project on Vercel? It really is possible! This template has you covered with a ready-to-deploy setup, including GitHub Actions for seamless CI/CD - and fixed the nitty gritty details for you.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: ['Go', 'HTMX', 'Templ', 'Vercel', 'GitHub Actions', 'CI/CD'],
    githubUrl:
      'https://github.com/jordyvanvorselen/go-templ-htmx-vercel-template',
    liveUrl: 'https://go-templ-htmx-vercel-template.vercel.app/users',
    stars: 61,
    forks: 9,
  },
  {
    id: '2',
    title: 'morethanbits.io',
    description: 'My personal website built with Next.js — this website',
    longDescription:
      'This portfolio website represents the intersection of exceptional design, bulletproof engineering, and cutting-edge web technologies. Built with Test-Driven Development (TDD) principles, every component is thoroughly tested with 100% code coverage, ensuring reliability and maintainability. The project demonstrates expertise in modern frontend development, featuring a carefully crafted user experience that seamlessly adapts across all device sizes while maintaining pixel-perfect design fidelity.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: [
      'Next.js',
      'Vercel',
      'TypeScript',
      'Tailwind CSS',
      'Test-Driven Development',
      'Vitest',
      'React Testing Library',
      'Playwright',
      'Mock Service Worker',
    ],
    githubUrl: 'https://github.com/jordyvanvorselen/portfolio',
    stars: 1,
    forks: 0,
  },
  {
    id: '3',
    title: 'The Eat Guild',
    description:
      'Serverless Next.js backend, Flutter mobile app and BoltJS slackbot that allows users to rate their favourite restaurants.',
    longDescription:
      "Because we frequently visited grill restaurants with a group of colleagues to compare their spareribs, we started The Eat Guild. This app makes it possible for all members to review these restaurants. It also acts as a suggestion pipeline, so it's easier to track where we want to go next.",
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=entropy&auto=format',
    technologies: [
      'Next.js',
      'Flutter',
      'BoltJS',
      'Slackbot',
      'Serverless',
      'Vercel',
    ],
    githubUrl: 'https://github.com/jordyvanvorselen/rib-reviews',
    liveUrl: 'https://www.eatguild.nl/#/',
    stars: 5,
    forks: 0,
  },
]

export const ProjectsGrid = () => {
  const t = useTranslations()
  return (
    <section
      role="region"
      aria-label="projects grid"
      className="relative py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <Title
            size="2xl"
            weight="bold"
            color="primary"
            align="center"
            as="h2"
            className="mb-4"
          >
            {t('projects.grid.title')}
          </Title>
          <Text
            size="xl"
            weight="normal"
            color="secondary"
            alignment="center"
            className="max-w-3xl mx-auto"
          >
            {t('projects.grid.description')}
          </Text>
        </div>

        {/* Projects Grid */}
        <div className="space-y-32">
          {mockProjects.map((project, index) => (
            <div key={project.id} className="relative">
              <ProjectCard
                project={project}
                reversed={index % 2 === 1}
                index={index}
              />

              {/* Elegant dot separator */}
              {index < mockProjects.length - 1 && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                    <div className="w-1 h-1 bg-teal-500/50 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background decorations */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 animate-pulse"
        style={{ animationDuration: '3s' }}
      />
    </section>
  )
}
