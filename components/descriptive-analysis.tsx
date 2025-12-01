"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DescriptiveAnalysisProps {
  stats: {
    mean: number
    stdDev: number
    min: number
    max: number
    range: number
    cv: number
    growth: number
    n: number
  }
  data: Array<{ date: string; value: number }>
}

export default function DescriptiveAnalysis({ stats, data }: DescriptiveAnalysisProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Estadísticas Descriptivas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">Observaciones</p>
              <p className="text-xl font-semibold">{stats.n}</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">Promedio (Mean)</p>
              <p className="text-xl font-semibold">{stats.mean.toFixed(2)}</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">Desviación Estándar</p>
              <p className="text-xl font-semibold">{stats.stdDev.toFixed(2)}</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">Coef. de Variación</p>
              <p className="text-xl font-semibold">{stats.cv.toFixed(2)}%</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Rango de Valores</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-secondary/50 p-3 rounded text-center">
                <p className="text-xs text-muted-foreground">Mínimo</p>
                <p className="text-lg font-bold">{stats.min.toFixed(2)}</p>
              </div>
              <div className="bg-secondary/50 p-3 rounded text-center">
                <p className="text-xs text-muted-foreground">Rango</p>
                <p className="text-lg font-bold">{stats.range.toFixed(2)}</p>
              </div>
              <div className="bg-secondary/50 p-3 rounded text-center">
                <p className="text-xs text-muted-foreground">Máximo</p>
                <p className="text-lg font-bold">{stats.max.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-4 rounded mt-4">
            <p className="text-sm font-semibold mb-1">Crecimiento Total (2010-2025)</p>
            <p className="text-3xl font-bold text-primary">{stats.growth.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-2">
              De {stats.min.toFixed(2)} a {stats.max.toFixed(2)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
