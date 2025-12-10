"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import jsPDF from "jspdf"

export default function AppB() {
  const searchParams = useSearchParams()

  const numeroFactura = searchParams.get("numeroFactura")
  const idCliente = searchParams.get("idCliente")
  const monto = searchParams.get("monto")

  const [factura, setFactura] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Simular búsqueda en base de datos localStorage
    if (numeroFactura) {
      const facturas = JSON.parse(localStorage.getItem("facturas") || "[]")
      const facturaEncontrada = facturas.find((f) => f.numeroFactura === numeroFactura)

      if (facturaEncontrada) {
        setFactura(facturaEncontrada)
      } else {
        // Si no existe, crear una de demostración con los parámetros recibidos
        setFactura({
          numeroFactura,
          idCliente,
          monto,
          condiciones: "Contado",
          estado: "Pagada",
          fechaFactura: new Date().toLocaleDateString(),
        })
      }
    }
    setCargando(false)
  }, [numeroFactura, idCliente, monto])

  const descargarPDF = () => {
    if (!factura) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let yPos = 20

    doc.setFontSize(18)
    doc.text("FACTURA DIGITALIZADA", pageWidth / 2, yPos, { align: "center" })
    yPos += 15

    // Línea separadora
    doc.setDrawColor(100)
    doc.line(20, yPos, pageWidth - 20, yPos)
    yPos += 10

    doc.setFontSize(11)
    doc.text("DATOS DE LA FACTURA", 20, yPos)
    yPos += 8

    const datos = [
      ["Número de Factura:", factura.numeroFactura],
      ["ID Cliente:", factura.idCliente],
      ["Fecha:", factura.fechaFactura],
      ["Monto:", `$${factura.monto}`],
      ["Condiciones:", factura.condiciones],
      ["Estado:", factura.estado],
    ]

    doc.setFontSize(10)
    datos.forEach(([label, valor]) => {
      doc.text(`${label} ${valor}`, 25, yPos)
      yPos += 7
    })

    yPos += 10

    doc.setDrawColor(100)
    doc.line(20, yPos, pageWidth - 20, yPos)
    yPos += 8

    doc.setFontSize(11)
    doc.text("PARÁMETROS DE CONSULTA (Command Line Parameters)", 20, yPos)
    yPos += 8

    doc.setFontSize(9)
    doc.text(`URL: /app-b?numeroFactura=${numeroFactura}&idCliente=${idCliente}&monto=${monto}`, 25, yPos)

    // Descargar
    doc.save(`Factura_${factura.numeroFactura}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-orange-600 hover:text-orange-800 mb-4 inline-block">
          ← Volver
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Aplicación B</h1>
          <p className="text-gray-600 mb-8">Consulta de Facturas Digitalizadas</p>

          {cargando ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Cargando factura...</p>
            </div>
          ) : factura ? (
            <>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <h3 className="font-bold text-orange-800 mb-2">Command Line Parameters Recibidos:</h3>
                <code className="block bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                  /app-b?numeroFactura={numeroFactura}
                  {idCliente && `&idCliente=${idCliente}`}
                  {monto && `&monto=${monto}`}
                </code>
              </div>

              <div
                id="factura-pdf"
                className="bg-white border-2 border-gray-300 p-12 rounded-lg mb-8"
                style={{
                  aspectRatio: "8.5 / 11",
                }}
              >
                <div className="text-center mb-8 pb-4 border-b-2 border-gray-300">
                  <h2 className="text-2xl font-bold text-gray-800">FACTURA DIGITALIZADA</h2>
                  <p className="text-gray-600 text-sm mt-2">Tecnología Open Source - Integración de Documentos</p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Número de Factura</p>
                    <p className="text-lg font-bold text-gray-800">{factura.numeroFactura}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Fecha</p>
                    <p className="text-lg font-bold text-gray-800">{factura.fechaFactura}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">ID Cliente</p>
                    <p className="text-lg font-bold text-gray-800">{factura.idCliente}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estado</p>
                    <p
                      className={`text-lg font-bold ${
                        factura.estado === "Pagada"
                          ? "text-green-600"
                          : factura.estado === "Vencida"
                            ? "text-red-600"
                            : "text-yellow-600"
                      }`}
                    >
                      {factura.estado}
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg mb-8 border border-orange-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Condiciones de Pago</p>
                      <p className="font-semibold text-gray-800">{factura.condiciones}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs mb-1">Monto Total</p>
                      <p className="font-bold text-lg text-orange-600">${factura.monto}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t-2 border-gray-300 pt-4 text-center text-xs text-gray-500">
                  <p>Este documento fue generado mediante integración de aplicaciones</p>
                  <p>con Command Line Parameters - Open Source Technology</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={descargarPDF}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                  Descargar PDF
                </button>
                <Link href="/app-a" className="flex-1">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition">
                    Registrar Nueva Factura
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-red-50 border-l-4 border-red-500 p-6">
              <h2 className="text-lg font-bold text-red-800 mb-2">Factura no encontrada</h2>
              <p className="text-red-700">No se encontró la factura solicitada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
