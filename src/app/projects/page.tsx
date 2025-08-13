import { Metadata } from 'next'

import { ProjectsHero } from '@/domains/projects/ProjectsHero'

export const metadata: Metadata = {
  title: 'Projects - Jordy van Vorselen',
  description: 'Projects and open source contributions by Jordy van Vorselen',
}

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gray-950">
      <ProjectsHero totalProjects={15} totalStars={2500} totalForks={425} />
      <main>
        <h1>Projects</h1>
        <p>Coming soon...</p>
      </main>
    </div>
  )
}

export default ProjectsPage
