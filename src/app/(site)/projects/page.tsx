import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { ProjectsHero } from '@/domains/projects/ProjectsHero'
import { ProjectsGrid } from '@/domains/projects/ProjectsGrid'
import { ProjectsCollaboration } from '@/domains/projects/ProjectsCollaboration'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('pages.projects')

  return {
    title: t('title'),
    description: t('description'),
  }
}

const ProjectsPage = () => {
  return (
    <main className="bg-gray-950 overflow-x-hidden">
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectsCollaboration />
    </main>
  )
}

export default ProjectsPage
