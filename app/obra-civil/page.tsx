import Link from "next/link"
import { Check, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ObraCivilServicios } from "@/components/obra-civil-servicios"
import { AnimatedObraStats } from "@/components/animated-obra-stats"

/* ─── Data ──────────────────────────────────────────────────────────────── */

const diferenciadores = [
  "Especialistas en instalaciones técnicas hospitalarias",
  "Cumplimiento normativo COFEPRIS garantizado",
  "Gestión completa de licencias y permisos federales",
]

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ObraCivilPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/Hospital-fake.png')" }}
      >
        <style>
          {`
            @keyframes obraBulletIn {
              from {
                opacity: 0;
                transform: translateY(12px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gradient-to-t from-[#132EEF]/24 via-[#5DB6FA]/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 pb-14 pt-28 lg:pb-20 lg:pt-32">
          <div className="max-w-4xl rounded-2xl border border-white/45 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0)_34%),linear-gradient(135deg,rgba(255,255,255,0.68)_0%,rgba(255,255,255,0.46)_50%,rgba(232,244,255,0.36)_100%)] p-8 shadow-2xl shadow-[#141E61]/18 ring-1 ring-white/35 backdrop-blur-xl backdrop-saturate-150 lg:p-10">
            <p className="mb-8 text-sm font-semibold text-gray-500">
              <Link href="/" className="transition-colors hover:text-[#132EEF]">Inicio</Link>
              {" / "}
              <span className="text-[#141E61]">Obra Civil</span>
            </p>

            <h1 className="max-w-4xl text-4xl font-black leading-tight text-[#141E61] sm:text-5xl lg:text-6xl">
              Proyectos Integrales
            </h1>
            <p className="mt-5 max-w-3xl text-2xl font-black leading-tight sm:text-3xl">
              <span className="bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] bg-clip-text text-transparent">Diseño</span>
              <span className="text-gray-400"> + </span>
              <span className="bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] bg-clip-text text-transparent">Construcción</span>
              <span className="text-gray-400"> + </span>
              <span className="bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] bg-clip-text text-transparent">Equipamiento</span>
            </p>
            <div className="mt-12 flex flex-col gap-6">
              {diferenciadores.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-5 opacity-0"
                  style={{
                    animation: "obraBulletIn 0.55s ease forwards",
                    animationDelay: `${index * 180 + 250}ms`,
                  }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] shadow-md shadow-[#132EEF]/25 ring-1 ring-white/40">
                    <Check className="h-5 w-5 text-white" strokeWidth={3} />
                  </div>
                  <p className="text-lg font-semibold leading-snug text-gray-600 sm:text-xl">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Servicios flip cards ─────────────────────────────────────────── */}
      <ObraCivilServicios />

      {/* ── Por qué nosotros ─────────────────────────────────────────────── */}
      <section className="w-full bg-gradient-to-br from-[#141E61] via-[#141E61] to-[#132EEF] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">
            <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
              ¿Por qué confiar en Medical Import para tu obra?
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#5DB6FA]" />
          </div>

          <AnimatedObraStats />

          <div className="mt-12 flex justify-center">
            <a
              href="https://wa.me/524499904670?text=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto%20de%20obra%20civil%20hospitalaria.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[240px] items-center justify-center gap-3 rounded-xl bg-[#25D366] px-8 py-3.5 text-base font-black text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Cotizar proyecto
            </a>
          </div>

        </div>
      </section>

      {/* ── Proyectos destacados ─────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-3">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Proyectos destacados.
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>
          <p className="mb-10 text-lg font-semibold text-gray-500 sm:text-xl">
            Proyectos en el sector público y privado.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex h-56 items-center justify-center rounded-xl border-2 border-dashed border-[#EEEEEE] bg-[#F8F9FC]"
              >
                <p className="text-sm font-medium text-gray-300">Proyecto próximamente</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#141E61] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            ¿Tienes un proyecto hospitalario?
          </h2>
          <p className="mt-3 text-lg font-medium text-[#5DB6FA]">
            Platícanos tu idea. Sin compromiso.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/524499904670?text=Hola%2C%20me%20interesa%20cotizar%20un%20proyecto%20de%20obra%20civil%20hospitalaria.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-3.5 font-bold text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos
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
