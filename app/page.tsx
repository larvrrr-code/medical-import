import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { NormativasSection } from "@/components/normativas-section"
import { CredibilitySection } from "@/components/credibility"
import { CTASection } from "@/components/cta-section"
import { InstagramSection } from "@/components/instagram-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <NormativasSection />
      <CredibilitySection />
      <CTASection />
      <InstagramSection />
      <Footer />
    </main>
  )
}
