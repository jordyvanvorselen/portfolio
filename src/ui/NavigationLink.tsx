import Link from 'next/link'

interface NavigationLinkProps {
  href: string
  children: React.ReactNode
  variant?: 'desktop' | 'mobile' | 'footer'
  className?: string
}

export const NavigationLink = ({
  href,
  children,
  variant = 'desktop',
  className = '',
}: NavigationLinkProps) => {
  const variantStyles = {
    desktop:
      'text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base xl:text-lg',
    mobile:
      'text-gray-300 hover:text-white transition-colors font-medium text-sm',
    footer: 'block text-[#cbd5e1] hover:text-white transition-colors',
  }

  const combinedClasses = `${variantStyles[variant]} ${className}`.trim()

  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  )
}
