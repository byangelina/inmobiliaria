import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ResearchFramework() {
  return (
    <div className="space-y-6">
      {/* Research Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Preguntas de Investigación</CardTitle>
          <CardDescription>Ejes centrales que guían este proyecto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-semibold mb-1">1. ¿Cómo se puede modelar matemáticamente la evolución del valor?</h3>
            <p className="text-sm text-muted-foreground">
              Utilizamos funciones lineales y exponenciales sobre datos históricos reales para capturar la tendencia de
              valorización inmobiliaria en el tiempo.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-semibold mb-1">2. ¿Qué variables influyen en la valorización inmobiliaria chilena?</h3>
            <p className="text-sm text-muted-foreground">
              Inflación anual, ubicación geográfica, demanda habitacional, desarrollo urbano y tasas de interés son
              factores clave integrados en el modelo.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-semibold mb-1">3. ¿Cómo las matrices representan distintos escenarios económicos?</h3>
            <p className="text-sm text-muted-foreground">
              Matrices de factores regionales permiten modelar múltiples escenarios simultáneamente, capturando la
              heterogeneidad del mercado inmobiliario por región.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <h3 className="font-semibold mb-1">4. ¿Cómo una herramienta web mejora la toma de decisiones?</h3>
            <p className="text-sm text-muted-foreground">
              Proporciona acceso democrático a análisis sofisticados, fomentando educación financiera y decisiones
              informadas en el mercado inmobiliario.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Context and Problem */}
      <Card>
        <CardHeader>
          <CardTitle>Contexto y Problemática</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">Problema Identificado</h3>
            <p className="text-sm text-red-800 dark:text-red-200">
              Según DCV-Cadem (2024), el 42% de chilenos tiene bajo conocimiento financiero, invirtiendo en bienes
              raíces sin herramientas que les permitan proyectar valorización o devaluación. El mercado inmobiliario
              chileno mostró caída del 15% en ventas de viviendas nuevas en Q3 2024.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Consecuencias</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Decisiones inversoras basadas en intuición generan pérdidas patrimoniales. BioBioChile (2023) reportó
              caída del 11.9% en ventas de viviendas usadas, afectando principalmente a pequeños inversionistas.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Solución Propuesta</h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Simulador interactivo que estima valorización/devaluación mediante funciones matemáticas, matrices y
              análisis de tendencias, fomentando educación financiera y decisiones informadas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Objetivos del Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <div>
                <p className="font-semibold text-sm">Educación Financiera</p>
                <p className="text-sm text-muted-foreground">
                  Democratizar el acceso a herramientas de análisis inmobiliario sofisticadas.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <div>
                <p className="font-semibold text-sm">Apoyo a Decisiones de Inversión</p>
                <p className="text-sm text-muted-foreground">
                  Proporcionar proyecciones basadas en datos y modelos matemáticos rigurosos.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <div>
                <p className="font-semibold text-sm">Desarrollo Sostenible</p>
                <p className="text-sm text-muted-foreground">
                  Contribuir a un mercado inmobiliario más estable y confiable para pequeños inversionistas.
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
