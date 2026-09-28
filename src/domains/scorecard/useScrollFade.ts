'use client'

import { useEffect, useState } from 'react'

const FADED_AT_VIEWPORT_SHARE = 0.6

export const useScrollFade = (targetId: string) => {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const target = document.getElementById(targetId)!

    const update = () => {
      const fadedAt = window.innerHeight * FADED_AT_VIEWPORT_SHARE
      const top = target.getBoundingClientRect().top
      const startTop = top + window.scrollY
      const progress = (top - fadedAt) / Math.max(startTop - fadedAt, 1)
      setOpacity(Math.min(Math.max(progress, 0), 1))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [targetId])

  return opacity
}
