const logos = [
  { src: "/cofepris.png", alt: "COFEPRIS" },
  { src: "/fda.png", alt: "FDA" },
  { src: "/nom.png", alt: "NOM" },
  { src: "/nfpa.png", alt: "NFPA" },
  { src: "/iso.png", alt: "ISO" },
  { src: "/salubridad.png", alt: "Salubridad" },
]

export function NormativasSection() {
  return (
    <section className="w-full bg-[#EEEEEE] py-12">
      <style>
        {`
          @keyframes normativaLogoIn {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[35%_1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[#141E61] sm:text-4xl">
              Cumplimiento normativo garantizado.
            </h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-[#666666] sm:text-lg">
              Cada proyecto que realizamos cumple con las normas oficiales vigentes aplicables al sector salud en México.
            </p>
          </div>

          <div className="grid grid-cols-6 overflow-hidden border-l-2 border-[#CBE9FF]">
            <LogoCell
              src={logos[1].src}
              alt={logos[1].alt}
              className="col-span-2 border-b-2 border-[#CBE9FF]"
              delay={0}
            />
            <LogoCell
              src={logos[2].src}
              alt={logos[2].alt}
              className="col-span-2 border-b-2 border-[#CBE9FF]"
              delay={120}
            />
            <LogoCell
              src={logos[3].src}
              alt={logos[3].alt}
              className="col-span-2 border-b-2 border-[#CBE9FF]"
              delay={240}
            />
            <LogoCell
              src={logos[0].src}
              alt={logos[0].alt}
              className="col-span-2"
              imageClassName="max-h-[72px] max-w-[95%] sm:max-h-[82px]"
              delay={360}
            />
            <LogoCell
              src={logos[4].src}
              alt={logos[4].alt}
              className="col-span-2"
              delay={480}
            />
            <LogoCell
              src={logos[5].src}
              alt={logos[5].alt}
              className="col-span-2"
              delay={600}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoCell({
  src,
  alt,
  className = "",
  imageClassName = "max-h-[58px] max-w-[84%] sm:max-h-[70px]",
  delay = 0,
}: {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  delay?: number
}) {
  return (
    <div
      className={`flex min-h-[124px] items-center justify-center px-6 py-8 opacity-0 sm:min-h-[140px] sm:px-8 sm:py-9 ${className}`}
      style={{
        animation: "normativaLogoIn 0.6s ease forwards",
        animationDelay: `${delay}ms`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`${imageClassName} object-contain transition duration-300 hover:scale-110 hover:drop-shadow-[0_0_18px_rgba(93,182,250,0.75)]`}
      />
    </div>
  )
}
