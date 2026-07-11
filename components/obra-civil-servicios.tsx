"use client"

import { useRef, useState } from "react"
import { Check } from "lucide-react"

const servicios = [
  {
    title: "Estudios Financieros",
    image: "/estudios-financieros.png",
    desc: "Estructuramos el financiamiento de tu proyecto para que sea viable y sostenible desde el inicio.",
    bullets: [
      "Análisis de viabilidad financiera",
      "Proyección de retorno de inversión",
      "Estructuración de financiamiento",
      "Asesoría en opciones de fondeo",
    ],
  },
  {
    title: "Proyecto Arquitectónico",
    image: "/proyecto-arquitectonico.png",
    desc: "Diseño conceptual y arquitectónico adaptado a las necesidades clínicas y normativas de tu institución.",
    bullets: [
      "Programa Médico-Arquitectónico",
      "Diseño de áreas médicas y flujos operativos",
      "Estimado de presupuesto",
      "Cumplimiento con normas aplicables",
    ],
  },
  {
    title: "Proyecto Ejecutivo e Instalaciones Especiales",
    image: "/Instalaciones-especiales.png",
    desc: "Nuestra especialidad. Las instalaciones técnicas hospitalarias que los arquitectos convencionales suelen hacer mal.",
    bullets: [
      "Gases medicinales",
      "Instalaciones eléctricas hospitalarias",
      "Climatización clínica especializada",
      "Voz y datos",
    ],
  },
  {
    title: "Permisos Sanitarios COFEPRIS",
    image: "/permisos-sanitarios.png",
    desc: "Gestionamos toda la tramitología para obtener el permiso sanitario de construcción ante COFEPRIS.",
    bullets: [
      "Solicitud de inicio de trámite",
      "Programa Médico completo",
      "Memoria Descriptiva",
      "Documentos listos para firma",
    ],
  },
  {
    title: "Adquisición de Equipo Médico",
    image: "/adquisición-equipo.png",
    desc: "Te asesoramos en la selección y adquisición del equipamiento adecuado para cada área de tu proyecto.",
    bullets: [
      "Relación de equipos por área médica",
      "Especificaciones técnicas",
      "Gestión de proveedores",
      "Asesoría en selección",
    ],
  },
  {
    title: "Supervisión de Obra",
    image: "/supervisión-obra.png",
    desc: "Ingeniero residente dedicado a supervisar que cada etapa de construcción cumpla con el proyecto y las normas.",
    bullets: [
      "Vigilancia técnica de avances",
      "Prevención de retrabajos",
      "Reportes de avance por visita",
      "Adecuaciones al proyecto",
    ],
  },
  {
    title: "Instalaciones y Puesta en Marcha",
    image: "/Instalaciones-puesta-en-marcha.png",
    desc: "Instalamos el equipamiento médico y dejamos el hospital funcionando desde el primer día.",
    bullets: [
      "Instalación de equipos por área",
      "Capacitación al personal usuario",
      "Entrega de documentación completa",
      "Acompañamiento en arranque",
    ],
  },
  {
    title: "Licencias de Funcionamiento COFEPRIS",
    image: "/licencias-funcionamiento.png",
    desc: "Gestionamos las licencias de funcionamiento para que tu establecimiento opere dentro del marco legal federal.",
    bullets: [
      "Trámite completo ante COFEPRIS",
      "Cumplimiento de requisitos normativos",
      "Seguimiento hasta obtención",
      "Documentación lista para operación",
    ],
  },
]

function FlipCard({
  service,
  className = "",
}: {
  service: (typeof servicios)[number]
  className?: string
}) {
  const [flipped, setFlipped] = useState(false)
  const isTouchRef = useRef(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const handleTouchStart = () => {
    isTouchRef.current = true
    clearCloseTimer()
  }

  const handleClick = () => {
    if (isTouchRef.current) setFlipped((f) => !f)
  }

  const handleMouseEnter = () => {
    clearCloseTimer()
    if (!isTouchRef.current) setFlipped(true)
  }

  const handleMouseLeave = () => {
    if (!isTouchRef.current) {
      closeTimerRef.current = setTimeout(() => {
        setFlipped(false)
        closeTimerRef.current = null
      }, 500)
    }
  }

  const waText = encodeURIComponent(
    `Hola, me interesa el servicio de ${service.title} de Obra Civil.`
  )

  return (
    <div
      className={`cursor-pointer ${className}`}
      style={{ perspective: "1200px", height: "300px" }}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ── Front ─────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-[#EEEEEE] bg-cover bg-center"
          style={{
            backfaceVisibility: "hidden",
            backgroundImage: `url('${service.image ?? "/Hospital-fake.png"}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#141E61]/35 via-transparent to-transparent" />

          {/* Text side */}
          <div className="absolute bottom-5 right-5 max-w-[82%] rounded-lg bg-gradient-to-br from-[#141E61]/95 via-[#141E61]/90 to-[#132EEF]/85 px-5 py-4 shadow-lg">
            <h3 className="text-right text-xl font-black leading-tight text-white sm:text-2xl">
              {service.title}
            </h3>
          </div>
        </div>

        {/* ── Back ──────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#141E61] via-[#141E61] to-[#132EEF] px-6 py-5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-lg font-black leading-snug text-[#5DB6FA] sm:text-xl">
            {service.title}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-white/80">
            {service.desc}
          </p>

          <ul className="mt-4 flex flex-1 flex-col gap-2">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#5DB6FA]"
                  strokeWidth={3}
                />
                <span className="text-sm leading-snug text-white/90">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={`https://wa.me/524499904670?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 flex items-center justify-center rounded-lg border border-white/40 py-2.5 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-[#141E61]"
          >
            Solicitar información
          </a>
        </div>
      </div>
    </div>
  )
}

export function ObraCivilServicios() {
  const cardWidths = [
    "lg:col-span-11",
    "lg:col-span-13",
    "lg:col-span-13",
    "lg:col-span-11",
  ]

  return (
    <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
      <div className="mx-auto max-w-[92rem] px-6">

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
            Nuestro servicio integral
          </h2>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          <p className="mx-auto mt-3 max-w-3xl text-lg font-bold leading-snug text-[#132EEF] sm:text-xl">
            <span className="block">
              Desde el estudio financiero hasta la licencia de funcionamiento.
            </span>
            <span className="block">
              Diseño, construcción y equipamiento sin intermediarios.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-24">
          {servicios.map((servicio, index) => (
            <FlipCard
              key={servicio.title}
              service={servicio}
              className={cardWidths[index % cardWidths.length]}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
