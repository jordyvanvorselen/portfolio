import { useTranslations } from 'next-intl'

import { Button } from '@/ui/Button'
import { SubstackIcon } from '@/ui/SubstackIcon'

export interface SubstackButtonProps {
  label: string
  url: string
}

// Button for an action that only exists on Substack, such as commenting or messaging
export const SubstackButton = ({ label, url }: SubstackButtonProps) => {
  const t = useTranslations('blog.post')

  return (
    <div className="my-8 flex justify-center">
      <Button href={url} className="inline-flex items-center gap-2">
        <SubstackIcon />
        {label}
        <span className="sr-only">{t('opensOnSubstack')}</span>
      </Button>
    </div>
  )
}
