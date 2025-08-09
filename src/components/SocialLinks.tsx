import { Github, Linkedin, Mail } from 'lucide-react'

export function SocialLinks(): JSX.Element {
  return (
    <div className="flex justify-center gap-6">
      <a
        href="https://github.com/jordyvanvorselen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500/30 text-gray-300 hover:text-white hover:border-gray-400/50 transition-colors duration-200"
      >
        <Github className="w-5 h-5" />
      </a>
      <a
        href="https://linkedin.com/in/jordy-van-vorselen"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500/30 text-gray-300 hover:text-white hover:border-gray-400/50 transition-colors duration-200"
      >
        <Linkedin className="w-5 h-5" />
      </a>
      <a
        href="mailto:jordyvanvorselen@gmail.com"
        aria-label="Email"
        className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-500/30 text-gray-300 hover:text-white hover:border-gray-400/50 transition-colors duration-200"
      >
        <Mail className="w-5 h-5" />
      </a>
    </div>
  )
}
