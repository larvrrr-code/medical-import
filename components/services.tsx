import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    title: "Equipos Médicos",
    description: "Venta e importación de equipamiento de alta tecnología para hospitales e instituciones.",
    image: { src: "/Arco%20en%20C.png", alt: "Equipo de imagenología" },
    href: "/equipos",
  },
  {
    title: "Renta Hospitalaria",
    description: "Soluciones flexibles de renta para cubrir necesidades temporales o permanentes.",
    image: { src: "/Cama%20Hospitalaria.png", alt: "Cama hospitalaria eléctrica" },
    href: "/rentas",
  },
  {
    title: "Mantenimiento",
    description: "Servicio técnico preventivo y correctivo con pólizas para todo tipo de equipo médico.",
    image: { src: "/Ximena.png", alt: "Técnico de mantenimiento" },
    href: "/mantenimiento",
  },
  {
    title: "Obra Civil",
    description: "Diseño y construcción de espacios hospitalarios especializados llave en mano.",
    image: { src: "/proyecto-arquitectonico.png", alt: "Obra civil hospitalaria" },
    href: "/obra-civil",
  },
]

export function Services() {
  return (
    <section className="w-full bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-9">
          <h2 className="text-4xl font-black tracking-tight text-navy sm:text-5xl">
            Nuestros servicios
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative h-[260px] overflow-hidden rounded-2xl"
            >
              {/* Imagen de fondo */}
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Overlay azul oscuro */}
              <div className="absolute inset-0 bg-[#141E61]/65 transition-opacity duration-300 group-hover:bg-[#141E61]/55" />

              {/* Texto */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-3xl font-black leading-none text-white sm:text-4xl">{service.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-colors group-hover:text-white">
                  <span>Ver más</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
