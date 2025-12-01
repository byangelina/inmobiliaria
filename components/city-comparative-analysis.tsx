"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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

export default function CityComparativeAnalysis({ data }: { data: LandRevaluationData }) {
  // Prepare comparative metrics
  const comparisonData = Object.entries(data).map(([key, cityData]) => {
    const values = cityData.properties.map((p) => p.value)
    const sum = values.reduce((a, b) => a + b, 0)
    const mean = sum / values.length
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
    const stdDev = Math.sqrt(variance)
    const cv = (stdDev / mean) * 100

    return {
      city: cityData.city,
      mean: Number.parseFloat(mean.toFixed(2)),
      stdDev: Number.parseFloat(stdDev.toFixed(2)),
      cv: Number.parseFloat(cv.toFixed(2)),
      count: values.length,
      total: sum,
      max: Math.max(...values),
      min: Math.min(...values),
    }
  })

  // Prepare data for radar chart (normalized)
  const maxMean = Math.max(...comparisonData.map((d) => d.mean))
  const radarData = comparisonData.map((d) => ({
    city: d.city,
    "Valor Promedio": (d.mean / maxMean) * 100,
    Estabilidad: Math.max(0, 100 - d.cv),
    Diversidad: (d.count / Math.max(...comparisonData.map((x) => x.count))) * 100,
  }))

  // Calculate comparison matrix
  const comparisonMatrix = {
    headers: ["Ciudad", "Promedio $/m²", "Desv. Est.", "CV %", "Propiedades", "Rango"],
    rows: comparisonData.map((d) => [
      d.city,
      `$${d.mean.toLocaleString("es-CL")}`,
      `$${d.stdDev.toLocaleString("es-CL")}`,
      `${d.cv.toFixed(2)}%`,
      d.count.toString(),
      `$${(d.max - d.min).toLocaleString("es-CL")}`,
    ]),
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Análisis Comparativo Entre Ciudades</CardTitle>
          <CardDescription>
            Evaluación de patrones de valorización en diferentes ciudades de Antofagasta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comparison Matrix */}
          <div>
            <h3 className="font-semibold mb-4">Matriz de Comparación Estadística</h3>
            <div className="bg-secondary/30 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b font-semibold">
                    {comparisonMatrix.headers.map((header, idx) => (
                      <th key={idx} className={`p-3 ${idx === 0 ? "text-left" : "text-right"}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonMatrix.rows.map((row, ridx) => (
                    <tr key={ridx} className="border-b hover:bg-primary/5">
                      <td className="p-3 text-left font-semibold">{row[0]}</td>
                      <td className="p-3 text-right font-mono">{row[1]}</td>
                      <td className="p-3 text-right font-mono">{row[2]}</td>
                      <td className="p-3 text-right font-mono">{row[3]}</td>
                      <td className="p-3 text-right font-mono">{row[4]}</td>
                      <td className="p-3 text-right font-mono">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Line Chart: Value progression */}
          <div>
            <h3 className="font-semibold mb-4">Comparación de Valores Promedio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString("es-CL")}`} />
                <Legend />
                <Line type="monotone" dataKey="mean" stroke="#3b82f6" name="Valor Promedio" />
                <Line type="monotone" dataKey="max" stroke="#10b981" name="Máximo" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="min" stroke="#ef4444" name="Mínimo" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart: Multi-dimensional comparison */}
          <div>
            <h3 className="font-semibold mb-4">Análisis Multidimensional (Radar)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="city" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Valor Promedio"
                  dataKey="Valor Promedio"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.25}
                />
                <Radar name="Estabilidad" dataKey="Estabilidad" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                <Radar name="Diversidad" dataKey="Diversidad" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Analysis */}
          <div>
            <h3 className="font-semibold mb-4">Interpretación de Indicadores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-sm mb-2">Coeficiente de Variación (CV)</h4>
                <p className="text-xs text-muted-foreground">
                  CV bajo ({"<"}30%): Valores homogéneos. CV alto ({">"}30%): Mayor dispersión y volatilidad en precios.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-sm mb-2">Desviación Estándar</h4>
                <p className="text-xs text-muted-foreground">
                  Mide la dispersión de precios. Mayor desviación indica mayor diversidad en valorización por propiedad.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-sm mb-2">Rango de Valores</h4>
                <p className="text-xs text-muted-foreground">
                  Diferencia entre máximo y mínimo. Indica amplitud del mercado en cada ciudad.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-sm mb-2">Propiedades Reavalúadas</h4>
                <p className="text-xs text-muted-foreground">
                  Cantidad de códigos de área homogénea. Mayor cantidad indica mercado más segmentado.
                </p>
              </div>
            </div>
          </div>

          {/* Mathematical concepts */}
          <div className="bg-indigo-50 dark:bg-indigo-950 p-4 rounded border border-indigo-200 dark:border-indigo-800">
            <h3 className="font-semibold mb-3 text-sm">Conceptos Matemáticos Aplicados</h3>
            <div className="space-y-2 text-xs font-mono">
              <p>
                • <strong>Matriz de Comparación:</strong> Organización de datos en forma tabular (n×m)
              </p>
              <p>
                • <strong>Vector de Indicadores:</strong> Conjunto de métricas por ciudad
              </p>
              <p>
                • <strong>Normalización:</strong> xₙₒᵣₘ = (xᵢ / max(x)) × 100
              </p>
              <p>
                • <strong>Varianza:</strong> σ² = Σ(xᵢ - μ)² / n
              </p>
              <p>
                • <strong>Correlación:</strong> Análisis de relaciones entre variables
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
