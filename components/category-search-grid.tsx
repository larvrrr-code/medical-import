"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

const MAX_RESULTS = 5
const CATEGORIES_PER_PAGE = 9

interface Category {
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

interface Props {
  categories: Category[]
  equipment: EquipmentItem[]
}

export function CategorySearchGrid({ categories, equipment }: Props) {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const isMobile = useIsMobile()
  const q = query.trim().toLowerCase()

  const filteredCats = q
    ? categories.filter(
        (c) => c.name.toLowerCase().includes(q) || c.short_desc?.toLowerCase().includes(q)
      )
    : categories

  const filteredEq = q
    ? equipment.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.service_categories?.name.toLowerCase().includes(q)
      )
    : []

  const showDropdown = q.length > 0
  const catSlice = filteredCats.slice(0, MAX_RESULTS)
  const eqSlice = filteredEq.slice(0, MAX_RESULTS)
  const hasResults = catSlice.length > 0 || eqSlice.length > 0
  const totalPages = Math.ceil(categories.length / CATEGORIES_PER_PAGE)
  const currentPage = Math.min(page, totalPages || 1)
  const paginatedCategories = categories.slice(
    (currentPage - 1) * CATEGORIES_PER_PAGE,
    currentPage * CATEGORIES_PER_PAGE
  )

  return (
    <div>
      {/* ── Barra protagonista ── */}
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="flex items-center gap-3">

          {/* Botón volver */}
          <Link
            href="/"
            aria-label="Volver a inicio"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#141E61] text-white shadow-sm transition-colors hover:bg-[#0e1a50]"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </Link>

          {/* Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#132EEF]" />
            <input
              type="text"
              placeholder={isMobile ? "Buscar equipo" : "¿Para qué equipo requieres mantenimiento?"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-[#132EEF]/20 bg-white py-5 pl-14 pr-14 text-lg font-semibold text-[#141E61] shadow-md outline-none transition-all placeholder:font-medium placeholder:text-gray-400 focus:border-[#132EEF] focus:shadow-lg focus:ring-4 focus:ring-[#132EEF]/10"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 transition-colors hover:text-[#141E61]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dropdown de resultados agrupados */}
        {showDropdown && (
          <div className="mt-3 overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-lg">
            {!hasResults ? (
              <div className="px-6 py-5 text-sm font-medium text-gray-400">
                Sin resultados para &ldquo;{query}&rdquo;
              </div>
            ) : (
              <>
                {/* Categorías */}
                {catSlice.length > 0 && (
                  <div>
                    <p className="px-6 pt-4 pb-2 text-xs font-bold uppercase tracking-widest text-[#132EEF]">
                      Categorías
                    </p>
                    <ul className="divide-y divide-[#EEEEEE]">
                      {catSlice.map((cat) => (
                        <li key={cat.id}>
                          <Link
                            href={`/mantenimiento/${cat.slug}`}
                            className="group flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-[#F8F9FC]"
                          >
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-400">
                              <span>Inicio</span>
                              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                              <span>Mantenimiento</span>
                              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                              <span className="font-bold text-[#141E61]">{cat.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 shrink-0 text-[#132EEF] transition-transform duration-200 group-hover:translate-x-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {filteredCats.length > MAX_RESULTS && (
                      <p className="px-6 py-2 text-xs font-medium text-gray-400">
                        +{filteredCats.length - MAX_RESULTS} categorías más
                      </p>
                    )}
                  </div>
                )}

                {/* Separador entre secciones */}
                {catSlice.length > 0 && eqSlice.length > 0 && (
                  <div className="border-t border-[#EEEEEE]" />
                )}

                {/* Equipos */}
                {eqSlice.length > 0 && (
                  <div>
                    <p className="px-6 pt-4 pb-2 text-xs font-bold uppercase tracking-widest text-[#132EEF]">
                      Equipos
                    </p>
                    <ul className="divide-y divide-[#EEEEEE]">
                      {eqSlice.map((eq) => (
                        <li key={eq.id}>
                          <Link
                            href={`/mantenimiento/${eq.service_categories?.slug}/${eq.slug}`}
                            className="group flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-[#F8F9FC]"
                          >
                            <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-gray-400">
                              <span>Inicio</span>
                              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                              <span>Mantenimiento</span>
                              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                              <span>{eq.service_categories?.name}</span>
                              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                              <span className="font-bold text-[#141E61]">{eq.name}</span>
                            </div>
                            <ChevronRight className="ml-2 h-4 w-4 shrink-0 text-[#132EEF] transition-transform duration-200 group-hover:translate-x-1" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {filteredEq.length > MAX_RESULTS && (
                      <p className="px-6 py-2 text-xs font-medium text-gray-400">
                        +{filteredEq.length - MAX_RESULTS} equipos más
                      </p>
                    )}
                  </div>
                )}
              </>
            )}

            <div className="border-t border-[#EEEEEE] px-6 py-2.5">
              <p className="text-xs font-medium text-gray-400">
                {catSlice.length + eqSlice.length} resultado{catSlice.length + eqSlice.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Grid de categorías (sin búsqueda) ── */}
      {!query.trim() && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/mantenimiento/${cat.slug}`}
              className="group flex flex-col rounded-xl border border-[#EEEEEE] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#132EEF]/20 hover:shadow-md"
            >
              {cat.image_url && (
                <div className="h-44 w-full overflow-hidden rounded-t-xl">
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
                <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-1 items-center">
                  <h3 className="text-2xl font-black leading-tight text-[#141E61] sm:text-3xl">{cat.name}</h3>
                </div>
                <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#132EEF] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 group-hover:bg-[#141E61]">
                  Ver equipos
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                aria-label="Página anterior"
                disabled={currentPage === 1}
                onClick={() => setPage((value) => Math.max(value - 1, 1))}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#132EEF]/20 bg-white text-[#141E61] shadow-sm transition-colors hover:border-[#132EEF] hover:text-[#132EEF] disabled:cursor-not-allowed disabled:border-[#EEEEEE] disabled:text-gray-300"
              >
                <ChevronRight className="h-5 w-5 rotate-180" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  aria-label={`Ir a página ${pageNumber}`}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  onClick={() => setPage(pageNumber)}
                  className={`h-11 min-w-11 rounded-lg px-4 text-sm font-black shadow-sm transition-colors ${
                    pageNumber === currentPage
                      ? "bg-[#132EEF] text-white"
                      : "border border-[#132EEF]/20 bg-white text-[#141E61] hover:border-[#132EEF] hover:text-[#132EEF]"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                type="button"
                aria-label="Página siguiente"
                disabled={currentPage === totalPages}
                onClick={() => setPage((value) => Math.min(value + 1, totalPages))}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#132EEF]/20 bg-white text-[#141E61] shadow-sm transition-colors hover:border-[#132EEF] hover:text-[#132EEF] disabled:cursor-not-allowed disabled:border-[#EEEEEE] disabled:text-gray-300"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
