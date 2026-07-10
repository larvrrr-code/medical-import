import Image from "next/image"

type ClientsProps = {
  compact?: boolean
  showTitle?: boolean
}

const clients = [
  { name: "Clínica Guadalupe", src: "/Clínica Guadalupe.png", scaleClass: "scale-100 hover:scale-110" },
  { name: "Hospital Santa Maria Chapalita", src: "/Hospital Santa Maria Chapalita.png", scaleClass: "scale-110 hover:scale-125" },
  { name: "Hospitales Star Medica", src: "/Hospitales Star Medica.png", scaleClass: "scale-[1.85] hover:scale-[2.05]" },
  { name: "IMSS", src: "/IMSS.png", scaleClass: "scale-125 hover:scale-[1.38]" },
  { name: "ISSSTE", src: "/ISSSTE.png", scaleClass: "scale-150 hover:scale-[1.65]" },
  { name: "La Campina", src: "/La Campina.png", scaleClass: "scale-100 hover:scale-110" },
  { name: "MAC hospitales", src: "/MAC hospitales.png", scaleClass: "scale-100 hover:scale-110" },
  { name: "mit Hospital", src: "/mit Hospital.png", scaleClass: "scale-[1.35] hover:scale-150" },
  { name: "Secretaría de Salud", src: "/Secretaría de Salud.png", scaleClass: "scale-[1.55] hover:scale-[1.70]" },
]

export function Clients({ compact = false, showTitle = true }: ClientsProps) {
  const loopedClients = [...clients, ...clients]

  return (
    <section className={compact ? "w-full min-w-0 max-w-full" : "w-full min-w-0 max-w-full border-t border-gray bg-background py-16 lg:py-20"}>
      <div className={compact ? "w-full min-w-0 max-w-full" : "mx-auto w-full min-w-0 max-w-7xl px-6"}>
        {showTitle && (
          <p
            className={
              compact
                ? "mb-4 text-base font-black uppercase tracking-[0.22em] text-[#141E61]"
                : "mb-10 text-base font-black uppercase tracking-[0.22em] text-[#141E61]"
            }
          >
            Clientes que confían en nosotros
          </p>
        )}

        <div className="client-carousel-mask">
          <div className="client-carousel-track">
            {loopedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex h-[7.25rem] shrink-0 items-center justify-center px-7"
                title={client.name}
              >
                <Image
                  src={encodeURI(client.src)}
                  alt={client.name}
                  width={320}
                  height={128}
                  className={[
                    "h-[4.9rem] w-auto max-w-none object-contain grayscale opacity-60 transition-all duration-300 ease-in-out hover:grayscale-0 hover:opacity-100 lg:h-[5.4rem]",
                    client.scaleClass,
                  ].join(" ")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
