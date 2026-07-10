"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

interface Equipment {
  id: number
  name: string
  slug?: string
  brands?: string[]
  service_detail?: string
}

interface Props {
  items: Equipment[]
  categoryName: string
  categorySlug: string
}

export function EquipmentSearchList({ items, categoryName, categorySlug }: Props) {
  const [query, setQuery] = useState("")
  const isMobile = useIsMobile()

  const filtered = query.trim()
    ? items.filter(
        (eq) =>
          eq.name.toLowerCase().includes(query.toLowerCase()) ||
          eq.brands?.some((b) => b.toLowerCase().includes(query.toLowerCase())) ||
          eq.service_detail?.toLowerCase().includes(query.toLowerCase())
      )
    : items

  return (
    <div>
      {/* ── Barra protagonista ── */}
      <div className="mx-auto mb-12 max-w-2xl">
        <div className="flex items-center gap-3">

          {/* Botón volver */}
          <Link
            href="/mantenimiento"
            aria-label="Volver a categorías"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#141E61] text-white shadow-sm transition-colors hover:bg-[#0e1a50]"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </Link>

          {/* Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#132EEF]" />
            <input
              type="text"
              placeholder={isMobile ? "Buscar en categoría" : "¿Qué equipo estás buscando?"}
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

        {/* Rutas clickeables */}
        {query.trim() && (
          <div className="mt-3 overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-lg">
            {filtered.length === 0 ? (
              <div className="px-6 py-5 text-sm font-medium text-gray-400">
                Sin resultados para &ldquo;{query}&rdquo;
              </div>
            ) : (
              <ul className="divide-y divide-[#EEEEEE]">
                {filtered.map((eq) => (
                  <li key={eq.id}>
                    <Link
                      href={eq.slug ? `/mantenimiento/${categorySlug}/${eq.slug}` : `/mantenimiento/${categorySlug}`}
                      className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-[#F8F9FC]"
                    >
                      <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-gray-400">
                        <span>Inicio</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                        <span>Mantenimiento</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                        <span>{categoryName}</span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-bold text-[#141E61]">{eq.name}</span>
                      </div>
                      <ChevronRight className="ml-2 h-4 w-4 shrink-0 text-[#132EEF] transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {filtered.length > 0 && (
              <div className="border-t border-[#EEEEEE] px-6 py-2.5">
                <p className="text-xs font-medium text-gray-400">
                  {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Lista de equipos (estado sin búsqueda) ── */}
      {!query.trim() && (
        items.length === 0 ? (
          <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-[#EEEEEE] bg-white">
            <p className="text-sm font-medium text-gray-300">Sin equipos registrados en esta categoría</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.slug ? `/mantenimiento/${categorySlug}/${item.slug}` : `/mantenimiento/${categorySlug}`}
                className="group flex items-stretch overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#141E61]/20 hover:shadow-md"
              >
                {/* Texto */}
                <div className="flex flex-1 flex-col justify-center px-6 py-5">
                  <span className="text-base font-black text-[#141E61] sm:text-lg">{item.name}</span>
                  {item.brands && item.brands.length > 0 && (
                    <span className="mt-1 text-sm font-medium text-gray-400">
                      {item.brands.join(" · ")}
                    </span>
                  )}
                </div>

                {/* Bloque flecha */}
                <div className="flex w-14 shrink-0 items-center justify-center bg-[#F8F9FC] transition-colors duration-200 group-hover:bg-[#141E61]">
                  <ChevronRight className="h-5 w-5 text-[#141E61] transition-colors duration-200 group-hover:text-white" />
                </div>
              </Link>
            ))}
          </div>
        )
      )}
    </div>
  )
}
