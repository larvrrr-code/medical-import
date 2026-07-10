"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Equipment {
  id: number
  name: string
  brands?: string[]
  service_detail?: string
}

export function EquipmentAccordion({ items }: { items: Equipment[] }) {
  const [open, setOpen] = useState<number | null>(null)

  if (!items.length) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border-2 border-dashed border-[#EEEEEE] bg-[#F8F9FC]">
        <p className="text-sm font-medium text-gray-300">Sin equipos registrados en esta categoría</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-[#EEEEEE] rounded-xl border border-[#EEEEEE] bg-white">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#F8F9FC]"
            >
              <div>
                <span className="text-base font-black text-[#141E61] sm:text-lg">{item.name}</span>
                {item.brands && item.brands.length > 0 && (
                  <span className="ml-3 text-sm font-medium text-gray-400">
                    {item.brands.join(" · ")}
                  </span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-[#132EEF] transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="border-t border-[#EEEEEE] px-6 py-5">
                {item.service_detail && (
                  <p className="text-sm font-medium leading-relaxed text-gray-600">{item.service_detail}</p>
                )}
                {item.brands && item.brands.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <p className="w-full text-xs font-bold uppercase tracking-widest text-[#132EEF]">Marcas</p>
                    {item.brands.map((brand) => (
                      <span
                        key={brand}
                        className="rounded-full border border-[#EEEEEE] bg-[#F8F9FC] px-3 py-1 text-xs font-semibold text-[#141E61]"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
