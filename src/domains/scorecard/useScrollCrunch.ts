'use client'

import { type RefObject, useEffect, useRef } from 'react'

const TRIGGER_AT_VIEWPORT_SHARE = 0.12
const RELEASE_AT_VIEWPORT_SHARE = 0.04
const CRUNCHED_GAP_PX = 64
const SHARE_OF_GAP_TO_CLOSE = 0.7
const HEADER_HEIGHT_PX = 64
const RISE = 'margin-top 650ms cubic-bezier(0.16, 1, 0.3, 1) 120ms'
const SETTLE = 'margin-top 450ms cubic-bezier(0.16, 1, 0.3, 1)'

interface ScrollCrunchRefs {
  heroRef: RefObject<HTMLElement | null>
  cueRef: RefObject<HTMLElement | null>
  targetRef: RefObject<HTMLElement | null>
}

const crunchFor = (hero: HTMLElement, target: HTMLElement) => {
  const currentCrunch = -parseFloat(getComputedStyle(target).marginTop)
  const restingGap =
    target.getBoundingClientRect().top -
    hero.getBoundingClientRect().bottom +
    currentCrunch
  return Math.max(restingGap - CRUNCHED_GAP_PX, 0) * SHARE_OF_GAP_TO_CLOSE
}

export const useScrollCrunch = (
  { heroRef, cueRef, targetRef }: ScrollCrunchRefs,
  isMotionAllowed: boolean
) => {
  const isCrunchedRef = useRef(false)

  useEffect(() => {
    const hero = heroRef.current!
    const cue = cueRef.current!
    const target = targetRef.current!
    cue.style.transition = 'opacity 200ms ease-out'

    const apply = (isCrunched: boolean) => {
      isCrunchedRef.current = isCrunched
      cue.style.opacity = isCrunched ? '0' : '1'
      cue.style.pointerEvents = isCrunched ? 'none' : ''
      cue.tabIndex = isCrunched ? -1 : 0
      const crunch = isCrunched && isMotionAllowed ? crunchFor(hero, target) : 0
      target.style.transition = isCrunched ? RISE : SETTLE
      target.style.marginTop = `${-crunch}px`
    }

    const update = () => {
      const scrolledShare = Math.max(window.scrollY, 0) / window.innerHeight
      const isCrunched = isCrunchedRef.current
        ? scrolledShare > RELEASE_AT_VIEWPORT_SHARE
        : scrolledShare > TRIGGER_AT_VIEWPORT_SHARE
      if (isCrunched !== isCrunchedRef.current) apply(isCrunched)
    }

    apply(false)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [heroRef, cueRef, targetRef, isMotionAllowed])

  const scrollToTarget = () => {
    const hero = heroRef.current!
    const target = targetRef.current!
    const currentCrunch = -parseFloat(getComputedStyle(target).marginTop)
    const restingTop =
      target.getBoundingClientRect().top + window.scrollY + currentCrunch
    const finalCrunch = isMotionAllowed ? crunchFor(hero, target) : 0

    window.scrollTo({
      top: restingTop - finalCrunch - HEADER_HEIGHT_PX,
      behavior: isMotionAllowed ? 'smooth' : 'auto',
    })
  }

  return scrollToTarget
}
