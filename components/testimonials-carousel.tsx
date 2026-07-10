"use client"

import { useMemo, useState } from "react"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Medical Import ha sido un aliado clave para nuestra institucion. Su respuesta en mantenimiento correctivo siempre ha sido muy rapida.",
    name: "Dr. Alejandro Ruiz",
    role: "Director de Compras",
    institution: "IMSS Guadalajara",
  },
  {
    quote:
      "Llevamos mas de 8 anos trabajando con ellos. La calidad del equipo medico y la atencion postventa nos dan mucha confianza.",
    name: "Lic. Marisol Herrera",
    role: "Jefa de Abastecimiento",
    institution: "ISSSTE Jalisco",
  },
  {
    quote:
      "Su equipo de ingenieria biomedica resolvio en horas lo que otros tardaban dias. El seguimiento fue claro de principio a fin.",
    name: "Dr. Carlos Mendoza",
    role: "Director Medico",
    institution: "Star Medica",
  },
  {
    quote:
      "La renta de equipos nos permitio equipar urgencias sin afectar el presupuesto de inversion. Todo llego en excelentes condiciones.",
    name: "Lic. Patricia Soto",
    role: "Administradora",
    institution: "Clinica Guadalupe",
  },
  {
    quote:
      "Necesitabamos camas hospitalarias para una expansion temporal y el proceso fue muy ordenado. Cumplieron tiempos y soporte.",
    name: "Ing. Roberto Silva",
    role: "Coordinador de Infraestructura",
    institution: "MAC Hospitales",
  },
  {
    quote:
      "Nos ayudaron a seleccionar el equipo correcto sin empujarnos a comprar de mas. Se nota la experiencia en hospitales.",
    name: "Dra. Fernanda Leon",
    role: "Direccion Operativa",
    institution: "Hospital Santa Maria Chapalita",
  },
  {
    quote:
      "El arco en C se entrego instalado, probado y con capacitacion para el personal. Fue una implementacion muy limpia.",
    name: "Dr. Ivan Paredes",
    role: "Traumatologia",
    institution: "Clinica Guadalupe",
  },
  {
    quote:
      "Cuando tenemos un requerimiento urgente, el equipo comercial responde con opciones reales y fechas claras. Eso hace diferencia.",
    name: "Lic. Daniela Torres",
    role: "Compras Hospitalarias",
    institution: "Hospitales Star Medica",
  },
]

function TestimonialCard({
  testimonial,
  active,
  onActivate,
  onDeactivate,
}: {
  testimonial: (typeof testimonials)[number]
  active: boolean
  onActivate: () => void
  onDeactivate: () => void
}) {
  return (
    <article
      tabIndex={0}
      onPointerEnter={onActivate}
      onPointerLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onClick={onActivate}
      className={[
        "group rounded-lg bg-white p-4 shadow-lg shadow-black/10 transition duration-300 outline-none sm:p-5",
        "focus-visible:ring-2 focus-visible:ring-[#5DB6FA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141E61]",
        active ? "-translate-y-2 scale-[1.02] shadow-2xl shadow-black/20" : "hover:-translate-y-2 hover:scale-[1.02]",
      ].join(" ")}
    >
      <span className="block text-5xl font-black leading-none text-[#132EEF]">"</span>
      <p className="-mt-1 text-[13px] leading-relaxed text-gray-600 sm:text-[15px]">{testimonial.quote}</p>

      <div className="mt-5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="mt-2 text-sm font-black text-[#141E61] sm:text-base">{testimonial.name}</p>
        <p className="text-xs leading-snug text-gray-500 sm:text-sm">
          {testimonial.role} - {testimonial.institution}
        </p>
      </div>
    </article>
  )
}

export function TestimonialsCarousel() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const columns = useMemo(
    () => [testimonials.filter((_, i) => i % 2 === 0), testimonials.filter((_, i) => i % 2 === 1)],
    [],
  )

  return (
    <div
      className="h-[540px] overflow-hidden rounded-xl border border-white/10 bg-[#0F1854] p-3 shadow-2xl shadow-black/10 lg:h-[590px]"
      onPointerLeave={() => {
        setActiveCard(null)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setActiveCard(null)
        }
      }}
    >
      <div className="grid h-full grid-cols-2 gap-3 sm:gap-4">
        {columns.map((column, columnIndex) => {
          const speed = columnIndex === 0 ? "42s" : "49s"
          const offset = columnIndex === 0 ? "" : "mt-12"
          const duplicated = [...column, ...column]

          return (
            <div key={columnIndex} className={`testimonial-column-mask ${offset}`}>
              <div
                className="testimonial-column-track flex flex-col gap-4"
                style={{
                  animationDuration: speed,
                }}
              >
                {duplicated.map((testimonial, index) => {
                  const id = `${columnIndex}-${index}`

                  return (
                    <TestimonialCard
                      key={id}
                      testimonial={testimonial}
                      active={activeCard === id}
                      onActivate={() => setActiveCard(id)}
                      onDeactivate={() => setActiveCard((current) => (current === id ? null : current))}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
