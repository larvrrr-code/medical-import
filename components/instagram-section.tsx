"use client"

import { useEffect } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "feed-id": string },
        HTMLElement
      >
    }
  }
}

export function InstagramSection() {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "module"
    script.src = "https://w.behold.so/widget.js"
    document.head.appendChild(script)
  }, [])

  return (
    <section className="w-full bg-white pb-16 pt-4 lg:pb-20 lg:pt-6">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="text-3xl font-black text-[#141E61] sm:text-4xl">
            Síguenos en Instagram
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#132EEF]" />
        </div>

        {/* Behold widget */}
        <behold-widget feed-id="0aGy3gGdfHwF2DkZQ20r" />

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://www.instagram.com/medical_import"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-[#EEEEEE] bg-white px-6 py-3 text-sm font-semibold text-[#141E61] shadow-sm transition-colors hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-[#141E61]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Ver más en Instagram
          </a>
        </div>

      </div>
    </section>
  )
}
