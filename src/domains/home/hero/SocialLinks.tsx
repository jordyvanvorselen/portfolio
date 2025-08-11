import { Github, Linkedin, Mail } from 'lucide-react'

import { SocialIcon } from '@/ui/SocialIcon'

export const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-6">
      <SocialIcon
        href="https://github.com/jordyvanvorselen"
        label="GitHub"
        icon={Github}
        variant="button"
      />
      <SocialIcon
        href="https://linkedin.com/in/jordy-van-vorselen"
        label="LinkedIn"
        icon={Linkedin}
        variant="button"
      />
      <SocialIcon
        href="mailto:jordyvanvorselen@gmail.com"
        label="Email"
        icon={Mail}
        variant="button"
      />
    </div>
  )
}
