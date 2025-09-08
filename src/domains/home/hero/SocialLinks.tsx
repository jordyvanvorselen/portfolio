import { Github, Linkedin, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { SocialIcon } from '@/ui/SocialIcon'

export const SocialLinks = () => {
  const t = useTranslations()

  return (
    <div className="flex justify-center gap-6">
      <SocialIcon
        href="https://github.com/jordyvanvorselen"
        label={t('social.github')}
        icon={Github}
        variant="button"
        size="md"
        color="muted"
        interactive="hover"
      />
      <SocialIcon
        href="https://linkedin.com/in/jordy-van-vorselen"
        label={t('social.linkedin')}
        icon={Linkedin}
        variant="button"
        size="md"
        color="muted"
        interactive="hover"
      />
      <SocialIcon
        href="mailto:jordy@morethanbits.io"
        label={t('social.email')}
        icon={Mail}
        variant="button"
        size="md"
        color="muted"
        interactive="hover"
      />
    </div>
  )
}
