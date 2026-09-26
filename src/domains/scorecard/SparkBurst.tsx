'use client'

import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/domains/scorecard/usePrefersReducedMotion'

interface SparkBurstProps {
  count: number
  delayMs: number
}

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  age: number
  width: number
  color: string
}

const WIDTH = 720
const HEIGHT = 420
const GRAVITY = 420
const DRAG = 1.6
const COLORS = ['#2dd4bf', '#5eead4', '#99f6e4', '#60a5fa', '#ffffff']

const createSpark = (): Spark => {
  const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.7
  const speed = 260 + Math.random() * 420
  return {
    x: WIDTH / 2 + (Math.random() - 0.5) * 160,
    y: HEIGHT / 2 + (Math.random() - 0.5) * 30,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0.8 + Math.random() * 0.7,
    age: 0,
    width: 1.5 + Math.random() * 1.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
  }
}

export const SparkBurst = ({ count, delayMs }: SparkBurstProps) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = ref.current!
    const context = canvas.getContext('2d')
    if (!context || prefersReducedMotion) return

    const ratio = window.devicePixelRatio
    canvas.width = WIDTH * ratio
    canvas.height = HEIGHT * ratio
    context.scale(ratio, ratio)
    context.lineCap = 'round'

    let frame = 0
    let last: number | undefined
    const sparks = Array.from({ length: count }, createSpark)

    const tick = (now: number) => {
      const dt = Math.min((now - (last ?? now)) / 1000, 0.05)
      last = now
      context.clearRect(0, 0, WIDTH, HEIGHT)
      let alive = 0
      for (const spark of sparks) {
        spark.age += dt
        if (spark.age >= spark.life) continue
        alive++
        spark.vx -= spark.vx * DRAG * dt
        spark.vy += (GRAVITY - spark.vy * DRAG) * dt
        spark.x += spark.vx * dt
        spark.y += spark.vy * dt
        const fade = 1 - spark.age / spark.life
        context.globalAlpha = fade
        context.strokeStyle = spark.color
        context.lineWidth = spark.width
        context.beginPath()
        context.moveTo(spark.x, spark.y)
        context.lineTo(spark.x - spark.vx * 0.035, spark.y - spark.vy * 0.035)
        context.stroke()
      }
      if (alive > 0) frame = requestAnimationFrame(tick)
      else context.clearRect(0, 0, WIDTH, HEIGHT)
    }

    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick)
    }, delayMs)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [count, delayMs, prefersReducedMotion])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `min(${WIDTH}px, 100vw)`,
        aspectRatio: `${WIDTH} / ${HEIGHT}`,
      }}
    />
  )
}
