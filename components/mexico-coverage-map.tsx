"use client"

import { useMemo, useState } from "react"
import mexicoMap from "@/components/mexico-map-data"

const activeStateIds = new Set([
  "hid",
  "cmx",
  "mex",
  "gua",
  "zac",
  "jal",
  "slp",
  "agu",
  "mor",
  "coa",
  "que",
])

const activeStateNames = [
  "Hidalgo",
  "CDMX",
  "Estado de México",
  "Guanajuato",
  "Zacatecas",
  "Jalisco",
  "San Luis Potosí",
  "Aguascalientes",
  "Morelos",
  "Coahuila",
  "Querétaro",
]

type MapLocation = {
  id: string
  name: string
  path: string
}

function displayName(name: string) {
  if (name === "Mexico City") return "CDMX"
  if (name === "México") return "Estado de México"
  return name
}

export function MexicoCoverageMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [pinnedId, setPinnedId] = useState<string | null>(null)

  const locations = mexicoMap.locations as MapLocation[]
  const activeDisplayId = pinnedId ?? selectedId
  const selectedState = useMemo(
    () => locations.find((state) => state.id === activeDisplayId),
    [locations, activeDisplayId]
  )
  const visibleLocations = activeDisplayId
    ? [
        ...locations.filter((state) => state.id !== activeDisplayId),
        ...locations.filter((state) => state.id === activeDisplayId),
      ]
    : locations

  return (
    <div className="w-full" onClick={() => setPinnedId(null)}>
      <div className="relative overflow-hidden rounded-xl border border-[#DDE8F7] bg-white p-4 shadow-sm shadow-[#141E61]/6 sm:p-6">
        <div className="min-h-9 text-center text-2xl font-black text-[#132EEF] sm:text-3xl">
          {selectedState ? displayName(selectedState.name) : ""}
        </div>

        <svg
          viewBox={mexicoMap.viewBox}
          role="img"
          aria-label="Mapa de México con estados donde Medical Import tiene presencia activa"
          className="h-auto w-full origin-center scale-[1.08]"
        >
          <g>
            {visibleLocations.map((state) => {
              const isActive = activeStateIds.has(state.id)
              const isSelected = activeDisplayId === state.id

              return (
                <path
                  key={state.id}
                  d={state.path}
                  tabIndex={isActive ? 0 : -1}
                  role={isActive ? "button" : "img"}
                  aria-label={displayName(state.name)}
                  onMouseEnter={() => isActive && !pinnedId && setSelectedId(state.id)}
                  onMouseLeave={() => isActive && !pinnedId && setSelectedId(null)}
                  onFocus={() => isActive && !pinnedId && setSelectedId(state.id)}
                  onBlur={() => isActive && !pinnedId && setSelectedId(null)}
                  onClick={(event) => {
                    if (!isActive) return
                    event.stopPropagation()
                    setPinnedId(state.id)
                    setSelectedId(null)
                  }}
                  className={[
                    "stroke-[#9CA8BA] stroke-[1.1] outline-none transition-all duration-300 ease-out",
                    isActive
                      ? "cursor-pointer fill-[#141E61] hover:fill-[#132EEF] focus-visible:fill-[#132EEF]"
                      : "fill-white",
                    isSelected ? "fill-[#132EEF] drop-shadow-[0_14px_22px_rgba(19,46,239,0.55)]" : "",
                  ].join(" ")}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transform: isSelected ? "translateY(-8px) scale(1.055)" : undefined,
                  }}
                />
              )
            })}
          </g>
        </svg>

      </div>

      <div className="mt-5">
        <p className="mt-2 text-sm font-medium leading-relaxed text-gray-500">
          Medical Import opera en {activeStateNames.join(", ")}.
        </p>
      </div>
    </div>
  )
}
