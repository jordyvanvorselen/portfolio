import { Mail, Download } from 'lucide-react'

import { Button } from '@/ui/Button'

export function HeroActions(): JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button variant="primary" size="large">
        <Mail className="w-6 h-6 mr-3" />
        Get in Touch
      </Button>
      <Button variant="secondary" size="large">
        <Download className="w-6 h-6 mr-3" />
        Download Resume
      </Button>
    </div>
  )
}
