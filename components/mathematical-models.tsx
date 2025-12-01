import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function MathematicalModels() {
  return (
    <div className="space-y-6">
      {/* Linear Functions */}
      <Card>
        <CardHeader>
          <CardTitle>Funciones Lineales</CardTitle>
          <CardDescription>Modelamiento de tendencias históricas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary/50 p-4 rounded-lg font-mono text-sm">
            <p>V(t) = a·t + b</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Donde V(t) es el valor en el tiempo t, 'a' es la pendiente (tasa de crecimiento) y 'b' es el intercepto.
            Esta función captura la tendencia principal del mercado inmobiliario a partir de datos históricos.
          </p>
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Ejemplo práctico:</p>
            <p className="text-sm text-muted-foreground">
              Si un terreno en la Región Metropolitana aumenta linealmente $1,000,000 anual, y su valor inicial fue
              $50,000,000, la función sería: V(t) = 1,000,000·t + 50,000,000
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Exponential Functions */}
      <Card>
        <CardHeader>
          <CardTitle>Funciones Exponenciales</CardTitle>
          <CardDescription>Modelamiento de crecimiento compuesto con inflación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary/50 p-4 rounded-lg font-mono text-sm">
            <p>V(t) = V₀·(1 + r)^t</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Donde V₀ es el valor inicial, 'r' es la tasa de crecimiento anual, y 't' es el tiempo en años. Incorpora el
            efecto del crecimiento compuesto que es característico del mercado inmobiliario.
          </p>
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Ejemplo práctico:</p>
            <p className="text-sm text-muted-foreground">
              Una vivienda de $100,000,000 con crecimiento anual del 4% después de 10 años tendrá valor: V(10) =
              100,000,000·(1.04)^10 = $148,024,428
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Summations and Matrices */}
      <Card>
        <CardHeader>
          <CardTitle>Sumatorias y Matrices</CardTitle>
          <CardDescription>Análisis agregado y multidimensional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Sumatorias - Cálculo de Ganancia Acumulada</h4>
            <div className="bg-secondary/50 p-4 rounded-lg font-mono text-sm mb-2">
              <p>Ganancia = Σ(i=1 a n) [V(i) - V(i-1)]</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Suma el incremento anual de valor acumulado durante el período de inversión.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Matrices - Factores Regionales</h4>
            <div className="bg-secondary/50 p-4 rounded-lg font-mono text-sm mb-2">
              <p>F = [f₁, f₂, f₃, ..., f₁₅]ᵀ (Matriz columna de factores por región)</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Matriz de 15 regiones con factores de ajuste que representan la dinámica inmobiliaria regional. Permite
              modelar proyecciones diferentes para cada zona geográfica.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Vectores - Series Temporales</h4>
            <div className="bg-secondary/50 p-4 rounded-lg font-mono text-sm mb-2">
              <p>V = [V₁, V₂, V₃, ..., V₃₀]ᵀ (Vector de valores anuales)</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Representación vectorial de la serie temporal de valorización anual, permitiendo cálculos estadísticos
              como media, varianza y desviación estándar.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Regression Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Regresión Lineal y R²</CardTitle>
          <CardDescription>Validación de ajuste del modelo predictivo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-secondary/50 p-4 rounded-lg font-mono text-sm space-y-2">
            <p>Pendiente (b₁) = [n·ΣXY - ΣX·ΣY] / [n·ΣX² - (ΣX)²]</p>
            <p>R² = 1 - (SS_res / SS_tot)</p>
          </div>
          <p className="text-sm text-muted-foreground">
            La regresión lineal ajusta una línea al conjunto de datos históricos. R² mide qué tan bien el modelo explica
            la variación observada. Un R² más cercano a 1 indica mejor ajuste.
          </p>
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
            <p className="text-sm font-semibold mb-2">Intervalo de Confianza (95%):</p>
            <p className="text-sm text-muted-foreground">
              IC = predicción ± (1.96 × error_estándar) proporciona un rango en el que se espera caiga el valor real con
              95% de confianza.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Adjustment Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Factores de Ajuste Regional</CardTitle>
          <CardDescription>Adaptación de modelos según ubicación</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            La valorización inmobiliaria varía significativamente por región. Se aplican factores multiplicativos a la
            tendencia nacional para obtener proyecciones regionalizadas:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/50 p-3 rounded-lg">
              <p className="font-semibold text-sm">Factor = 1.0</p>
              <p className="text-xs text-muted-foreground">Metropolitana (referencia)</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded-lg">
              <p className="font-semibold text-sm">Factor {"<"} 1.0</p>
              <p className="text-xs text-muted-foreground">Menor dinámica inmobiliaria</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded-lg">
              <p className="font-semibold text-sm">Factor {">"} 1.0</p>
              <p className="text-xs text-muted-foreground">Mayor dinámica inmobiliaria</p>
            </div>
            <div className="bg-secondary/50 p-3 rounded-lg">
              <p className="font-semibold text-sm">Multiplicador</p>
              <p className="text-xs text-muted-foreground">Ajusta la pendiente regional</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
