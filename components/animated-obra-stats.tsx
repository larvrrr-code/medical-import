"use client"

import { useEffect, useRef, useState } from "react"

const duration = 1100

function useCountUp(target: number) {
  const [value, setValue] = useState(0)
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target])

  return { ref, value }
}

function CountStat({
  target,
  suffix,
  label,
  prefix = "",
}: {
  target: number
  suffix: string
  label: string
  prefix?: string
}) {
  const { ref, value } = useCountUp(target)

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <p className="whitespace-nowrap text-5xl font-black leading-none text-white lg:text-6xl">
        {prefix}
        {value}
        {suffix}
      </p>
      <p className="mt-3 text-base font-semibold text-[#5DB6FA] lg:text-lg">
        {label}
      </p>
    </div>
  )
}

export function AnimatedObraStats() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      <CountStat target={23} suffix="+" label="Años en el sector salud" />
      <CountStat
        target={100}
        suffix="%"
        label="Proyectos con cumplimiento COFEPRIS"
      />
      <CountStat
        target={1000}
        suffix="+"
        label="Clientes satisfechos"
      />
    </div>
  )
}
