import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EquipmentSearchList } from "@/components/equipment-search-list"
import { supabase } from "@/lib/supabaseClient"

export const revalidate = 3600

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface ServiceCategory {
  id: number
  name: string
  slug: string
  short_desc?: string
  image_url?: string
}

interface Equipment {
  id: number
  name: string
  slug?: string
  brands?: string[]
  service_detail?: string
}

/* ─── Static params ──────────────────────────────────────────────────────── */

export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("service_categories")
    .select("slug")
    .eq("service_id", 1)

  if (error) console.error("[generateStaticParams] error:", error)
  return (data ?? []).map((row: { slug: string }) => ({ slug: row.slug }))
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function MantenimientoCategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Diagnóstico: busca el slug sin filtros para ver qué existe en la tabla
  const { data: diagRows } = await supabase
    .from("service_categories")
    .select("id, slug, service_id, active")
    .eq("slug", slug)

  console.log(`[diag] slug recibido: "${slug}" | filas encontradas:`, JSON.stringify(diagRows))

  const { data: category, error: catError } = await supabase
    .from("service_categories")
    .select("id, name, slug, short_desc, image_url")
    .eq("slug", slug)
    .eq("service_id", 1)
    .maybeSingle()

  if (catError) console.error("[mantenimiento/slug] category error:", JSON.stringify(catError))
  if (!category) {
    console.error(`[mantenimiento/slug] notFound — slug="${slug}"`)
    notFound()
  }

  const cat = category as ServiceCategory
  const serviceWaText = encodeURIComponent(
    `Hola, me interesa solicitar servicio de mantenimiento para la categoría ${cat.name}. ¿Me pueden dar más información?`
  )

  const { data: equipment, error: eqError } = await supabase
    .from("category_equipment")
    .select("id, name, slug, brands, service_detail")
    .eq("category_id", cat.id)
    .order("sort_order")

  if (eqError) console.error("[mantenimiento/slug] equipment error:", eqError)

  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: cat.image_url
            ? `url('${cat.image_url}')`
            : "url('/Hospital-fake.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#141E61]/65" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 text-center lg:pb-16 lg:pt-40">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {cat.name}
          </h1>
          {cat.short_desc && (
            <p className="mt-4 text-lg font-medium text-white/80">
              {cat.short_desc}
            </p>
          )}
        </div>
      </section>

      {/* ── Separador ────────────────────────────────────────────────────── */}
      <div className="h-1 bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />

      {/* ── Equipos ──────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6">

          <div className="mb-3">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Equipos disponibles.
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>
          <p className="mb-10 text-lg font-semibold text-gray-500">
            Haz clic en un equipo para ver sus detalles.
          </p>

          <EquipmentSearchList
            items={(equipment as Equipment[]) ?? []}
            categoryName={cat.name}
            categorySlug={cat.slug}
          />

          <div className="mt-10">
            <Link
              href="/mantenimiento"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#132EEF] transition-colors hover:text-[#141E61]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a categorías
            </Link>
          </div>

        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#141E61] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">
            ¿Requieres servicio para estos equipos?
          </h2>
          <p className="mt-3 text-lg font-medium text-[#5DB6FA]">
            Solicita una cotización sin compromiso.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/524499904670?text=${serviceWaText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#25D366] px-7 py-3.5 font-bold text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar servicio
            </a>

            <a
              href="tel:+524499904670"
              className="flex min-w-[200px] items-center justify-center gap-3 rounded-xl border-2 border-white px-7 py-3.5 font-bold text-white transition-colors hover:bg-white hover:text-[#141E61]"
            >
              449 990 4670
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
