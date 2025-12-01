"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"

interface PropertyData {
  code: string
  range: string
  value: number
}

interface CityData {
  city: string
  year: number
  properties: PropertyData[]
}

interface LandRevaluationData {
  [key: string]: CityData
}

export default function LandRevaluationAnalysis({ data }: { data: LandRevaluationData }) {
  // Calculate statistics for each city
  const cityStats = Object.entries(data).map(([key, cityData]) => {
    const values = cityData.properties.map((p) => p.value)
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum / values.length
    const max = Math.max(...values)
    const min = Math.min(...values)

    // Matrix representation: properties organized by city
    const matrix = cityData.properties.map((p) => ({
      code: p.code,
      value: p.value,
      city: cityData.city,
    }))

    return {
      city: cityData.city,
      count: values.length,
      sum,
      mean: mean.toFixed(2),
      max: max.toFixed(2),
      min: min.toFixed(2),
      matrix,
    }
  })

  // Prepare data for vector visualization (values across cities)
  const vectorData = cityStats.map((stat) => ({
    city: stat.city,
    average: Number.parseFloat(stat.mean),
    max: Number.parseFloat(stat.max),
    min: Number.parseFloat(stat.min),
  }))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Reavalúo 2024</CardTitle>
          <CardDescription>Terrenos abandonados, pozos y lastreros en la región de Antofagasta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vector representation: Statistical summary */}
          <div>
            <h3 className="font-semibold mb-4">Vector de Estadísticas por Ciudad</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cityStats.map((stat) => (
                <div key={stat.city} className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">{stat.city}</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Propiedades:</span>
                      <span className="font-mono">{stat.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Promedio ($/m²):</span>
                      <span className="font-mono">${Number.parseFloat(stat.mean).toLocaleString("es-CL")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Máximo ($/m²):</span>
                      <span className="font-mono font-bold text-green-600">
                        ${Number.parseFloat(stat.max).toLocaleString("es-CL")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mínimo ($/m²):</span>
                      <span className="font-mono font-bold text-red-600">
                        ${Number.parseFloat(stat.min).toLocaleString("es-CL")}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-muted-foreground">Sumatoria:</span>
                      <span className="font-mono">${stat.sum.toLocaleString("es-CL")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Matrix visualization: Values by area code */}
          <div>
            <h3 className="font-semibold mb-4">Matriz de Valores: Códigos de Área Homogénea</h3>
            <div className="bg-secondary/30 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Ciudad</th>
                    <th className="text-left p-2">Código</th>
                    <th className="text-left p-2">Rango (m²)</th>
                    <th className="text-right p-2">Valor ($/m²)</th>
                  </tr>
                </thead>
                <tbody>
                  {cityStats.map((stat) =>
                    stat.matrix.map((item, idx) => (
                      <tr key={`${stat.city}-${idx}`} className="border-b hover:bg-primary/5">
                        <td className="p-2">{stat.city}</td>
                        <td className="p-2 font-mono font-semibold">{item.code}</td>
                        <td className="p-2 font-mono">
                          {data[Object.keys(data).find((k) => data[k].city === stat.city)!].properties[idx].range}
                        </td>
                        <td className="text-right p-2 font-mono font-bold">${item.value.toLocaleString("es-CL")}</td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart: Vector comparison across cities */}
          <div>
            <h3 className="font-semibold mb-4">Comparación de Valores Unitarios (Vector de Ciudades)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vectorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString("es-CL")}`} />
                <Legend />
                <Bar dataKey="average" fill="#3b82f6" name="Promedio" />
                <Bar dataKey="max" fill="#10b981" name="Máximo" />
                <Bar dataKey="min" fill="#ef4444" name="Mínimo" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter plot: Distribution analysis */}
          <div>
            <h3 className="font-semibold mb-4">Dispersión de Valores por Propiedad</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="count" name="# de Propiedades" />
                <YAxis type="number" dataKey="average" name="Valor Promedio" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter
                  name="Ciudades"
                  data={cityStats.map((s, i) => ({ count: s.count, average: Number.parseFloat(s.mean), name: s.city }))}
                  fill="#8b5cf6"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Mathematical formulas */}
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold mb-3 text-sm">Fórmulas Matemáticas Aplicadas</h3>
            <div className="space-y-2 text-sm font-mono">
              <p>
                • <strong>Promedio (Vector):</strong> μ = Σ(valores) / n
              </p>
              <p>
                • <strong>Sumatoria (Matriz):</strong> S = Σᵢ₌₁ⁿ Σⱼ₌₁ᵐ aᵢⱼ
              </p>
              <p>
                • <strong>Rango:</strong> R = máx(valores) - mín(valores)
              </p>
              <p>
                • <strong>Coeficiente de Variación:</strong> CV = (σ / μ) × 100%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
