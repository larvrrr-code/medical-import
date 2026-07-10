"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

type CountUpProps = {
  end: number
  suffix?: string
  duration?: number
  className?: string
  style?: CSSProperties
}

export function CountUp({ end, suffix = "", duration = 1400, className, style }: CountUpProps) {
  const [value, setValue] = useState(0)
  const [hasRun, setHasRun] = useState(false)
  const elementRef = useRef<HTMLSpanElement | null>(null)
  const formattedValue = new Intl.NumberFormat("en-US").format(value)

  useEffect(() => {
    const element = elementRef.current
    if (!element || hasRun) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return

        setHasRun(true)
        const start = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)

          setValue(Math.round(end * eased))

          if (progress < 1) {
            requestAnimationFrame(tick)
          }
        }

        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.45 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [duration, end, hasRun])

  return (
    <span ref={elementRef} className={className} style={style}>
      {formattedValue}
      {suffix}
    </span>
  )
}
