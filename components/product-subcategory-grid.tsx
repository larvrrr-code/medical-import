"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SUBCATEGORIES_PER_PAGE = 9

export interface ProductSubcategoryCard {
  id: number
  name: string
  slug: string
  short_desc?: string | null
  image_url?: string | null
}

interface Props {
  categorySlug: string
  subcategories: ProductSubcategoryCard[]
}

export function ProductSubcategoryGrid({ categorySlug, subcategories }: Props) {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(subcategories.length / SUBCATEGORIES_PER_PAGE)
  const currentPage = Math.min(page, totalPages || 1)
  const paginatedSubcategories = subcategories.slice(
    (currentPage - 1) * SUBCATEGORIES_PER_PAGE,
    currentPage * SUBCATEGORIES_PER_PAGE
  )

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedSubcategories.map((subcategory) => (
          <Link
            key={subcategory.id}
            href={`/equipos/${categorySlug}/${subcategory.slug}`}
            className="group flex flex-col rounded-xl border border-[#EEEEEE] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#132EEF]/20 hover:shadow-md"
          >
            {subcategory.image_url && (
              <div className="h-44 w-full overflow-hidden rounded-t-xl">
                <img
                  src={subcategory.image_url}
                  alt={subcategory.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="flex flex-1 items-center">
                <h3 className="text-2xl font-black leading-tight text-[#141E61] sm:text-3xl">
                  {subcategory.name}
                </h3>
              </div>
              <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg bg-[#132EEF] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors duration-200 group-hover:bg-[#141E61]">
                Ver productos
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
            aria-label="Pagina anterior"
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
              aria-label={`Ir a pagina ${pageNumber}`}
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
            aria-label="Pagina siguiente"
            disabled={currentPage === totalPages}
            onClick={() => setPage((value) => Math.min(value + 1, totalPages))}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#132EEF]/20 bg-white text-[#141E61] shadow-sm transition-colors hover:border-[#132EEF] hover:text-[#132EEF] disabled:cursor-not-allowed disabled:border-[#EEEEEE] disabled:text-gray-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}
