import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Sistema de Facturas</h1>
        <p className="text-center text-gray-600 mb-8">Digitalización y Consulta de Facturas</p>

        <div className="space-y-4">
          <Link href="/app-a">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition">
              Aplicación A: Registro de Factura
            </button>
          </Link>

          <Link href="/app-b">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition">
              Aplicación B: Consulta de Factura Digitalizada
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
