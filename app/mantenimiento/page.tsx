import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategorySearchGrid } from "@/components/category-search-grid"
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

interface EquipmentItem {
  id: number
  name: string
  slug: string
  service_categories: { name: string; slug: string }
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default async function MantenimientoPage() {
  const [{ data: categories, error }, { data: equipment }] = await Promise.all([
    supabase
      .from("service_categories")
      .select("id, name, slug, short_desc, image_url")
      .eq("service_id", 1)
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("category_equipment")
      .select("id, name, slug, service_categories(name, slug)")
      .eq("active", true)
      .order("name"),
  ])

  return (
    <>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/Hospital-fake.png')" }}
      >
        <div className="absolute inset-0 bg-[#141E61]/65" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 text-center lg:pb-16 lg:pt-40">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Servicio de Mantenimiento
          </h1>
          <p className="mt-4 text-2xl font-black text-white/90 sm:text-3xl">
            Preventivo + Correctivo + Certificado
          </p>
        </div>
      </section>

      {/* ── Separador ────────────────────────────────────────────────────── */}
      <div className="h-1 bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />

      {/* ── Categorías ───────────────────────────────────────────────────── */}
      <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-3">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Categorías de servicio.
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>
          <p className="mb-10 text-lg font-semibold text-gray-500 sm:text-xl">
            Selecciona una categoría para ver los equipos disponibles.
          </p>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4">
              <p className="text-sm font-semibold text-red-600">
                Error al cargar categorías. Por favor recarga la página.
              </p>
            </div>
          )}

          {!error && (
            <CategorySearchGrid
              categories={(categories as ServiceCategory[]) ?? []}
              equipment={(equipment as EquipmentItem[]) ?? []}
            />
          )}

        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#141E61] py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            ¿Necesitas mantenimiento?
          </h2>
          <p className="mt-3 text-lg font-medium text-[#5DB6FA]">
            Contáctanos y agenda tu servicio hoy.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/524499904670?text=Hola%2C%20necesito%20servicio%20de%20mantenimiento.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
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
              449 990 4670
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
