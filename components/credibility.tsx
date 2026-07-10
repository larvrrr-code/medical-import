import { CountUp } from "@/components/count-up"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"

export function CredibilitySection() {
  return (
    <section className="w-full bg-[radial-gradient(circle_at_18%_35%,rgba(19,46,239,0.26)_0%,rgba(19,46,239,0.10)_24%,rgba(20,30,97,0)_42%),linear-gradient(135deg,#141E61_0%,#111A58_52%,#17236B_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="flex flex-col justify-center">
            <CountUp
              end={1000}
              suffix="+"
              className="font-black leading-none text-[#5DB6FA]"
              style={{ fontSize: "clamp(96px, 10vw, 140px)" }}
            />
            <div className="mt-3">
              <p className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                Clientes satisfechos
              </p>
              <p className="text-2xl font-bold leading-snug text-white sm:text-3xl">
                en todo México.
              </p>
            </div>
            <p className="mt-5 text-sm font-medium text-[#5DB6FA]">
              Instituciones públicas y privadas que confían en nosotros para mantener operativas sus áreas más críticas.
            </p>
          </div>

          <div className="lg:col-span-2">
            <TestimonialsCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
