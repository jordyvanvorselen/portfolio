import { Mail, Download } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/ui/Button'

export const HeroActions = () => {
  const t = useTranslations()

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <Button variant="solid" color="primary" size="xl" href="/contact">
        <Mail className="w-6 h-6 mr-3" />
        {t('hero.actions.getInTouch')}
      </Button>
      <Button variant="solid" color="secondary" size="xl">
        <Download className="w-6 h-6 mr-3" />
        {t('hero.actions.downloadResume')}
      </Button>
    </div>
  )
}
