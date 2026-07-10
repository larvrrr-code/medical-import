"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"

export function CTASection() {
  const [formData, setFormData] = useState({
    nombre: "",
    institucion: "",
    telefono: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section id="contacto" className="w-full scroll-mt-24 bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center lg:mb-12">
          <h2 className="text-3xl font-black text-[#141E61] sm:text-4xl lg:text-5xl">
            Estamos listos para atenderte
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#132EEF]" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-xl bg-[radial-gradient(circle_at_18%_18%,rgba(93,182,250,0.20)_0%,rgba(93,182,250,0.08)_28%,rgba(20,30,97,0)_48%),linear-gradient(135deg,#141E61_0%,#101858_54%,#17236B_100%)] p-8 lg:p-10">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#5DB6FA]">
              Contáctanos
            </span>

            <h3 className="mt-4 text-2xl font-black leading-snug text-white lg:text-3xl">
              ¿Listo para equipar tu institución?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#CBE9FF] lg:text-base">
              Nuestro equipo de especialistas está disponible para asesorarte, sin compromiso.
              Cuéntanos qué necesitas y te respondemos rápido.
            </p>

            <div className="my-7 h-px w-full bg-white/15" />

            <div className="flex flex-col gap-4">
              <a
                href="tel:+524499904670"
                className="group flex items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-[#5DB6FA]/20 group-hover:shadow-[0_0_18px_rgba(93,182,250,0.55)]">
                  <Phone className="h-5 w-5 text-[#5DB6FA]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#CBE9FF]">Llámanos</p>
                  <p className="text-lg font-black text-white">449 990 4670</p>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/place/Medical+Import/data=!4m2!3m1!1s0x0:0x73d7431faabbc954?sa=X&ved=1t:2428&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-[#5DB6FA]/20 group-hover:shadow-[0_0_18px_rgba(93,182,250,0.55)]">
                  <MapPin className="h-5 w-5 text-[#5DB6FA]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#CBE9FF]">Ubicación</p>
                  <p className="text-sm font-semibold leading-relaxed text-white">
                    Av. Aguascalientes Oriente 2077, Lomas de Santa Anita, Ags. 20164
                  </p>
                </div>
              </a>

              <a
                href="mailto:info@medicalimport.mx"
                className="group flex items-center gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition group-hover:bg-[#5DB6FA]/20 group-hover:shadow-[0_0_18px_rgba(93,182,250,0.55)]">
                  <Mail className="h-5 w-5 text-[#5DB6FA]" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#CBE9FF]">Correo</p>
                  <p className="text-sm font-black text-white">
                    info@medicalimport.mx
                  </p>
                </div>
              </a>
            </div>

            <a
              href="https://wa.me/524499904670?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-white transition-opacity hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </div>

          <div className="flex flex-col rounded-xl border border-[#EEEEEE] bg-white p-8 lg:p-10">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#132EEF]">
              Solicitar cotización
            </span>

            <h3 className="mt-4 text-2xl font-black leading-snug text-[#141E61] lg:text-3xl">
              Cuéntanos qué necesitas
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Completa el formulario y te contactamos en menos de 24 horas.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="nombre" className="text-xs font-semibold text-[#141E61]">
                  Nombre completo
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Ej. Dr. Juan Pérez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="rounded-lg border border-[#EEEEEE] bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#132EEF] focus:ring-2 focus:ring-[#132EEF]/15 placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="institucion" className="text-xs font-semibold text-[#141E61]">
                  Institución u hospital
                </label>
                <input
                  id="institucion"
                  type="text"
                  placeholder="Ej. IMSS, Hospital Privado..."
                  value={formData.institucion}
                  onChange={(e) => setFormData({ ...formData, institucion: e.target.value })}
                  className="rounded-lg border border-[#EEEEEE] bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#132EEF] focus:ring-2 focus:ring-[#132EEF]/15 placeholder:text-gray-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="telefono" className="text-xs font-semibold text-[#141E61]">
                  Teléfono de contacto
                </label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="Ej. 449 123 4567"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="rounded-lg border border-[#EEEEEE] bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#132EEF] focus:ring-2 focus:ring-[#132EEF]/15 placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] py-3.5 text-sm font-bold text-white shadow-md shadow-[#132EEF]/12 transition-all hover:from-[#2F47EA] hover:via-[#132EEF] hover:to-[#1028D6] hover:shadow-lg hover:shadow-[#132EEF]/18"
              >
                Enviar solicitud
              </button>

              <p className="text-center text-[11px] leading-relaxed text-gray-400">
                Al enviar este formulario aceptas que nos comuniquemos contigo para atender tu solicitud. No compartimos tu información con terceros.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
