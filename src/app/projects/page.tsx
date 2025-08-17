import { Metadata } from 'next'

import { ProjectsHero } from '@/domains/projects/ProjectsHero'
import { ProjectsGrid } from '@/domains/projects/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projects - Jordy van Vorselen',
  description: 'Projects and open source contributions by Jordy van Vorselen',
}

const ProjectsPage = () => {
  return (
    <main className="bg-gray-950 overflow-x-hidden">
      <ProjectsHero />
      <ProjectsGrid />
    </main>
  )
}

export default ProjectsPage
