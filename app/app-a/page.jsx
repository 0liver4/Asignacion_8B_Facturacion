"use client"

import { useState } from "react"
import Link from "next/link"

export default function AppC() {
  const [formData, setFormData] = useState({
    numeroFactura: "",
    condiciones: "Contado",
    idCliente: "",
    fechaFactura: "",
    monto: "",
    estado: "Pendiente",
  })

  const [enviado, setEnviado] = useState(false)
  const [datosEnviados, setDatosEnviados] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Guardar datos en localStorage (persistencia Open Source)
    const facturas = JSON.parse(localStorage.getItem("facturas") || "[]")
    const nuevaFactura = {
      id: Date.now(),
      ...formData,
      fechaRegistro: new Date().toLocaleDateString(),
    }
    facturas.push(nuevaFactura)
    localStorage.setItem("facturas", JSON.stringify(facturas))

    const parametros = new URLSearchParams({
      numeroFactura: formData.numeroFactura,
      idCliente: formData.idCliente,
      monto: formData.monto,
    })

    setDatosEnviados(formData)
    setEnviado(true)

    console.log("[v0] Command Line Parameters pasados a App B:")
    console.log(`[v0] /app-b?${parametros.toString()}`)

    // Después de 2 segundos, redirigir a App B con parámetros
    setTimeout(() => {
      window.location.href = `/app-b?${parametros.toString()}`
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-purple-600 hover:text-purple-800 mb-4 inline-block">
          ← Volver
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Aplicación A</h1>
          <p className="text-gray-600 mb-8">Registro de Facturas - Tecnología Open Source</p>

          {enviado ? (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
              <h2 className="text-lg font-bold text-purple-800 mb-4">✓ Factura Registrada Correctamente</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                <div>
                  <p className="font-semibold">No. Factura:</p>
                  <p>{datosEnviados.numeroFactura}</p>
                </div>
                <div>
                  <p className="font-semibold">ID Cliente:</p>
                  <p>{datosEnviados.idCliente}</p>
                </div>
                <div>
                  <p className="font-semibold">Monto:</p>
                  <p>${datosEnviados.monto}</p>
                </div>
                <div>
                  <p className="font-semibold">Estado:</p>
                  <p>{datosEnviados.estado}</p>
                </div>
              </div>
              <p className="text-purple-700 text-sm">Redirigiendo a consulta de factura en App B...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">No. Factura *</label>
                  <input
                    type="text"
                    name="numeroFactura"
                    value={formData.numeroFactura}
                    onChange={handleChange}
                    placeholder="Ej: FAC-2024-001"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ID Cliente *</label>
                  <input
                    type="text"
                    name="idCliente"
                    value={formData.idCliente}
                    onChange={handleChange}
                    placeholder="Ej: 12345678"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Factura *</label>
                  <input
                    type="date"
                    name="fechaFactura"
                    value={formData.fechaFactura}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Monto *</label>
                  <input
                    type="number"
                    name="monto"
                    value={formData.monto}
                    onChange={handleChange}
                    placeholder="Ej: 2500.00"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Condiciones *</label>
                  <select
                    name="condiciones"
                    value={formData.condiciones}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Contado">Contado</option>
                    <option value="Crédito 30">Crédito 30 días</option>
                    <option value="Crédito 60">Crédito 60 días</option>
                    <option value="Crédito 90">Crédito 90 días</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estado *</label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagada">Pagada</option>
                    <option value="Vencida">Vencida</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                  Registrar Factura y Consultar
                </button>
                <button
                  type="reset"
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
                >
                  Limpiar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
