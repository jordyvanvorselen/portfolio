import { Metadata } from 'next'

import { ProjectsHero } from '@/domains/projects/ProjectsHero'
import { ProjectsGrid } from '@/domains/projects/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects - Jordy van Vorselen',
  description: 'Projects and open source contributions by Jordy van Vorselen',
}

const ProjectsPage = () => {
  return (
    <main className="flex-1 bg-gray-950">
      <ProjectsHero totalProjects={15} totalStars={2500} totalForks={425} />
      <ProjectsGrid />
    </main>
  )
}

export default ProjectsPage
