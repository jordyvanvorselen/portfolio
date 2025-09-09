import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Title } from '@/ui/Title'
import asml from '@/assets/images/asml-blue.svg'
import signify from '@/assets/images/signify.webp'
import kabisa from '@/assets/images/kabisa-white.png'
import Image from 'next/image'
import { TechnologyGrid } from '@/domains/home/skills/TechnologyGrid'

export const SkillSection = () => {
  const t = useTranslations()
  return (
    <section
      id="skills-section"
      className="content-section-min relative overflow-hidden py-4 md:py-6 lg:py-8 border-t border-gray-900 flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-gray-950 to-black" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-32 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -left-32 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-evenly">
          <Image
            src={asml.src}
            alt="ASML logo"
            width={0}
            height={0}
            className="w-36 lg:w-72"
          />
          <Image
            src={signify.src}
            alt="Signify logo"
            width={400}
            height={0}
            className="w-48 lg:w-96"
          />
          <Image
            src={kabisa.src}
            alt="Kabisa logo"
            width={250}
            height={0}
            className="w-32 lg:w-64"
          />
        </div>

        <div className="flex flex-col flex-1 justify-evenly mt-12 xl:mt-0">
          <div>
            <Title
              size="3xl"
              weight="bold"
              color="gradient"
              align="center"
              as="h2"
            >
              {t('skills.title')}
            </Title>

            <Title
              size="lg"
              weight="normal"
              color="secondary"
              align="center"
              className="mt-6"
            >
              {t('skills.subtitle')}
            </Title>
          </div>

          <div className="flex flex-col items-center gap-8 mt-8 xl:mt-0">
            <TechnologyGrid />
          </div>

          <Link
            href="/experience"
            className="group flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 mt-6"
          >
            <Title
              size="md"
              weight="normal"
              color="muted"
              align="center"
              className="group-hover:text-gray-200 transition-colors duration-200"
            >
              {t('skills.experienceOverview')}
            </Title>
            <ArrowRight className="w-5 h-5 text-gray-400 transition-colors duration-200 group-hover:text-gray-200" />
          </Link>
        </div>
      </div>
    </section>
  )
}
