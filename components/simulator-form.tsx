"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SimulatorFormProps {
  params: {
    initialValue: number
    inflation: number
    years: number
    region: string
  }
  onChange: (params: any) => void
  regionFactors: Record<string, number>
}

export default function SimulatorForm({ params, onChange, regionFactors }: SimulatorFormProps) {
  const regions = Object.keys(regionFactors).map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parámetros de Simulación</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Initial Value */}
        <div className="space-y-2">
          <Label htmlFor="initialValue">Valor Inicial de Inversión (CLP)</Label>
          <Input
            id="initialValue"
            type="number"
            value={params.initialValue}
            onChange={(e) => onChange({ ...params, initialValue: Number(e.target.value) })}
            className="font-mono"
          />
          <p className="text-xs text-muted-foreground">${params.initialValue.toLocaleString("es-CL")}</p>
        </div>

        {/* Inflation Rate */}
        <div className="space-y-2">
          <Label>Tasa de Inflación Anual: {params.inflation.toFixed(1)}%</Label>
          <Slider
            value={[params.inflation]}
            onValueChange={(value) => onChange({ ...params, inflation: value[0] })}
            min={0}
            max={10}
            step={0.1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Rango: 0% - 10% anual</p>
        </div>

        {/* Time Horizon */}
        <div className="space-y-2">
          <Label>Horizonte Temporal: {params.years} años</Label>
          <Slider
            value={[params.years]}
            onValueChange={(value) => onChange({ ...params, years: value[0] })}
            min={1}
            max={30}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Rango: 1 - 30 años</p>
        </div>

        {/* Region */}
        <div className="space-y-2">
          <Label htmlFor="region">Región de Ubicación</Label>
          <Select value={params.region} onValueChange={(value) => onChange({ ...params, region: value })}>
            <SelectTrigger id="region">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label} (Factor: {regionFactors[region.value].toFixed(2)})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
