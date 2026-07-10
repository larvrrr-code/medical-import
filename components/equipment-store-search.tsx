"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Search } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const MAX_RESULTS = 8

export interface ProductSearchItem {
  id: number
  name: string
  brand?: string | null
  model?: string | null
  categorySlug: string
  subcategoryName: string
  subcategorySlug: string
}

interface Props {
  products: ProductSearchItem[]
}

export function EquipmentStoreSearch({ products }: Props) {
  const [query, setQuery] = useState("")
  const isMobile = useIsMobile()
  const q = query.trim().toLowerCase()

  const results = q
    ? products
        .filter((product) =>
          [
            product.name,
            product.brand,
            product.model,
            product.subcategoryName,
          ]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(q))
        )
        .slice(0, MAX_RESULTS)
    : []

  return (
    <div className="mx-auto mb-12 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          aria-label="Volver a inicio"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#141E61] text-white shadow-sm transition-colors hover:bg-[#0e1a50]"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </Link>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#132EEF]" />
          <input
            type="text"
            placeholder={isMobile ? "Buscar producto" : "Busca productos, marcas o modelos"}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-2xl border-2 border-[#132EEF]/20 bg-white py-5 pl-14 pr-14 text-lg font-semibold text-[#141E61] shadow-md outline-none transition-all placeholder:font-medium placeholder:text-gray-400 focus:border-[#132EEF] focus:shadow-lg focus:ring-4 focus:ring-[#132EEF]/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 transition-colors hover:text-[#141E61]"
            >
              x
            </button>
          )}
        </div>
      </div>

      {q && (
        <div className="mt-3 overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-lg">
          {results.length === 0 ? (
            <div className="px-6 py-5 text-sm font-medium text-gray-400">
              Sin resultados para &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul className="divide-y divide-[#EEEEEE]">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/equipos/${product.categorySlug}/${product.subcategorySlug}`}
                    className="group flex items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-[#F8F9FC]"
                  >
                    <div>
                      <p className="text-sm font-black text-[#141E61]">{product.name}</p>
                      <p className="mt-1 text-xs font-semibold text-gray-500">
                        {[product.brand, product.model].filter(Boolean).join(" · ") || "Producto"}
                      </p>
                      <p className="mt-1 text-xs font-medium text-gray-400">
                        Subcategoria: {product.subcategoryName}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[#132EEF] transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-[#EEEEEE] px-6 py-2.5">
            <p className="text-xs font-medium text-gray-400">
              {results.length} resultado{results.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
