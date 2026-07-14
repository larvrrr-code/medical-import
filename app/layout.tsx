import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsappButton } from '@/components/whatsapp-button'
import './globals.css'

const leagueSpartan = League_Spartan({ 
  subsets: ["latin"],
  variable: '--font-league-spartan',
  weight: ['400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Medical Import | Equipos Médicos en México',
  description: 'Más de 23 años equipando la medicina mexicana. Proveedor de equipos médicos para IMSS, ISSSTE y Secretaría de Salud.',
  generator: 'v0.app',
  icons: {
    icon: '/Logo_simplificado.png',
    apple: '/Logo_simplificado.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${leagueSpartan.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}

        <WhatsappButton />
      </body>
    </html>
  )
}
