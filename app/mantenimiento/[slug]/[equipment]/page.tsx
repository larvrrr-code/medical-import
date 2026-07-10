import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabaseClient"

export const revalidate = 3600

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface CategoryRef {
  name: string
  slug: string
}

interface EquipmentRow {
  id: number
  name: string
  brands?: string[]
  service_detail?: string
  image_url?: string
  service_categories: CategoryRef
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

async function fetchEquipment(equipmentSlug: string): Promise<EquipmentRow | null> {
  const { data, error } = await supabase
    .from("category_equipment")
    .select("id, name, brands, service_detail, image_url, service_categories(name, slug)")
    .eq("slug", equipmentSlug)
    .maybeSingle()

  if (error) console.error("[equipment page] fetch error:", JSON.stringify(error))
  return data as EquipmentRow | null
}

/* ─── Metadata ───────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; equipment: string }>
}): Promise<Metadata> {
  const { equipment: equipmentSlug } = await params
  const eq = await fetchEquipment(equipmentSlug)

  if (!eq) return { title: "Equipo no encontrado | Medical Import" }

  const brandsText =
    eq.brands && eq.brands.length > 0
      ? `Atendemos marcas: ${eq.brands.slice(0, 3).join(", ")}.`
      : ""

  return {
    title: `Mantenimiento de ${eq.name} | Medical Import`,
    description: `Servicio de mantenimiento preventivo y correctivo para ${eq.name}. ${brandsText} Más de 23 años equipando la medicina mexicana.`,
  }
}

/* ─── Static params ──────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("category_equipment")
    .select("slug, service_categories(slug)")
    .eq("active", true)

  if (error) console.error("[generateStaticParams equipment] error:", JSON.stringify(error))

  return (data ?? []).map((row: any) => ({
    slug: row.service_categories?.slug ?? "",
    equipment: row.slug ?? "",
  }))
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ slug: string; equipment: string }>
}) {
  const { equipment: equipmentSlug } = await params
  const eq = await fetchEquipment(equipmentSlug)

  if (!eq) notFound()

  const cat = eq.service_categories
  const equipmentWaText = encodeURIComponent(
    `Hola, me interesa el servicio de mantenimiento de ${eq.name}. ¿Me pueden dar más información?`
  )
  const serviceLines = eq.service_detail
    ? eq.service_detail
        .split(/\.\s+/)
        .map((l) => l.trim().replace(/\.+$/, ""))
        .filter(Boolean)
    : []

  return (
    <>
      <Navbar />

      {/* ── Hero slim ────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/Hospital-fake.png')" }}
      >
        <div className="absolute inset-0 bg-[#141E61]/65" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 text-center lg:pb-16 lg:pt-40">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {eq.name}
          </h1>
          {eq.brands && eq.brands.length > 0 && (
            <p className="mt-4 text-lg font-medium text-white/80">
              {eq.brands.join(" · ")}
            </p>
          )}
        </div>
      </section>

      {/* ── Separador ────────────────────────────────────────────────────── */}
      <div className="h-1 bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />

      {/* ── Contenido ────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 space-y-12">

          {/* Botón volver */}
          <Link
            href={`/mantenimiento/${cat.slug}`}
            aria-label={`Volver a ${cat.name}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#141E61] px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0e1a50]"
          >
            <ArrowLeft className="h-5 w-5" />
            Ir atrás
          </Link>

          {/* Foto del equipo */}
          {eq.image_url && (
            <div className="flex justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
              <div className="relative h-56 w-full max-w-sm sm:h-72">
                <Image
                  src={eq.image_url}
                  alt={eq.name}
                  fill
                  sizes="(max-width: 640px) 90vw, 384px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {/* Marcas */}
          {eq.brands && eq.brands.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
                Marcas que atendemos.
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
              <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
                Selecciona la marca que estás buscando para solicitar una cotización.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {eq.brands.map((brand) => {
                  const msg = encodeURIComponent(
                    `Hola, me interesa el servicio de mantenimiento de ${eq.name} marca ${brand}. ¿Me pueden dar más información?`
                  )
                  return (
                    <a
                      key={brand}
                      href={`https://wa.me/524499904670?text=${msg}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1.5 rounded-full border border-[#5DB6FA]/45 bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] px-4 py-1.5 text-sm font-bold text-white shadow-md shadow-[#132EEF]/25 ring-1 ring-white/35 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[#132EEF]/35 hover:ring-[#5DB6FA]/55"
                    >
                      {brand}
                      <span className="text-[#BFE8FF] opacity-0 transition-opacity duration-200 group-hover:opacity-100">›</span>
                    </a>
                  )
                })}
              </div>
              <p className="mt-5 text-lg font-black text-[#132EEF]">
                Mantenimiento preventivo y correctivo de {eq.name}
              </p>
            </div>
          )}

          {/* Qué incluye el servicio */}
          {serviceLines.length > 0 && (
            <div>
              <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
                ¿Qué incluye el servicio?
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
              <ul className="mt-6 space-y-3">
                {serviceLines.map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#132EEF]" />
                    <span className="text-base font-medium leading-relaxed text-gray-700">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Volver */}
          <div>
            <Link
              href={`/mantenimiento/${cat.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#132EEF] transition-colors hover:text-[#141E61]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a {cat.name}
            </Link>
          </div>

        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#141E61] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            ¿Necesitas mantenimiento para este equipo?
          </h2>
          <p className="mt-3 text-lg font-medium text-[#5DB6FA]">
            Solicita una cotización sin compromiso.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/524499904670?text=${equipmentWaText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-3.5 font-bold text-white transition-opacity hover:opacity-90"
            >
              {WA_SVG}
              Solicitar cotización
            </a>

            <a
              href="mailto:info@medicalimport.mx"
              className="flex min-w-[200px] items-center justify-center gap-3 rounded-xl border-2 border-white px-7 py-3.5 font-bold text-white transition-colors hover:bg-white hover:text-[#141E61]"
            >
              <Mail className="h-5 w-5" />
              info@medicalimport.mx
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
