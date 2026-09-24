import { useTranslations } from 'next-intl'

import { Button } from '@/ui/Button'

export interface SubstackButtonProps {
  label: string
  url: string
}

// lucide-react has no brand icons, so the Substack mark is inlined (Simple Icons path)
const SubstackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-current"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
)

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
