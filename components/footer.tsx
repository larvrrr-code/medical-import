import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/equipos", label: "Equipos" },
  { href: "/mantenimiento", label: "Mantenimiento" },
  { href: "/obra-civil", label: "Obra Civil" },
  { href: "/rentas", label: "Rentas" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

const serviceLinks = [
  { href: "/equipos", label: "Venta de equipos" },
  { href: "/rentas", label: "Renta hospitalaria" },
  { href: "/mantenimiento", label: "Mantenimiento" },
  { href: "/obra-civil", label: "Obra civil hospitalaria" },
]

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.121 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.376-.505a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="w-full bg-[#141E61]">
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">

        {/* Four columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Column 1 — Brand */}
          <div className="flex flex-col items-center gap-5 text-center">
            <Image
              src="/logo-medical-import-white.png"
              alt="Medical Import"
              width={260}
              height={79}
              className="h-auto w-[260px] max-w-full object-contain"
            />
            <div className="flex items-center gap-6">
              <a
                href="https://www.tiktok.com/@medical.import.ags"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-white transition-colors duration-300 hover:text-[#5DB6FA]"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://www.instagram.com/medical_import/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white transition-colors duration-300 hover:text-[#5DB6FA]"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/miequipamientomedico"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white transition-colors duration-300 hover:text-[#5DB6FA]"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.youtube.com/@MedicalImportMX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white transition-colors duration-300 hover:text-[#5DB6FA]"
              >
                <YouTubeIcon />
              </a>
              <a
                href="https://mx.linkedin.com/company/medical-import"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white transition-colors duration-300 hover:text-[#5DB6FA]"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Column 2 — Navegación */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5DB6FA]">
              Navegación
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white transition-colors duration-300 hover:text-[#5DB6FA]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Servicios */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5DB6FA]">
              Servicios
            </p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white transition-colors duration-300 hover:text-[#5DB6FA]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contacto */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5DB6FA]">
              Contacto
            </p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+524499904670"
                  className="flex items-center gap-3 text-sm font-medium text-white transition-colors duration-300 hover:text-[#5DB6FA]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#5DB6FA]" />
                  449 990 4670
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/524499904670"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-white transition-colors duration-300 hover:text-[#5DB6FA]"
                >
                  <span className="text-[#25D366]">
                    <WhatsAppIcon />
                  </span>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@medicalimport.mx"
                  className="flex items-center gap-3 text-sm font-medium text-white transition-colors duration-300 hover:text-[#5DB6FA]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#5DB6FA]" />
                  info@medicalimport.mx
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/Medical+Import/data=!4m2!3m1!1s0x0:0x73d7431faabbc954?sa=X&ved=1t:2428&ictx=111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/80 transition-colors duration-300 hover:text-[#5DB6FA]"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#5DB6FA]" />
                  <span className="text-sm leading-relaxed">
                  Av. Aguascalientes Oriente 2077, Lomas de Santa Anita, Aguascalientes. C.P. 20164
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[#122492] pt-6">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <p className="text-center text-[12px] text-[#EEEEEE]/70">
              © 2025 Medical Import. Todos los derechos reservados.
            </p>
            <p className="text-center text-[12px] text-[#EEEEEE]/70">
              Diseño web por <span className="text-[#EEEEEE]">Luis Rodriguez</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}
