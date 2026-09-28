'use client'

import { type RefObject, useEffect, useRef } from 'react'

const CUE_GONE_AFTER_VIEWPORT_SHARE = 0.3
const CRUNCHED_AFTER_VIEWPORT_SHARE = 0.5
const CRUNCHED_GAP_PX = 64
const SHARE_OF_GAP_TO_CLOSE = 0.5
const HEADER_HEIGHT_PX = 64

interface ScrollCrunchRefs {
  heroRef: RefObject<HTMLElement | null>
  cueRef: RefObject<HTMLElement | null>
  targetRef: RefObject<HTMLElement | null>
}

const maxCrunchFor = (
  hero: HTMLElement,
  target: HTMLElement,
  currentCrunch: number,
  isEnabled: boolean
) => {
  const restingGap =
    target.getBoundingClientRect().top -
    hero.getBoundingClientRect().bottom +
    currentCrunch
  return isEnabled
    ? Math.max(restingGap - CRUNCHED_GAP_PX, 0) * SHARE_OF_GAP_TO_CLOSE
    : 0
}

export const useScrollCrunch = (
  { heroRef, cueRef, targetRef }: ScrollCrunchRefs,
  isEnabled: boolean
) => {
  const crunchRef = useRef(0)

  useEffect(() => {
    const hero = heroRef.current!
    const cue = cueRef.current!
    const target = targetRef.current!

    const update = () => {
      const scrolledShare = Math.max(window.scrollY, 0) / window.innerHeight
      const cueProgress = Math.min(
        scrolledShare / CUE_GONE_AFTER_VIEWPORT_SHARE,
        1
      )
      const crunchProgress = Math.min(
        scrolledShare / CRUNCHED_AFTER_VIEWPORT_SHARE,
        1
      )
      const isGone = cueProgress === 1
      cue.style.opacity = String(1 - cueProgress)
      cue.style.pointerEvents = isGone ? 'none' : ''
      cue.tabIndex = isGone ? -1 : 0

      crunchRef.current =
        crunchProgress *
        maxCrunchFor(hero, target, crunchRef.current, isEnabled)
      target.style.marginTop = `${-crunchRef.current}px`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [heroRef, cueRef, targetRef, isEnabled])

  const scrollToTarget = () => {
    const hero = heroRef.current!
    const target = targetRef.current!
    const crunchedTop =
      target.getBoundingClientRect().top +
      window.scrollY +
      crunchRef.current -
      maxCrunchFor(hero, target, crunchRef.current, isEnabled)

    window.scrollTo({
      top: crunchedTop - HEADER_HEIGHT_PX,
      behavior: isEnabled ? 'smooth' : 'auto',
    })
  }

  return scrollToTarget
}
