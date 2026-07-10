import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductCardGrid, type ProductCardItem } from "@/components/product-card-grid"
import { supabase } from "@/lib/supabaseClient"

export const revalidate = 3600

interface ServiceCategory {
  id: number
  name: string
  slug: string
}

interface ProductSubcategory {
  id: number
  name: string
  slug: string
  short_desc?: string | null
  image_url?: string | null
  category_id: number
}

async function fetchCategory(slug: string) {
  const { data, error } = await supabase
    .from("service_categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .eq("service_id", 3)
    .maybeSingle()

  if (error) console.error("[equipos/productos] category error:", JSON.stringify(error))
  return data as ServiceCategory | null
}

async function fetchSubcategory(categoryId: number, slug: string) {
  const { data, error } = await supabase
    .from("product_subcategories")
    .select("id, name, slug, short_desc, image_url, category_id")
    .eq("slug", slug)
    .eq("category_id", categoryId)
    .maybeSingle()

  if (error) console.error("[equipos/productos] subcategory error:", JSON.stringify(error))
  return data as ProductSubcategory | null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string; subcategoria: string }>
}): Promise<Metadata> {
  const { categoria, subcategoria } = await params
  const category = await fetchCategory(categoria)

  if (!category) return { title: "Subcategoria no encontrada | Medical Import" }

  const subcategory = await fetchSubcategory(category.id, subcategoria)
  if (!subcategory) return { title: "Subcategoria no encontrada | Medical Import" }

  return {
    title: `${subcategory.name} | Venta de equipos | Medical Import`,
    description:
      subcategory.short_desc ??
      `Productos de ${subcategory.name} disponibles para cotizacion en Medical Import.`,
  }
}

export async function generateStaticParams() {
  const [{ data: categories }, { data: subcategories, error }] = await Promise.all([
    supabase
      .from("service_categories")
      .select("id, slug")
      .eq("service_id", 3)
      .eq("active", true),
    supabase
      .from("product_subcategories")
      .select("slug, category_id")
      .eq("active", true),
  ])

  if (error) console.error("[generateStaticParams productos] error:", JSON.stringify(error))

  const categoryById = new Map(((categories as { id: number; slug: string }[]) ?? []).map((row) => [row.id, row.slug]))

  return ((subcategories as { slug: string; category_id: number }[]) ?? [])
    .map((subcategory) => {
      const categorySlug = categoryById.get(subcategory.category_id)
      if (!categorySlug) return null
      return { categoria: categorySlug, subcategoria: subcategory.slug }
    })
    .filter(Boolean) as { categoria: string; subcategoria: string }[]
}

export default async function EquiposSubcategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string; subcategoria: string }>
}) {
  const { categoria, subcategoria } = await params
  const category = await fetchCategory(categoria)

  if (!category) notFound()

  const subcategory = await fetchSubcategory(category.id, subcategoria)
  if (!subcategory) notFound()

  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, brand, model, condition, catalog_code, image_url")
    .eq("subcategory_id", subcategory.id)
    .eq("active", true)
    .order("name")

  if (error) console.error("[equipos/productos] products error:", JSON.stringify(error))

  return (
    <>
      <Navbar />

      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: subcategory.image_url ? `url('${subcategory.image_url}')` : "url('/Hospital-fake.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#141E61]/65" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 text-center lg:pb-16 lg:pt-40">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {subcategory.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-white/80">{category.name}</p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />

      <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Productos disponibles.
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>
          <p className="mb-10 text-lg font-semibold text-gray-500">
            Filtra productos y solicita cotizacion por WhatsApp.
          </p>

          <ProductCardGrid
            products={(products as ProductCardItem[]) ?? []}
            backHref={`/equipos/${category.slug}`}
          />

          <div className="mt-10">
            <Link
              href={`/equipos/${category.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#132EEF] transition-colors hover:text-[#141E61]"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a {category.name}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
