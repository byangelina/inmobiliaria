"use client"

import { useState, useMemo } from "react"
import SimulatorForm from "@/components/simulator-form"
import DescriptiveAnalysis from "@/components/descriptive-analysis"
import PredictiveModel from "@/components/predictive-model"
import ValueProjectionChart from "@/components/value-projection-chart"
import ResearchFramework from "@/components/research-framework"
import MathematicalModels from "@/components/mathematical-models"
import LandRevaluationAnalysis from "@/components/land-revaluation-analysis"
import CityComparativeAnalysis from "@/components/city-comparative-analysis"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Historical data from 2010-2025
const historicalData = [
  { date: "2010-01", value: 100 },
  { date: "2010-07", value: 102.3 },
  { date: "2011-01", value: 105.8 },
  { date: "2011-07", value: 108.2 },
  { date: "2012-01", value: 112.4 },
  { date: "2012-07", value: 116.9 },
  { date: "2013-01", value: 121.5 },
  { date: "2013-07", value: 126.3 },
  { date: "2014-01", value: 131.2 },
  { date: "2014-07", value: 136.8 },
  { date: "2015-01", value: 142.1 },
  { date: "2015-07", value: 148.5 },
  { date: "2016-01", value: 153.7 },
  { date: "2016-07", value: 159.2 },
  { date: "2017-01", value: 165.4 },
  { date: "2017-07", value: 171.9 },
  { date: "2018-01", value: 176.8 },
  { date: "2018-07", value: 182.5 },
  { date: "2019-01", value: 189.3 },
  { date: "2019-07", value: 195.8 },
  { date: "2020-01", value: 201.2 },
  { date: "2020-07", value: 208.9 },
  { date: "2021-01", value: 217.4 },
  { date: "2021-07", value: 226.8 },
  { date: "2022-01", value: 234.5 },
  { date: "2022-07", value: 241.2 },
  { date: "2023-01", value: 248.7 },
  { date: "2023-07", value: 255.3 },
  { date: "2024-01", value: 262.1 },
  { date: "2024-07", value: 268.9 },
  { date: "2025-09", value: 275.6 },
]

const landRevaluationData = {
  antofagasta: {
    city: "Antofagasta",
    year: 2024,
    properties: [
      { code: "CAA002", range: "50-2.000", value: 641.701 },
      { code: "CAA400", range: "100-92.000", value: 362.024 },
      { code: "CAA401", range: "100-57.360", value: 276.651 },
      { code: "CAA460", range: "100-20.000", value: 276.651 },
    ],
  },
  calama: {
    city: "Calama",
    year: 2024,
    properties: [
      { code: "CBB022", range: "100-500", value: 121.683 },
      { code: "CBB023", range: "120-1.000", value: 75.214 },
      { code: "CBB001", range: "150-600", value: 59.436 },
      { code: "CBB005", range: "40-3.000", value: 312.745 },
      { code: "CBB007", range: "300-2.000", value: 45.172 },
      { code: "CBB008", range: "100-380", value: 220.025 },
    ],
  },
  mejillones: {
    city: "Mejillones",
    year: 2024,
    properties: [
      { code: "HBB002", range: "190-640", value: 24.639 },
      { code: "HBB001", range: "140-660", value: 18.587 },
      { code: "HBB009", range: "100-190", value: 26.368 },
      { code: "HBB005", range: "150-420", value: 32.852 },
    ],
  },
  tocopilla: {
    city: "Tocopilla",
    year: 2024,
    properties: [
      { code: "CMM025", range: "40-600", value: 92.072 },
      { code: "CMB012", range: "50-2.100", value: 540.766 },
      { code: "CMB016", range: "280-3.000", value: 389.041 },
      { code: "CMB017", range: "100-17.600", value: 175.068 },
    ],
  },
  mariaElena: {
    city: "María Elena",
    year: 2024,
    properties: [
      { code: "EMB004", range: "220-850", value: 15.777 },
      { code: "EMB021", range: "120-830", value: 74.782 },
      { code: "EMB022", range: "100-25.000", value: 69.811 },
      { code: "EMB023", range: "1.000-25.750", value: 18.155 },
    ],
  },
  sierraGorda: {
    city: "Sierra Gorda",
    year: 2024,
    properties: [
      { code: "MMB900", range: "MULTIPLE", value: 1.015 },
      { code: "IAB710", range: "MULTIPLE", value: 1.015 },
      { code: "IAB711", range: "MULTIPLE", value: 1.015 },
    ],
  },
}

export default function Home() {
  const [simulationParams, setSimulationParams] = useState({
    initialValue: 100000000,
    inflation: 3.5,
    years: 10,
    region: "antofagasta",
  })
  const [activeTab, setActiveTab] = useState("research")

  // Regional adjustment factors based on 2024 revaluation
  const regionFactors: Record<string, number> = {
    antofagasta: 0.78,
    calama: 0.72,
    mejillones: 0.75,
    tocopilla: 0.7,
    mariaElena: 0.68,
    sierrGorda: 0.65,
  }

  // Calculate descriptive statistics
  const stats = useMemo(() => {
    const values = historicalData.map((d) => d.value)
    const n = values.length
    const mean = values.reduce((a, b) => a + b, 0) / n
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n
    const stdDev = Math.sqrt(variance)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min
    const cv = (stdDev / mean) * 100
    const growth = ((max - min) / min) * 100

    return { mean, stdDev, min, max, range, cv, growth, n }
  }, [])

  // Calculate predictive model
  const predictions = useMemo(() => {
    const data = historicalData.map((d, i) => ({ x: i, y: d.value }))
    const n = data.length
    const sumX = data.reduce((a, d) => a + d.x, 0)
    const sumY = data.reduce((a, d) => a + d.y, 0)
    const sumXY = data.reduce((a, d) => a + d.x * d.y, 0)
    const sumX2 = data.reduce((a, d) => a + d.x * d.x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    const yPredicted = data.map((d) => slope * d.x + intercept)
    const ssRes = data.reduce((a, d, i) => a + Math.pow(d.y - yPredicted[i], 2), 0)
    const ssTot = data.reduce((a, d) => a + Math.pow(d.y - stats.mean, 2), 0)
    const r2 = 1 - ssRes / ssTot

    const stdError = Math.sqrt(ssRes / (n - 2))
    const se = Math.sqrt(1 / n + Math.pow(sumX - sumX / n, 2) / sumX2)
    const tValue = 1.96 // 95% confidence interval
    const ci = tValue * stdError * se

    return { slope, intercept, r2, stdError, ci }
  }, [stats])

  // Generate projections
  const projections = useMemo(() => {
    const regional = regionFactors[simulationParams.region] || 0.78
    const adjustedSlope = predictions.slope * regional
    const baseYear = historicalData.length - 1
    const baseValue = historicalData[baseYear].value

    const projectionData = []
    for (let year = 0; year <= simulationParams.years; year++) {
      const historicalFit = predictions.intercept + predictions.slope * (baseYear + year)
      const inflationAdjusted = historicalFit * Math.pow(1 + simulationParams.inflation / 100, year)
      const projectedValue = simulationParams.initialValue * (inflationAdjusted / 100)

      projectionData.push({
        year,
        date: new Date(2025 + year, 9).toLocaleDateString("es-CL", { year: "numeric", month: "short" }),
        projected: Math.round(projectedValue),
        lower: Math.round(projectedValue * (1 - 0.1)),
        upper: Math.round(projectedValue * (1 + 0.1)),
      })
    }
    return projectionData
  }, [simulationParams, predictions])

  const finalValue = projections[projections.length - 1]?.projected || 0
  const roi = ((finalValue - simulationParams.initialValue) / simulationParams.initialValue) * 100

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-foreground">Simulador de Valorización de Terrenos y Viviendas</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Análisis matemático avanzado de reavalúos 2024: Terrenos abandonados, pozos y lastreros en la Región de
              Antofagasta
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground font-semibold mb-2">Herramienta Académica para Investigación:</p>
            <p className="text-sm text-muted-foreground">
              Simulador que integra datos de reavalúo 2024 con análisis descriptivo, regresión lineal, matrices de
              valorización y proyecciones futuras para evaluar inversiones inmobiliarias en ciudades de la región de
              Antofagasta.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="research">Marco de Investigación</TabsTrigger>
            <TabsTrigger value="mathematics">Modelos Matemáticos</TabsTrigger>
            <TabsTrigger value="revaluation">Reavalúo 2024</TabsTrigger>
            <TabsTrigger value="comparison">Análisis Comparativo</TabsTrigger>
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="documentation">Documentación</TabsTrigger>
          </TabsList>

          {/* Research Framework Tab */}
          <TabsContent value="research" className="space-y-6">
            <ResearchFramework />
          </TabsContent>

          {/* Mathematical Models Tab */}
          <TabsContent value="mathematics" className="space-y-6">
            <MathematicalModels />
          </TabsContent>

          <TabsContent value="revaluation" className="space-y-6">
            <LandRevaluationAnalysis data={landRevaluationData} />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <CityComparativeAnalysis data={landRevaluationData} />
          </TabsContent>

          {/* Simulator Tab */}
          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <SimulatorForm params={simulationParams} onChange={setSimulationParams} regionFactors={regionFactors} />
              </div>

              <div className="lg:col-span-2">
                <Tabs defaultValue="projection" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="projection">Proyección</TabsTrigger>
                    <TabsTrigger value="descriptive">Análisis Descriptivo</TabsTrigger>
                    <TabsTrigger value="predictive">Modelo Predictivo</TabsTrigger>
                  </TabsList>

                  <TabsContent value="projection" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Proyección de Valor</CardTitle>
                        <CardDescription>
                          Estimación de valorización para los próximos {simulationParams.years} años
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ValueProjectionChart data={projections} />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Valor Inicial</p>
                            <p className="text-2xl font-bold text-primary">
                              ${simulationParams.initialValue.toLocaleString("es-CL")}
                            </p>
                          </div>
                          <div className="bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Valor Proyectado</p>
                            <p className="text-2xl font-bold text-primary">${finalValue.toLocaleString("es-CL")}</p>
                          </div>
                          <div
                            className={`${roi > 0 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"} p-4 rounded-lg`}
                          >
                            <p className="text-sm text-muted-foreground">ROI Estimado</p>
                            <p
                              className={`text-2xl font-bold ${roi > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {roi.toFixed(1)}%
                            </p>
                          </div>
                          <div className="bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Ganancia Estimada</p>
                            <p className="text-2xl font-bold text-primary">
                              ${(finalValue - simulationParams.initialValue).toLocaleString("es-CL")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="descriptive">
                    <DescriptiveAnalysis stats={stats} data={historicalData} />
                  </TabsContent>

                  <TabsContent value="predictive">
                    <PredictiveModel predictions={predictions} historicalData={historicalData} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentación Técnica</CardTitle>
                <CardDescription>Detalles sobre la metodología y fuentes de datos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Fuentes de Datos</h3>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Datos históricos de viviendas: Enero 2010 - Septiembre 2025</li>
                      <li>Reavalúos 2024: Terrenos abandonados, pozos y lastreros</li>
                      <li>
                        Región: Antofagasta (ciudades: Antofagasta, Calama, Mejillones, Tocopilla, María Elena, Sierra
                        Gorda)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Variables Matemáticas</h3>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Vectores: Valores unitarios por código de área homogénea</li>
                      <li>Matrices: Rango de superficie × Valor unitario por ciudad</li>
                      <li>Sumatorias: Agregación de valores por categoría</li>
                      <li>Regresión Lineal: Tendencia histórica con R² y intervalos de confianza</li>
                      <li>Funciones Exponenciales: Proyecciones con inflación acumulada</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
"use client"

import { useState, useMemo } from "react"
import SimulatorForm from "@/components/simulator-form"
import DescriptiveAnalysis from "@/components/descriptive-analysis"
import PredictiveModel from "@/components/predictive-model"
import ValueProjectionChart from "@/components/value-projection-chart"
import ResearchFramework from "@/components/research-framework"
import MathematicalModels from "@/components/mathematical-models"
import LandRevaluationAnalysis from "@/components/land-revaluation-analysis"
import CityComparativeAnalysis from "@/components/city-comparative-analysis"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Historical data from 2010-2025
const historicalData = [
  { date: "2010-01", value: 100 },
  { date: "2010-07", value: 102.3 },
  { date: "2011-01", value: 105.8 },
  { date: "2011-07", value: 108.2 },
  { date: "2012-01", value: 112.4 },
  { date: "2012-07", value: 116.9 },
  { date: "2013-01", value: 121.5 },
  { date: "2013-07", value: 126.3 },
  { date: "2014-01", value: 131.2 },
  { date: "2014-07", value: 136.8 },
  { date: "2015-01", value: 142.1 },
  { date: "2015-07", value: 148.5 },
  { date: "2016-01", value: 153.7 },
  { date: "2016-07", value: 159.2 },
  { date: "2017-01", value: 165.4 },
  { date: "2017-07", value: 171.9 },
  { date: "2018-01", value: 176.8 },
  { date: "2018-07", value: 182.5 },
  { date: "2019-01", value: 189.3 },
  { date: "2019-07", value: 195.8 },
  { date: "2020-01", value: 201.2 },
  { date: "2020-07", value: 208.9 },
  { date: "2021-01", value: 217.4 },
  { date: "2021-07", value: 226.8 },
  { date: "2022-01", value: 234.5 },
  { date: "2022-07", value: 241.2 },
  { date: "2023-01", value: 248.7 },
  { date: "2023-07", value: 255.3 },
  { date: "2024-01", value: 262.1 },
  { date: "2024-07", value: 268.9 },
  { date: "2025-09", value: 275.6 },
]

const landRevaluationData = {
  antofagasta: {
    city: "Antofagasta",
    year: 2024,
    properties: [
      { code: "CAA002", range: "50-2.000", value: 641.701 },
      { code: "CAA400", range: "100-92.000", value: 362.024 },
      { code: "CAA401", range: "100-57.360", value: 276.651 },
      { code: "CAA460", range: "100-20.000", value: 276.651 },
    ],
  },
  calama: {
    city: "Calama",
    year: 2024,
    properties: [
      { code: "CBB022", range: "100-500", value: 121.683 },
      { code: "CBB023", range: "120-1.000", value: 75.214 },
      { code: "CBB001", range: "150-600", value: 59.436 },
      { code: "CBB005", range: "40-3.000", value: 312.745 },
      { code: "CBB007", range: "300-2.000", value: 45.172 },
      { code: "CBB008", range: "100-380", value: 220.025 },
    ],
  },
  mejillones: {
    city: "Mejillones",
    year: 2024,
    properties: [
      { code: "HBB002", range: "190-640", value: 24.639 },
      { code: "HBB001", range: "140-660", value: 18.587 },
      { code: "HBB009", range: "100-190", value: 26.368 },
      { code: "HBB005", range: "150-420", value: 32.852 },
    ],
  },
  tocopilla: {
    city: "Tocopilla",
    year: 2024,
    properties: [
      { code: "CMM025", range: "40-600", value: 92.072 },
      { code: "CMB012", range: "50-2.100", value: 540.766 },
      { code: "CMB016", range: "280-3.000", value: 389.041 },
      { code: "CMB017", range: "100-17.600", value: 175.068 },
    ],
  },
  mariaElena: {
    city: "María Elena",
    year: 2024,
    properties: [
      { code: "EMB004", range: "220-850", value: 15.777 },
      { code: "EMB021", range: "120-830", value: 74.782 },
      { code: "EMB022", range: "100-25.000", value: 69.811 },
      { code: "EMB023", range: "1.000-25.750", value: 18.155 },
    ],
  },
  sierraGorda: {
    city: "Sierra Gorda",
    year: 2024,
    properties: [
      { code: "MMB900", range: "MULTIPLE", value: 1.015 },
      { code: "IAB710", range: "MULTIPLE", value: 1.015 },
      { code: "IAB711", range: "MULTIPLE", value: 1.015 },
    ],
  },
}

export default function Home() {
  const [simulationParams, setSimulationParams] = useState({
    initialValue: 100000000,
    inflation: 3.5,
    years: 10,
    region: "antofagasta",
  })
  const [activeTab, setActiveTab] = useState("research")

  // Regional adjustment factors based on 2024 revaluation
  const regionFactors: Record<string, number> = {
    antofagasta: 0.78,
    calama: 0.72,
    mejillones: 0.75,
    tocopilla: 0.7,
    mariaElena: 0.68,
    sierrGorda: 0.65,
  }

  // Calculate descriptive statistics
  const stats = useMemo(() => {
    const values = historicalData.map((d) => d.value)
    const n = values.length
    const mean = values.reduce((a, b) => a + b, 0) / n
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n
    const stdDev = Math.sqrt(variance)
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min
    const cv = (stdDev / mean) * 100
    const growth = ((max - min) / min) * 100

    return { mean, stdDev, min, max, range, cv, growth, n }
  }, [])

  // Calculate predictive model
  const predictions = useMemo(() => {
    const data = historicalData.map((d, i) => ({ x: i, y: d.value }))
    const n = data.length
    const sumX = data.reduce((a, d) => a + d.x, 0)
    const sumY = data.reduce((a, d) => a + d.y, 0)
    const sumXY = data.reduce((a, d) => a + d.x * d.y, 0)
    const sumX2 = data.reduce((a, d) => a + d.x * d.x, 0)

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    const yPredicted = data.map((d) => slope * d.x + intercept)
    const ssRes = data.reduce((a, d, i) => a + Math.pow(d.y - yPredicted[i], 2), 0)
    const ssTot = data.reduce((a, d) => a + Math.pow(d.y - stats.mean, 2), 0)
    const r2 = 1 - ssRes / ssTot

    const stdError = Math.sqrt(ssRes / (n - 2))
    const se = Math.sqrt(1 / n + Math.pow(sumX - sumX / n, 2) / sumX2)
    const tValue = 1.96 // 95% confidence interval
    const ci = tValue * stdError * se

    return { slope, intercept, r2, stdError, ci }
  }, [stats])

  // Generate projections
  const projections = useMemo(() => {
    const regional = regionFactors[simulationParams.region] || 0.78
    const adjustedSlope = predictions.slope * regional
    const baseYear = historicalData.length - 1
    const baseValue = historicalData[baseYear].value

    const projectionData = []
    for (let year = 0; year <= simulationParams.years; year++) {
      const historicalFit = predictions.intercept + predictions.slope * (baseYear + year)
      const inflationAdjusted = historicalFit * Math.pow(1 + simulationParams.inflation / 100, year)
      const projectedValue = simulationParams.initialValue * (inflationAdjusted / 100)

      projectionData.push({
        year,
        date: new Date(2025 + year, 9).toLocaleDateString("es-CL", { year: "numeric", month: "short" }),
        projected: Math.round(projectedValue),
        lower: Math.round(projectedValue * (1 - 0.1)),
        upper: Math.round(projectedValue * (1 + 0.1)),
      })
    }
    return projectionData
  }, [simulationParams, predictions])

  const finalValue = projections[projections.length - 1]?.projected || 0
  const roi = ((finalValue - simulationParams.initialValue) / simulationParams.initialValue) * 100

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-foreground">Simulador de Valorización de Terrenos y Viviendas</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Análisis matemático avanzado de reavalúos 2024: Terrenos abandonados, pozos y lastreros en la Región de
              Antofagasta
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-foreground font-semibold mb-2">Herramienta Académica para Investigación:</p>
            <p className="text-sm text-muted-foreground">
              Simulador que integra datos de reavalúo 2024 con análisis descriptivo, regresión lineal, matrices de
              valorización y proyecciones futuras para evaluar inversiones inmobiliarias en ciudades de la región de
              Antofagasta.
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="research">Marco de Investigación</TabsTrigger>
            <TabsTrigger value="mathematics">Modelos Matemáticos</TabsTrigger>
            <TabsTrigger value="revaluation">Reavalúo 2024</TabsTrigger>
            <TabsTrigger value="comparison">Análisis Comparativo</TabsTrigger>
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="documentation">Documentación</TabsTrigger>
          </TabsList>

          {/* Research Framework Tab */}
          <TabsContent value="research" className="space-y-6">
            <ResearchFramework />
          </TabsContent>

          {/* Mathematical Models Tab */}
          <TabsContent value="mathematics" className="space-y-6">
            <MathematicalModels />
          </TabsContent>

          <TabsContent value="revaluation" className="space-y-6">
            <LandRevaluationAnalysis data={landRevaluationData} />
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <CityComparativeAnalysis data={landRevaluationData} />
          </TabsContent>

          {/* Simulator Tab */}
          <TabsContent value="simulator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <SimulatorForm params={simulationParams} onChange={setSimulationParams} regionFactors={regionFactors} />
              </div>

              <div className="lg:col-span-2">
                <Tabs defaultValue="projection" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="projection">Proyección</TabsTrigger>
                    <TabsTrigger value="descriptive">Análisis Descriptivo</TabsTrigger>
                    <TabsTrigger value="predictive">Modelo Predictivo</TabsTrigger>
                  </TabsList>

                  <TabsContent value="projection" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Proyección de Valor</CardTitle>
                        <CardDescription>
                          Estimación de valorización para los próximos {simulationParams.years} años
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ValueProjectionChart data={projections} />
                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Valor Inicial</p>
                            <p className="text-2xl font-bold text-primary">
                              ${simulationParams.initialValue.toLocaleString("es-CL")}
                            </p>
                          </div>
                          <div className="bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Valor Proyectado</p>
                            <p className="text-2xl font-bold text-primary">${finalValue.toLocaleString("es-CL")}</p>
                          </div>
                          <div
                            className={`${roi > 0 ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"} p-4 rounded-lg`}
                          >
                            <p className="text-sm text-muted-foreground">ROI Estimado</p>
                            <p
                              className={`text-2xl font-bold ${roi > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                            >
                              {roi.toFixed(1)}%
                            </p>
                          </div>
                          <div className="bg-primary/10 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Ganancia Estimada</p>
                            <p className="text-2xl font-bold text-primary">
                              ${(finalValue - simulationParams.initialValue).toLocaleString("es-CL")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="descriptive">
                    <DescriptiveAnalysis stats={stats} data={historicalData} />
                  </TabsContent>

                  <TabsContent value="predictive">
                    <PredictiveModel predictions={predictions} historicalData={historicalData} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentación Técnica</CardTitle>
                <CardDescription>Detalles sobre la metodología y fuentes de datos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Fuentes de Datos</h3>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Datos históricos de viviendas: Enero 2010 - Septiembre 2025</li>
                      <li>Reavalúos 2024: Terrenos abandonados, pozos y lastreros</li>
                      <li>
                        Región: Antofagasta (ciudades: Antofagasta, Calama, Mejillones, Tocopilla, María Elena, Sierra
                        Gorda)
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Variables Matemáticas</h3>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Vectores: Valores unitarios por código de área homogénea</li>
                      <li>Matrices: Rango de superficie × Valor unitario por ciudad</li>
                      <li>Sumatorias: Agregación de valores por categoría</li>
                      <li>Regresión Lineal: Tendencia histórica con R² y intervalos de confianza</li>
                      <li>Funciones Exponenciales: Proyecciones con inflación acumulada</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
