import { Mail, Download } from 'lucide-react'

import { Button } from '@/ui/Button'

export const HeroActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button variant="primary" size="large" href="/contact">
        <Mail className="w-6 h-6 mr-3" />
        Get In Touch
      </Button>
      <Button variant="secondary" size="large">
        <Download className="w-6 h-6 mr-3" />
        Download Resume
      </Button>
    </div>
  )
}
