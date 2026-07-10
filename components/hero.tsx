"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Clients } from "@/components/clients"

const heroImages = ["/Hero 1.png", "/Hero 2.png", "/Hero 3.png"]

export function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    heroImages.forEach((src) => {
      const image = new window.Image()
      image.src = src
    })
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setActiveImage((activeImage + 1) % heroImages.length)
    }, 6000)

    return () => window.clearTimeout(timeout)
  }, [activeImage])

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background">
      <div className="relative flex flex-1 overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-700 ease-out"
            style={{
              backgroundImage: `url("${image}")`,
              opacity: activeImage === index ? 1 : 0,
            }}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 bg-gradient-to-t from-[#132EEF]/20 via-[#5DB6FA]/8 to-transparent" />

        <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 px-6">
          <div className="flex min-w-0 flex-1 translate-y-16 flex-col justify-center pb-8 pt-28 md:-translate-y-6 lg:max-w-3xl lg:-translate-y-10 lg:pt-32">
            <div className="-ml-8 max-w-2xl rounded-2xl border border-white/45 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0)_34%),linear-gradient(135deg,rgba(255,255,255,0.64)_0%,rgba(255,255,255,0.42)_50%,rgba(232,244,255,0.34)_100%)] p-5 pl-[52px] shadow-2xl shadow-[#141E61]/18 ring-1 ring-white/35 backdrop-blur-xl backdrop-saturate-150 sm:p-6 sm:pl-14 md:ml-0 md:pl-6 lg:p-7">
              <div className="flex flex-col gap-5 md:gap-8">
            <h1 className="text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-navy">Más de 23 años</span>
              <br />
              <span className="text-navy">Equipando la salud</span>
              <br />
              <span className="bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] bg-clip-text text-transparent">
                Mexicana
              </span>
            </h1>

            <p className="hidden max-w-md text-xl leading-relaxed text-muted-foreground md:block lg:text-[1.4rem]">
              Venta, renta, mantenimiento y obra civil para hospitales e instituciones de salud.
            </p>

            <div>
              <a
                href="/#contacto"
                className="inline-flex min-w-[280px] items-center justify-between gap-6 rounded-xl bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] px-8 py-4 text-lg font-bold text-white shadow-md shadow-[#132EEF]/12 transition-all hover:from-[#2F47EA] hover:via-[#132EEF] hover:to-[#1028D6] hover:shadow-lg hover:shadow-[#132EEF]/18"
              >
                <span>Solicitar cotización</span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </a>
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-5 z-30 flex justify-center gap-3">
          {heroImages.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Ver imagen ${index + 1}`}
              aria-current={activeImage === index}
              onClick={() => setActiveImage(index)}
              className={
                activeImage === index
                  ? "h-2.5 w-10 rounded-full bg-white shadow-md shadow-[#141E61]/20 transition-all"
                  : "h-2.5 w-2.5 rounded-full bg-white/55 transition-all hover:bg-white/85"
              }
            />
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-center text-base font-black uppercase tracking-[0.22em] text-[#141E61]">
            Clientes que confían en nosotros
          </p>
          <Clients compact showTitle={false} />
        </div>
      </div>
    </section>
  )
}
