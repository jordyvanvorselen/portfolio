import Link from 'next/link'
import { Github, Linkedin, UserPlus } from 'lucide-react'

export const Header = () => {
  return (
    <header
      role="banner"
      className="bg-gray-900 text-white px-4 md:px-8 lg:px-20 py-4 md:py-6 lg:py-8 border-b border-gray-700"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold text-white hover:text-gray-300 transition-colors"
          >
            Jordy van Vorselen
          </Link>
        </div>

        {/* Navigation - Hidden on mobile, visible on larger screens */}
        <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-6 lg:gap-8 xl:gap-12">
            <Link
              href="/about"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg"
            >
              About
            </Link>
            <Link
              href="/expertise"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg"
            >
              Expertise
            </Link>
            <Link
              href="/projects"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg"
            >
              Projects
            </Link>
            <Link
              href="/experience"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg"
            >
              Experience
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg"
            >
              Contact
            </Link>
          </div>
        </nav>

        {/* Actions */}
        <div className="flex flex-shrink-0 items-center gap-3 md:gap-4 lg:gap-6 xl:gap-8">
          <div className="flex items-center gap-3 lg:gap-6">
            <a
              href="https://github.com/jordyvanvorselen"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/jordy-van-vorselen"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          <div className="hidden md:block w-px h-6 bg-gray-500"></div>

          <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 lg:px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 text-sm lg:text-base">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Hire Me</span>
            <span className="sm:hidden">Hire</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Visible on tablet/mobile */}
      <nav className="lg:hidden mt-4 pt-4 border-t border-gray-700">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            About
          </Link>
          <Link
            href="/expertise"
            className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            Expertise
          </Link>
          <Link
            href="/projects"
            className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            Projects
          </Link>
          <Link
            href="/experience"
            className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            Experience
          </Link>
          <Link
            href="/contact"
            className="text-gray-300 hover:text-white transition-colors font-medium text-sm"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
