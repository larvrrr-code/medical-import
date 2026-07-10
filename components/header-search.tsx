"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

const MAX_RESULTS = 8

type SearchKind = "Compra" | "Mantenimiento" | "Renta"

interface SearchItem {
  id: string
  title: string
  subtitle: string
  href: string
  kind: SearchKind
  terms: string
}

const rentalItems: SearchItem[] = [
  {
    id: "renta-hill-rom-advance-6-posiciones",
    title: "Hill-Rom Advance 6 posiciones",
    subtitle: "Cama hospitalaria en renta",
    href: "/rentas",
    kind: "Renta",
    terms: "hill-rom hill rom advance 6 posiciones cama hospitalaria renta",
  },
  {
    id: "renta-hill-rom-advance-clasica",
    title: "Hill-Rom Advance clasica",
    subtitle: "Cama hospitalaria en renta",
    href: "/rentas",
    kind: "Renta",
    terms: "hill-rom hill rom advance clasica cama hospitalaria renta",
  },
  {
    id: "renta-stryker-secure-ii",
    title: "Stryker Secure II",
    subtitle: "Cama hospitalaria en renta",
    href: "/rentas",
    kind: "Renta",
    terms: "stryker secure ii cama hospitalaria renta",
  },
  {
    id: "renta-stryker-electrica-3-posiciones",
    title: "Stryker Electrica 3 posiciones",
    subtitle: "Cama hospitalaria en renta",
    href: "/rentas",
    kind: "Renta",
    terms: "stryker electrica 3 posiciones cama hospitalaria renta",
  },
  {
    id: "renta-stryker-semi-electrica",
    title: "Stryker Semi-electrica",
    subtitle: "Cama hospitalaria en renta",
    href: "/rentas",
    kind: "Renta",
    terms: "stryker semi electrica cama hospitalaria renta",
  },
]

function kindClassName(kind: SearchKind) {
  if (kind === "Compra") return "bg-[#E8F2FF] text-[#132EEF]"
  if (kind === "Mantenimiento") return "bg-[#EEF3FA] text-[#141E61]"
  return "bg-[#E8F8EF] text-[#157A3F]"
}

interface Props {
  onNavigate?: () => void
  className?: string
}

export function HeaderSearch({ onNavigate, className = "" }: Props) {
  const [query, setQuery] = useState("")
  const [items, setItems] = useState<SearchItem[]>(rentalItems)

  useEffect(() => {
    let ignore = false

    async function loadSearchItems() {
      const [
        { data: maintenanceEquipment },
        { data: productCategories },
        { data: productSubcategories },
        { data: products },
      ] = await Promise.all([
        supabase
          .from("category_equipment")
          .select("id, name, slug, brands, service_categories(name, slug)")
          .eq("active", true)
          .order("name"),
        supabase
          .from("service_categories")
          .select("id, name, slug")
          .eq("service_id", 3)
          .eq("active", true),
        supabase
          .from("product_subcategories")
          .select("id, name, slug, category_id")
          .eq("active", true),
        supabase
          .from("products")
          .select("id, name, brand, model, subcategory_id")
          .eq("active", true)
          .order("name"),
      ])

      const categoryById = new Map(
        ((productCategories as { id: number; name: string; slug: string }[]) ?? []).map((category) => [
          category.id,
          category,
        ])
      )
      const subcategoryById = new Map(
        ((productSubcategories as { id: number; name: string; slug: string; category_id: number }[]) ?? []).map(
          (subcategory) => [subcategory.id, subcategory]
        )
      )

      const maintenanceItems: SearchItem[] = ((maintenanceEquipment as any[]) ?? []).map((equipment) => ({
        id: `mantenimiento-${equipment.id}`,
        title: equipment.name,
        subtitle: `Servicio de mantenimiento · ${equipment.service_categories?.name ?? "Categoria"}`,
        href: `/mantenimiento/${equipment.service_categories?.slug}/${equipment.slug}`,
        kind: "Mantenimiento",
        terms: [equipment.name, equipment.brands?.join(" "), equipment.service_categories?.name, "mantenimiento"]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      }))

      const saleItems: SearchItem[] = ((products as any[]) ?? [])
        .map((product) => {
          const subcategory = subcategoryById.get(product.subcategory_id)
          const category = subcategory ? categoryById.get(subcategory.category_id) : undefined
          if (!subcategory || !category) return null

          return {
            id: `venta-${product.id}`,
            title: product.name,
            subtitle: [product.brand, product.model, subcategory.name].filter(Boolean).join(" · "),
            href: `/equipos/${category.slug}/${subcategory.slug}`,
            kind: "Compra" as SearchKind,
            terms: [product.name, product.brand, product.model, subcategory.name, category.name, "venta equipos"]
              .filter(Boolean)
              .join(" ")
              .toLowerCase(),
          }
        })
        .filter(Boolean) as SearchItem[]

      if (!ignore) setItems([...saleItems, ...maintenanceItems, ...rentalItems])
    }

    loadSearchItems()

    return () => {
      ignore = true
    }
  }, [])

  const q = query.trim().toLowerCase()
  const results = useMemo(
    () => (q ? items.filter((item) => item.terms.includes(q) || item.title.toLowerCase().includes(q)).slice(0, MAX_RESULTS) : []),
    [items, q]
  )

  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#132EEF]" />
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="¿Qué estás buscando?"
        className="h-10 w-full rounded-xl border border-[#132EEF]/20 bg-white/90 pl-9 pr-8 text-sm font-semibold text-[#141E61] shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#132EEF] focus:ring-4 focus:ring-[#132EEF]/10"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400 hover:text-[#141E61]"
        >
          x
        </button>
      )}

      {q && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-lg shadow-[#141E61]/12">
          {results.length === 0 ? (
            <div className="px-4 py-4 text-sm font-semibold text-gray-400">Sin resultados</div>
          ) : (
            <ul className="max-h-[420px] divide-y divide-[#EEEEEE] overflow-y-auto">
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setQuery("")
                      onNavigate?.()
                    }}
                    className="block px-4 py-3 transition-colors hover:bg-[#F8F9FC]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="min-w-0 flex-1 truncate text-sm font-black text-[#141E61]">{item.title}</p>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black ${kindClassName(item.kind)}`}>
                        {item.kind}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs font-semibold text-gray-500">{item.subtitle}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
