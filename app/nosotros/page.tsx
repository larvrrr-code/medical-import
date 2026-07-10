import Link from "next/link"
import { Check, Hospital, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CountUp } from "@/components/count-up"
import { TeamPhotoCarousel } from "@/components/team-photo-carousel"
import { MexicoCoverageMap } from "@/components/mexico-coverage-map"

/* ─── Data ──────────────────────────────────────────────────────────────── */

const stats = [
  { end: 1000, suffix: "+", label: "Clientes atendidos" },
  { end: 250,  suffix: "+", label: "Trabajos privados" },
  { end: 120,  suffix: "+", label: "Trabajos públicos" },
  { end: 23,   suffix: "+", label: "Años en el mercado" },
]

const propuesta = [
  "Estudio financiero y proyecto arquitectónico",
  "Construcción y instalaciones especiales",
  "Tramitología COFEPRIS y permisos sanitarios",
  "Adquisición de equipo, puesta en marcha y licencias de funcionamiento",
]

const equipo = [
  { name: "Nombre Apellido", role: "Cargo", desc: "Especialista en ingeniería biomédica y equipamiento hospitalario." },
  { name: "Nombre Apellido", role: "Cargo", desc: "Experto en construcción hospitalaria y normativa COFEPRIS." },
  { name: "Nombre Apellido", role: "Cargo", desc: "Responsable de adquisición de equipo y puesta en marcha." },
]

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#141E61]">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(93,182,250,0.14)_0%,rgba(93,182,250,0)_55%)]" />

        <div className="relative mx-auto flex max-w-7xl flex-col px-6 pb-10 pt-24 lg:pb-0 lg:pt-20">

          {/* ── Text row ─────────────────────────────────────────────────── */}
          <div className="flex flex-col">

            {/* Breadcrumb — oculto en mobile: el navbar fijo lo tapaba */}
            <p className="mb-3 hidden text-sm font-medium text-[#5DB6FA] lg:block">
              <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
              {" / "}
              <span className="text-white/80">Nosotros</span>
            </p>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-start lg:gap-36">
              <div className="flex flex-col">
                {/* Title */}
                <h1 className="text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                  Más de 23 años<br />
                  construyendo la<br />
                  <span className="text-[#5DB6FA]">medicina mexicana.</span>
                </h1>

                {/* Body */}
                <div className="mt-6 flex max-w-xl items-center gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#5DB6FA]/18 ring-1 ring-[#5DB6FA]/35">
                    <Hospital className="h-7 w-7 text-[#5DB6FA]" strokeWidth={2.2} />
                  </div>
                  <p className="text-base font-light leading-relaxed text-[#CBE9FF] sm:text-lg">
                    <span className="block lg:whitespace-nowrap">Somos quienes acompañan a hospitales e instituciones de salud</span>
                    <span className="block lg:whitespace-nowrap">desde la idea hasta la operación. Un solo proveedor, todo el proceso.</span>
                  </p>
                </div>
              </div>

              <div className="grid gap-5 pt-1 lg:w-[360px] lg:pt-4">
                {[
                  "Proyectos llave en mano",
                  "Cobertura en todo México",
                  "Equipamiento hospitalario",
                  "Permisos y normativa sanitaria",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                      <Check className="h-3 w-3 text-[#5DB6FA]" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium leading-snug text-white/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Photo strip — mobile/tablet: 2 photos, in-flow, no horizontal scroll */}
          <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 lg:hidden">
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nosotros-tecnica-lampara.jpg"
                alt="Técnica con lámpara"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nosotros-quirofano-equipado.jpg"
                alt="Quirófano equipado"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Photo strip — desktop: 3 photos, staggered overlap into next section */}
          <div className="relative z-10 mx-auto -mb-72 mt-5 hidden w-full max-w-6xl items-end justify-center gap-5 lg:flex lg:overflow-visible">
            <div className="h-[300px] w-[360px] shrink-0 -translate-y-[72px] overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nosotros-tecnica-lampara.jpg"
                alt="Técnica con lámpara"
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="h-[390px] w-[260px] shrink-0 translate-y-2 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nosotros-instalacion-lampara.jpg"
                alt="Instalación de lámpara"
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
            <div className="aspect-[3/2] w-[430px] shrink-0 -translate-y-36 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nosotros-quirofano-equipado.jpg"
                alt="Quirófano equipado"
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
            </div>
          </div>

        </div>

        <div className="h-1 w-full bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="w-full bg-white pb-8 pt-8 lg:pb-10 lg:pt-[340px]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid overflow-hidden rounded-lg border border-[#E6F1FB] shadow-sm shadow-[#141E61]/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={[
                  "flex min-h-[180px] flex-col justify-center px-7 py-14 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg hover:shadow-[#141E61]/10",
                  i % 2 === 0 ? "bg-[#F3F9FE]" : "bg-white",
                ].join(" ")}
              >
                <CountUp
                  end={stat.end}
                  suffix={stat.suffix}
                  className="text-4xl font-extrabold leading-none text-[#141E61] sm:text-5xl"
                />
                <span className="mt-3 text-sm font-semibold leading-tight text-[#141E61]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiénes somos ────────────────────────────────────────────────── */}
      <section className="w-full bg-white pb-14 pt-4 lg:pb-20 lg:pt-6">
        <div className="mx-auto max-w-7xl border-t border-[#EEEEEE] px-6 pt-8 lg:pt-10">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[55%_1fr] lg:gap-16">

            {/* Left */}
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#132EEF]">
                Nuestra propuesta de valor
              </span>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[#141E61] sm:text-4xl">
                Un solo equipo.<br />Todo el proceso.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#444444]">
                Cuando un hospital necesita crecer, enfrenta un problema complejo: arquitectos que no entienden instalaciones médicas, proveedores de equipo que no supervisan obra, gestores que no conocen la normativa de COFEPRIS. En Medical Import resolvemos todo eso con un solo equipo especializado.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {propuesta.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#132EEF]">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-sm leading-snug text-[#444444]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — team photo carousel */}
            <TeamPhotoCarousel />

          </div>
        </div>
      </section>

      {/* ── Nuestro equipo ───────────────────────────────────────────────── */}
      <div className="mx-auto h-px max-w-7xl bg-[#EEEEEE]" />

      <section className="hidden w-full bg-[#E6F1FB] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-3 text-center">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              El equipo detrás de Medical Import.
            </h2>
            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>
          <p className="mb-10 text-center text-sm text-gray-500">
            Especialistas en ingeniería biomédica, construcción hospitalaria y equipamiento médico.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {equipo.map((member, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl bg-white p-8 text-center shadow-sm"
              >
                {/* Circular photo placeholder */}
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
                  <span className="text-xs text-gray-400">Foto</span>
                </div>
                <h3 className="mt-4 text-base font-black text-[#141E61]">{member.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#132EEF]">{member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">{member.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Cobertura ────────────────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Left */}
            <div>
              <h2 className="text-3xl font-black leading-tight text-[#141E61] sm:text-4xl">
                Atendemos en todo México.
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
              <p className="mt-5 text-base leading-relaxed text-gray-500">
                Atendemos instituciones de salud públicas y privadas en toda la República Mexicana.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <div className="rounded-xl border border-[#B5D4F4] bg-[#E6F1FB] px-5 py-4">
                  <p className="text-sm font-black text-[#141E61]">Sector Público</p>
                  <p className="mt-1 text-sm text-[#141E61]/70">IMSS · ISSSTE · Secretaría de Salud</p>
                </div>
                <div className="rounded-xl border border-[#B5D4F4] bg-[#E6F1FB] px-5 py-4">
                  <p className="text-sm font-black text-[#141E61]">Sector Privado</p>
                  <p className="mt-1 text-sm text-[#141E61]/70">Hospitales y clínicas privadas</p>
                </div>
              </div>
            </div>

            {/* Right — map placeholder */}
            <MexicoCoverageMap />

          </div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#141E61] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            ¿Tienes un proyecto en mente?
          </h2>
          <p className="mt-3 text-base font-medium text-[#5DB6FA] sm:text-lg">
            Platícanos. Nuestro equipo está listo para asesorarte sin compromiso.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/524499904670?text=Hola%2C%20tengo%20un%20proyecto%20en%20mente%20y%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
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
