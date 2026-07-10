import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductSubcategoryGrid, type ProductSubcategoryCard } from "@/components/product-subcategory-grid"
import { supabase } from "@/lib/supabaseClient"

export const revalidate = 3600

interface ServiceCategory {
  id: number
  name: string
  slug: string
  short_desc?: string | null
  image_url?: string | null
}

async function fetchCategory(slug: string) {
  const { data, error } = await supabase
    .from("service_categories")
    .select("id, name, slug, short_desc, image_url")
    .eq("slug", slug)
    .eq("service_id", 3)
    .maybeSingle()

  if (error) console.error("[equipos/categoria] category error:", JSON.stringify(error))
  return data as ServiceCategory | null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>
}): Promise<Metadata> {
  const { categoria } = await params
  const category = await fetchCategory(categoria)

  if (!category) return { title: "Categoria no encontrada | Medical Import" }

  return {
    title: `${category.name} | Equipos Medicos | Medical Import`,
    description:
      category.short_desc ?? `Explora subcategorias de ${category.name} disponibles en Medical Import.`,
  }
}

export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("service_categories")
    .select("slug")
    .eq("service_id", 3)
    .eq("active", true)

  if (error) console.error("[generateStaticParams equipos] error:", JSON.stringify(error))
  return (data ?? []).map((row: { slug: string }) => ({ categoria: row.slug }))
}

export default async function EquiposCategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>
}) {
  const { categoria } = await params
  const category = await fetchCategory(categoria)

  if (!category) notFound()

  const { data: subcategories, error } = await supabase
    .from("product_subcategories")
    .select("id, name, slug, short_desc, image_url")
    .eq("category_id", category.id)
    .eq("active", true)
    .order("name")

  if (error) console.error("[equipos/categoria] subcategories error:", JSON.stringify(error))

  return (
    <>
      <Navbar />

      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: category.image_url ? `url('${category.image_url}')` : "url('/Hospital-fake.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#141E61]/65" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 text-center lg:pb-16 lg:pt-40">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {category.name}
          </h1>
          {category.short_desc && (
            <p className="mt-4 text-lg font-medium text-white/80">{category.short_desc}</p>
          )}
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />

      <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Subcategorias disponibles.
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>
          <p className="mb-10 text-lg font-semibold text-gray-500">
            Selecciona una subcategoria para ver productos.
          </p>

          <ProductSubcategoryGrid
            categorySlug={category.slug}
            subcategories={(subcategories as ProductSubcategoryCard[]) ?? []}
          />

          <div className="mt-10">
            <Link
              href="/equipos"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#132EEF] transition-colors hover:text-[#141E61]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a equipos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
