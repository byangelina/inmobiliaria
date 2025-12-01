"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Projection {
  year: number
  date: string
  projected: number
  lower: number
  upper: number
}

export default function ValueProjectionChart({ data }: { data: Projection[] }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gráfico de Proyección de Valor</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--color-primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--color-primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip
                formatter={(value) => `$${Number(value).toLocaleString("es-CL")}`}
                labelFormatter={(label) => `${label}`}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="projected"
                stroke="hsl(var(--color-primary))"
                fillOpacity={1}
                fill="url(#colorProjected)"
                name="Valor Proyectado"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tabla de Proyecciones Anuales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-2">Año</th>
                  <th className="text-left p-2">Fecha</th>
                  <th className="text-right p-2">Valor Bajo</th>
                  <th className="text-right p-2">Valor Proyectado</th>
                  <th className="text-right p-2">Valor Alto</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-secondary/30" : ""}>
                    <td className="p-2 font-semibold">{row.year}</td>
                    <td className="p-2">{row.date}</td>
                    <td className="text-right p-2 font-mono text-xs">${row.lower.toLocaleString("es-CL")}</td>
                    <td className="text-right p-2 font-mono font-bold">${row.projected.toLocaleString("es-CL")}</td>
                    <td className="text-right p-2 font-mono text-xs">${row.upper.toLocaleString("es-CL")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
