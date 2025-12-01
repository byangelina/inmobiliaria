"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PredictiveModelProps {
  predictions: {
    slope: number
    intercept: number
    r2: number
    stdError: number
    ci: number
  }
  historicalData: Array<{ date: string; value: number }>
}

export default function PredictiveModel({ predictions, historicalData }: PredictiveModelProps) {
  // Calculate fitted values
  const fittedData = historicalData.map((d, i) => ({
    actual: d.value,
    fitted: predictions.intercept + predictions.slope * i,
    residual: d.value - (predictions.intercept + predictions.slope * i),
  }))

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modelo de Regresión Lineal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded border border-blue-200 dark:border-blue-800">
            <p className="font-mono text-sm mb-2">Ecuación: y = mx + b</p>
            <p className="font-mono text-sm">
              y = {predictions.slope.toFixed(4)}x + {predictions.intercept.toFixed(2)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">Pendiente (m)</p>
              <p className="text-lg font-semibold">{predictions.slope.toFixed(4)}</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">Intercepto (b)</p>
              <p className="text-lg font-semibold">{predictions.intercept.toFixed(2)}</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">R² (Bondad de Ajuste)</p>
              <p className="text-lg font-semibold">{(predictions.r2 * 100).toFixed(2)}%</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded">
              <p className="text-xs text-muted-foreground">Error Estándar</p>
              <p className="text-lg font-semibold">{predictions.stdError.toFixed(4)}</p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950 p-4 rounded border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-sm mb-2">Intervalo de Confianza (95%)</h4>
            <p className="text-sm font-mono">±{predictions.ci.toFixed(2)} unidades</p>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3 text-sm">Primeras y Últimas Predicciones</h4>
            <div className="space-y-2 text-sm">
              {fittedData.slice(0, 3).map((d, i) => (
                <div key={i} className="flex justify-between bg-secondary/30 p-2 rounded">
                  <span>Período {i + 1}</span>
                  <span>
                    Real: {d.actual.toFixed(2)} | Ajustado: {d.fitted.toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="text-center text-xs text-muted-foreground py-1">...</div>
              {fittedData.slice(-3).map((d, i) => (
                <div key={fittedData.length - 3 + i} className="flex justify-between bg-secondary/30 p-2 rounded">
                  <span>Período {fittedData.length - 2 + i}</span>
                  <span>
                    Real: {d.actual.toFixed(2)} | Ajustado: {d.fitted.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
