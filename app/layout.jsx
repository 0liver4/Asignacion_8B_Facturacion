import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata = {
  title: "Sistema de Digitalización de Cheques",
  description: "Aplicación de registro de cheques y consulta de facturas con command line parameters",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
