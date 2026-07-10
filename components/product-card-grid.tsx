"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronRight, Search, Stethoscope } from "lucide-react"

const PRODUCTS_PER_PAGE = 6

export interface ProductCardItem {
  id: number
  name: string
  brand?: string | null
  model?: string | null
  condition?: string | null
  catalog_code?: string | null
  image_url?: string | null
}

interface Props {
  products: ProductCardItem[]
  backHref: string
}

function getWhatsAppMessage(product: ProductCardItem) {
  return encodeURIComponent(
    `Hola, me interesa el producto: ${[product.name, product.brand, product.model]
      .filter(Boolean)
      .join(" ")}`
  )
}

export function ProductCardGrid({ products, backHref }: Props) {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const q = query.trim().toLowerCase()

  const filteredProducts = useMemo(
    () =>
      q
        ? products.filter((product) =>
            [
              product.name,
              product.brand,
              product.model,
              product.catalog_code,
            ]
              .filter(Boolean)
              .some((value) => value!.toLowerCase().includes(q))
          )
        : products,
    [products, q]
  )
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const currentPage = Math.min(page, totalPages || 1)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const pagination = totalPages > 1 && (
    <div className="flex flex-wrap items-center justify-center gap-2">
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
  )

  return (
    <div>
      <div className="mx-auto mb-10 max-w-2xl">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            aria-label="Volver a subcategorias"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#141E61] text-white shadow-sm transition-colors hover:bg-[#132EEF]"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </Link>

          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-[#132EEF]" />
            <input
              type="text"
              placeholder="Buscar producto en esta subcategoria"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              className="w-full rounded-2xl border-2 border-[#132EEF]/20 bg-white py-5 pl-14 pr-14 text-lg font-semibold text-[#141E61] shadow-md outline-none transition-all placeholder:font-medium placeholder:text-gray-400 focus:border-[#132EEF] focus:shadow-lg focus:ring-4 focus:ring-[#132EEF]/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("")
                  setPage(1)
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 transition-colors hover:text-[#141E61]"
              >
                x
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-[#EEEEEE] bg-white px-6 py-10 text-center">
          <p className="text-sm font-semibold text-gray-500">No encontramos productos con esa busqueda.</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            {pagination}
            {totalPages > 1 && (
              <p className="mt-3 text-center text-xs font-semibold text-gray-400">
                Pagina {currentPage} de {totalPages}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {paginatedProducts.map((product) => (
              <article
                key={product.id}
                className="flex overflow-hidden rounded-xl border border-[#EEEEEE] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#132EEF]/20 hover:shadow-md"
              >
                <div className="flex w-full flex-col">
                  <div className="relative aspect-square bg-[#EEF3FA]">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-contain p-6"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#132EEF]">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
                          <Stethoscope className="h-10 w-10" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex min-h-6 flex-wrap items-start gap-2">
                      {product.brand && (
                        <span className="rounded-full bg-[#E8F2FF] px-3 py-1 text-xs font-black text-[#141E61]">
                          {product.brand}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-xl font-black leading-tight text-[#141E61]">
                      {product.name}
                    </h3>
                    {product.model && (
                      <p className="mt-1 text-sm font-bold text-gray-500">{product.model}</p>
                    )}
                    {product.catalog_code && (
                      <p className="mt-3 text-xs font-semibold text-gray-400">
                        Codigo de catalogo: {product.catalog_code}
                      </p>
                    )}

                    <div className="mt-auto pt-6">
                      <a
                        href={`https://wa.me/524499904670?text=${getWhatsAppMessage(product)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#141E61] px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#132EEF]"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Solicitar cotizacion
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10">
            {pagination}
            {totalPages > 1 && (
              <p className="mt-3 text-center text-xs font-semibold text-gray-400">
                Pagina {currentPage} de {totalPages}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
