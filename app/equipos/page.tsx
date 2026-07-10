import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EquipmentParentCards, type EquipmentCategoryCard } from "@/components/equipment-parent-cards"
import { EquipmentStoreSearch, type ProductSearchItem } from "@/components/equipment-store-search"
import { supabase } from "@/lib/supabaseClient"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Venta de equipos medicos | Medical Import",
  description:
    "Venta de equipos medicos nuevos y seminuevos para instituciones de salud en Mexico.",
}

interface ProductSubcategory {
  id: number
  name: string
  slug: string
  category_id: number
}

interface ProductRow {
  id: number
  name: string
  brand?: string | null
  model?: string | null
  subcategory_id: number
}

export default async function EquiposPage() {
  const [{ data: categories, error }, { data: subcategories }, { data: products }] = await Promise.all([
    supabase
      .from("service_categories")
      .select("id, name, slug, short_desc, image_url")
      .eq("service_id", 3)
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("product_subcategories")
      .select("id, name, slug, category_id")
      .eq("active", true)
      .order("name"),
    supabase
      .from("products")
      .select("id, name, brand, model, subcategory_id")
      .eq("active", true)
      .order("name"),
  ])

  const categoryRows = ((categories as EquipmentCategoryCard[]) ?? []).slice(0, 3)
  const categoryById = new Map(categoryRows.map((category) => [category.id, category]))
  const subcategoryRows = (subcategories as ProductSubcategory[]) ?? []
  const subcategoryById = new Map(subcategoryRows.map((subcategory) => [subcategory.id, subcategory]))

  const searchProducts: ProductSearchItem[] = ((products as ProductRow[]) ?? [])
    .map((product) => {
      const subcategory = subcategoryById.get(product.subcategory_id)
      const category = subcategory ? categoryById.get(subcategory.category_id) : undefined

      if (!subcategory || !category) return null

      return {
        id: product.id,
        name: product.name,
        brand: product.brand,
        model: product.model,
        categorySlug: category.slug,
        subcategoryName: subcategory.name,
        subcategorySlug: subcategory.slug,
      }
    })
    .filter(Boolean) as ProductSearchItem[]

  return (
    <>
      <Navbar />

      <section
        className="relative w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/Hospital-fake.png')" }}
      >
        <div className="absolute inset-0 bg-[#141E61]/65" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-32 text-center lg:pb-16 lg:pt-40">
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            Venta de Equipos Medicos
          </h1>
          <p className="mt-4 text-2xl font-black text-white/90 sm:text-3xl">
            Nuevos + Seminuevos + Catalogo Especializado
          </p>
        </div>
      </section>

      <div className="h-1 bg-gradient-to-r from-[#5DB6FA] via-[#132EEF] to-transparent" />

      <section className="w-full bg-[#F8F9FC] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-3">
            <h2 className="text-2xl font-black text-[#141E61] sm:text-3xl">
              Equipos disponibles.
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[#132EEF]" />
          </div>
          <p className="mb-10 text-lg font-semibold text-gray-500 sm:text-xl">
            Busca productos o selecciona una categoria para explorar el catalogo.
          </p>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4">
              <p className="text-sm font-semibold text-red-600">
                Error al cargar categorias. Por favor recarga la pagina.
              </p>
            </div>
          )}

          {!error && (
            <>
              <EquipmentStoreSearch products={searchProducts} />
              <EquipmentParentCards categories={categoryRows} />
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
