import Link from "next/link"
import Image from "next/image"
import { Check, Phone, Activity, Droplets, Wind, Gauge, UtensilsCrossed, Layers } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/* ─── Data ──────────────────────────────────────────────────────────────── */

const camas = [
  {
    slug: "hill-rom-advance-6-posiciones",
    brand: "Hill-Rom",
    name: "Advance 6 posiciones",
    image: "/hill-rom-advance-6-posiciones.png",
    specs: ["6 posiciones ajustables", "Cap. 226 kg", "Liberación rápida CPR"],
    price: "$1,600",
  },
  {
    slug: "hill-rom-advance-clasica",
    brand: "Hill-Rom",
    name: "Advance (clásica)",
    image: "/hill-rom-advance-clasica.png",
    specs: ["6 posiciones", "Sprint de plancha", "Cap. 220 kg"],
    price: "$1,500",
  },
  {
    slug: "stryker-secure-ii",
    brand: "Stryker",
    name: "Secure II",
    image: "/stryker-secure-ii.png",
    specs: ["6 posiciones", "Función RCP", "Sistema de báscula"],
    price: "$2,900",
  },
  {
    slug: "stryker-electrica-3-posiciones",
    brand: "Stryker",
    name: "Eléctrica 3 posiciones",
    image: "/stryker-electrica-3-posiciones.png",
    specs: ["3 posiciones", "Barandales abatibles", "Cap. 120 kg"],
    price: "$1,900",
  },
  {
    slug: "stryker-semi-electrica",
    brand: "Stryker",
    name: "Semi-eléctrica",
    image: "/stryker-semi-electrica.png",
    specs: ["3 posiciones", "Control eléctrico torso y piernas", "Cap. 150 kg"],
    price: "$1,000",
  },
]

const accesorios = [
  { icon: Layers, name: "Colchón nuevo" },
  { icon: Droplets, name: "Porta sueros" },
  { icon: Activity, name: "Monitor de signos vitales" },
  { icon: Wind, name: "Concentrador de oxígeno" },
  { icon: Gauge, name: "Tanques de oxígeno" },
  { icon: UtensilsCrossed, name: "Mesa móvil para alimentos" },
]

const pasos = [
  { n: "1", title: "Cuéntanos tu necesidad", desc: "Dinos el tipo de cama, duración estimada y lugar de entrega." },
  { n: "2", title: "Te asesoramos", desc: "Seleccionamos el modelo ideal según el diagnóstico y presupuesto." },
  { n: "3", title: "Contrato y pago inicial", desc: "Firma digital simple y pago del primer mes para reservar." },
  { n: "4", title: "Entrega e instalación", desc: "Llevamos la cama, la instalamos y capacitamos al personal o familiar." },
]

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function RentasPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[radial-gradient(circle_at_82%_18%,rgba(93,182,250,0.42)_0%,rgba(19,46,239,0.18)_24%,rgba(20,30,97,0)_48%),linear-gradient(135deg,#141E61_0%,#13245f_52%,#0d143f_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_92%,rgba(93,182,250,0.2)_0%,rgba(93,182,250,0)_34%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 lg:pb-20 lg:pt-32">
          {/* Breadcrumb */}
          <p className="mb-8 text-sm font-medium text-white/70">
            <Link href="/" className="transition-colors hover:text-[#5DB6FA]">Inicio</Link>
            {" / "}
            <span className="text-white/90">Rentas</span>
          </p>

          <h1 className="max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Renta de Camas<br />
            <span className="text-[#5DB6FA]">Hospitalarias.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/78 sm:text-lg">
            Soluciones flexibles para hospitales, clínicas y pacientes en casa.
            Entrega, instalación y soporte incluidos.
          </p>
        </div>

        {/* thin blue bottom accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />
      </section>

      {/* ── Camas Grid ───────────────────────────────────────────────────── */}
      <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">

          {/* Section header */}
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Modelos disponibles
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {camas.map((cama) => {
              const waText = encodeURIComponent(`Hola, me interesa rentar la ${cama.brand} ${cama.name}`)
              return (
                <article
                  key={cama.slug}
                  className="flex flex-col overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#F0F4FF]">
                    <Image
                      src={cama.image}
                      alt={`${cama.brand} ${cama.name}`}
                      fill
                      className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Brand pill */}
                    <span className="inline-block w-fit rounded-full bg-[#E6F1FB] px-3 py-1 text-xs font-bold text-[#141E61]">
                      {cama.brand}
                    </span>

                    {/* Name */}
                    <h3 className="mt-3 text-lg font-black text-[#141E61]">
                      {cama.name}
                    </h3>

                    {/* Specs */}
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {cama.specs.map((spec) => (
                        <li key={spec} className="flex items-start gap-2 text-sm text-gray-500">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#132EEF]" />
                          {spec}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <p className="mt-5">
                      <span className="text-xs font-medium text-gray-400">Desde </span>
                      <span className="text-2xl font-black text-[#132EEF]">{cama.price}</span>
                      <span className="text-sm font-medium text-gray-400">/mes</span>
                    </p>

                    {/* Buttons */}
                    <div className="mt-4 flex flex-col gap-2.5">
                      <a
                        href={`https://wa.me/524499904670?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-[#141E61] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#132EEF]"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Solicitar renta
                      </a>
                      <Link
                        href={`/rentas/${cama.slug}`}
                        className="flex items-center justify-center rounded-xl border border-[#141E61] px-4 py-2.5 text-sm font-bold text-[#141E61] transition-colors hover:bg-[#141E61] hover:text-white"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Accesorios ───────────────────────────────────────────────────── */}
      <section className="w-full bg-[#EEEEEE] py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Complementa tu renta
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {accesorios.map(({ icon: Icon, name }, index) => (
              <div
                key={name}
                className="accessory-wave-card flex flex-col items-center gap-3 rounded-xl bg-white p-5 text-center shadow-sm"
                style={{ animationDelay: `${index * 140}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F1FB]">
                  <Icon className="h-6 w-6 text-[#132EEF]" />
                </div>
                <p className="text-base font-semibold leading-snug text-[#141E61]">{name}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-base font-medium text-gray-600 sm:text-lg">
            Pregunta por paquetes con accesorios incluidos.
          </p>
        </div>
      </section>

      {/* ── Proceso ──────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              ¿Cómo funciona?
            </h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>

          {/* Desktop: horizontal, Mobile: vertical */}
          <div className="relative">

            {/* Connector line — desktop only */}
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-[#EEEEEE] lg:block" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-6">
              {pasos.map((paso, i) => (
                <div key={i} className="relative flex flex-col items-center text-center lg:items-center">
                  {/* Number circle */}
                  <button
                    type="button"
                    aria-label={`Paso ${paso.n}: ${paso.title}`}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] text-xl font-black text-white shadow-md shadow-[#132EEF]/30 outline-none ring-[#5DB6FA]/0 transition-all duration-300 hover:scale-105 hover:from-[#2F47EA] hover:via-[#132EEF] hover:to-[#1028D6] hover:ring-8 hover:ring-[#5DB6FA]/20 hover:shadow-lg hover:shadow-[#132EEF]/28 active:scale-110 active:ring-8 active:ring-[#5DB6FA]/30 focus-visible:scale-105 focus-visible:ring-8 focus-visible:ring-[#5DB6FA]/30"
                  >
                    {paso.n}
                  </button>

                  {/* Mobile connector line */}
                  {i < pasos.length - 1 && (
                    <div className="my-2 h-8 w-px bg-[#EEEEEE] lg:hidden" />
                  )}

                  <h3 className="mt-4 text-lg font-black text-[#141E61] lg:mt-5">
                    {paso.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-500">
                    {paso.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#141E61] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            ¿Listo para rentar?
          </h2>
          <p className="mt-3 text-lg font-medium text-[#5DB6FA]">
            Respondemos en menos de 24 horas.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/524499904670?text=Hola%2C%20me%20interesa%20rentar%20una%20cama%20hospitalaria.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-3.5 font-bold text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            <a
              href="tel:+524499904670"
              className="flex min-w-[200px] items-center justify-center gap-3 rounded-xl border-2 border-white px-7 py-3.5 font-bold text-white transition-colors hover:bg-white hover:text-[#141E61]"
            >
              <Phone className="h-5 w-5" />
              449 990 4670
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
