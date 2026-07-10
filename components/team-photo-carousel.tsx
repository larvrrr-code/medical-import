"use client"

import { ChevronRight, MousePointerClick } from "lucide-react"
import { useState } from "react"

const photos = [
  { src: "/Nosotros-1.jpg", position: "center 42%" },
  { src: "/Nosotros-2.jpg", position: "center 34%" },
  { src: "/Nosotros-3.jpg", position: "center 38%" },
  { src: "/Nosotros-4.jpg", position: "center center" },
  { src: "/Nosotros5.jpg", position: "center 36%" },
  { src: "/Nosotros-6.jpg", position: "center center" },
  { src: "/Nosotros-7.jpg", position: "center 34%" },
]

export function TeamPhotoCarousel() {
  const [activePhoto, setActivePhoto] = useState(0)

  const nextPhoto = () => {
    setActivePhoto((current) => (current + 1) % photos.length)
  }

  return (
    <div className="w-full">
      <style jsx>{`
        @keyframes clickPrompt {
          0%,
          68%,
          100% {
            transform: scale(1);
          }
          76% {
            transform: scale(0.82);
          }
          84% {
            transform: scale(1.08);
          }
        }
      `}</style>

      <button
        type="button"
        onClick={nextPhoto}
        className="group relative block h-[330px] w-full overflow-hidden rounded-xl bg-gray-100 text-left sm:h-[390px] lg:h-[470px]"
        aria-label="Ver siguiente foto del equipo"
      >
        {photos.map((photo, index) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={`Foto del equipo ${index + 1}`}
            style={{ objectPosition: photo.position }}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out",
              index === activePhoto ? "scale-100 opacity-100" : "scale-105 opacity-0",
            ].join(" ")}
          />
        ))}

        <span className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/85 text-[#141E61] shadow-sm transition-transform duration-300 group-hover:translate-x-1">
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </span>
      </button>

      <div className="mt-5 flex items-center justify-center gap-2.5 text-sm font-bold text-[#132EEF] sm:text-base">
        <MousePointerClick
          className="h-5 w-5"
          strokeWidth={2.2}
          style={{ animation: "clickPrompt 1.9s ease-in-out infinite" }}
        />
        <span className="hidden sm:inline">Haz click en la imagen</span>
        <span className="sm:hidden">Toca la imagen</span>
      </div>
    </div>
  )
}
