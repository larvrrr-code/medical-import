"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { HeaderSearch } from "@/components/header-search"

const navLinks = [
  { href: "/equipos", label: "Equipos" },
  { href: "/mantenimiento", label: "Mantenimiento" },
  { href: "/obra-civil", label: "Obra Civil" },
  { href: "/rentas", label: "Rentas" },
  { href: "/nosotros", label: "Nosotros" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/70 bg-white/88 shadow-sm shadow-[#141E61]/10 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
        {/* Logo desktop */}
        <Link href="/" className="hidden shrink-0 lg:block">
          <Image
            src="/logo-medical-import.png"
            alt="Medical Import"
            width={640}
            height={192}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Logo mobile */}
        <Link href="/" className="shrink-0 lg:hidden">
          <Image
            src="/Logo_simplificado.png"
            alt="Medical Import"
            width={160}
            height={160}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <HeaderSearch className="hidden w-[260px] xl:w-[360px] lg:block" />
        <HeaderSearch
          onNavigate={() => setMobileMenuOpen(false)}
          className="mx-3 min-w-0 flex-1 lg:hidden"
        />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-navy font-medium hover:text-electric-blue transition-colors">
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="min-w-[180px] rounded-xl border border-white/70 bg-white/94 py-2 shadow-sm shadow-[#141E61]/10 backdrop-blur-md">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-navy font-medium hover:bg-light-blue transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-navy font-medium hover:text-electric-blue transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Button */}
        <Link
          href="/#contacto"
          className="hidden rounded-xl bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] px-6 py-2.5 font-semibold text-white shadow-sm shadow-[#132EEF]/12 transition-all hover:from-[#2F47EA] hover:via-[#132EEF] hover:to-[#1028D6] hover:shadow-md hover:shadow-[#132EEF]/18 lg:block"
        >
          Contacto
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-navy"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/70 bg-white/94 px-6 py-4 shadow-sm shadow-[#141E61]/10 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col gap-2">
                  <span className="text-navy font-semibold">{link.label}</span>
                  <div className="pl-4 flex flex-col gap-2">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-muted-foreground hover:text-navy transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-navy font-medium hover:text-electric-blue transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/#contacto"
              className="mt-2 rounded-xl bg-gradient-to-b from-[#3E58F4] via-[#132EEF] to-[#0E24B8] px-6 py-2.5 text-center font-semibold text-white shadow-sm shadow-[#132EEF]/12 transition-all hover:from-[#2F47EA] hover:via-[#132EEF] hover:to-[#1028D6] hover:shadow-md hover:shadow-[#132EEF]/18"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
