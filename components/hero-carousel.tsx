"use client"

import Image from "next/image"
import type { CSSProperties, TouchEvent } from "react"
import { useCallback, useEffect, useRef, useState } from "react"

const slides = [
  {
    image: { src: "/Arco%20en%20C.png", alt: "Arco en C", width: 520, height: 700 },
    imageClass: "absolute -bottom-16 h-[120%] w-auto object-contain object-bottom",
    imageOffset: "-82px",
    primary: "Imagenología",
    secondary: ["Venta y renta", "Servicio técnico"],
  },
  {
    image: { src: "/Cama%20Hospitalaria.png", alt: "Cama Hospitalaria", width: 600, height: 500 },
    imageClass: "absolute -bottom-6 h-[90%] w-auto object-contain object-bottom",
    imageOffset: "-40px",
    primary: "Renta hospitalaria",
    secondary: ["Camas eléctricas", "Entrega e instalación"],
  },
  {
    image: { src: "/Mesa%20Quirurgica.png", alt: "Mesa Quirúrgica", width: 520, height: 700 },
    imageClass: "absolute -bottom-10 h-[110%] w-auto object-contain object-bottom",
    imageOffset: "-48px",
    primary: "Quirófano",
    secondary: ["Mesas quirúrgicas", "Lámparas LED"],
  },
  {
    image: { src: "/Ximena.png", alt: "Técnico de mantenimiento", width: 520, height: 700 },
    imageClass: "absolute -bottom-0 h-[105%] w-auto object-contain object-bottom",
    imageOffset: "-40px",
    primary: "Mantenimiento",
    secondary: ["Preventivo y correctivo", "Pólizas hospitalarias"],
  },
]

type Phase = "idle" | "exit" | "enter"

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>("idle")
  const currentRef = useRef(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isAnimatingRef = useRef(false)
  const touchStartXRef = useRef<number | null>(null)

  const goToSlide = useCallback((nextIndex: number) => {
    const normalizedIndex = (nextIndex + slides.length) % slides.length

    if (normalizedIndex === currentRef.current || isAnimatingRef.current) {
      return
    }

    isAnimatingRef.current = true
    setPhase("exit")

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      currentRef.current = normalizedIndex
      setCurrent(normalizedIndex)
      setPhase("enter")

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setPhase("idle")
          isAnimatingRef.current = false
        })
      )
    }, 380)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      goToSlide(currentRef.current + 1)
    }, 4800)

    return () => clearInterval(interval)
  }, [goToSlide])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) {
      return
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current
    const distance = touchEndX - touchStartXRef.current

    touchStartXRef.current = null

    if (Math.abs(distance) < 40) {
      return
    }

    goToSlide(currentRef.current + (distance < 0 ? 1 : -1))
  }

  const slide = slides[current]

  const contentStyle: CSSProperties = {
    transition:
      phase === "enter"
        ? "none"
        : "transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.38s ease",
    transform:
      phase === "exit"
        ? "translateX(-32px)"
        : phase === "enter"
          ? "translateX(32px)"
          : "translateX(0)",
    opacity: phase === "idle" ? 1 : 0,
  }

  return (
    <div
      className="relative my-4 -ml-7 h-[360px] w-[calc(100%+1.75rem)] touch-pan-y overflow-visible rounded-2xl bg-[radial-gradient(circle_at_50%_38%,rgba(93,182,250,0.20)_0%,rgba(19,46,239,0.16)_28%,rgba(20,30,97,0)_52%),linear-gradient(135deg,#17236B_0%,#141E61_52%,#1A2C7A_100%)] lg:-ml-10 lg:mt-2 lg:h-[440px] lg:w-[calc(100%+2.5rem)]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0" style={contentStyle}>
        <Image
          src={slide.image.src}
          alt={slide.image.alt}
          width={slide.image.width}
          height={slide.image.height}
          className={slide.imageClass}
          style={{
            left: slide.imageOffset,
            filter:
              "drop-shadow(-10px 9px 18px rgba(0,0,0,0.42)) drop-shadow(-3px 3px 8px rgba(0,0,0,0.22))",
          }}
        />

        <div className="absolute left-[61%] top-[14%] cursor-default select-none rounded-full border border-white/30 bg-white/15 px-5 py-2 backdrop-blur-sm">
          <span className="text-base font-semibold text-white">{slide.primary}</span>
        </div>

        <div className="absolute left-[68%] top-[42%] cursor-default select-none rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 backdrop-blur-sm">
          <span className="text-sm font-medium text-white/65">{slide.secondary[0]}</span>
        </div>

        <div className="absolute left-[68%] top-[63%] cursor-default select-none rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 backdrop-blur-sm">
          <span className="text-sm font-medium text-white/65">{slide.secondary[1]}</span>
        </div>
      </div>

      <div className="absolute bottom-5 right-6 z-10 flex items-center gap-2">
        {slides.map((item, index) => (
          <button
            key={item.primary}
            type="button"
            className="flex h-6 items-center justify-center px-1"
            aria-label={`Ver ${item.primary}`}
            aria-current={index === current ? "true" : undefined}
            onClick={() => goToSlide(index)}
          >
            <span
              className={
                index === current
                  ? "block h-2.5 w-9 rounded-full bg-white/90 transition-all"
                  : "block h-2.5 w-2.5 rounded-full bg-white/40 transition-all hover:bg-white/65"
              }
            />
          </button>
        ))}
      </div>
    </div>
  )
}
