"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Award, Clock, Target, Download, Filter } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"

export default function ResultsPage() {
  // Données simulées des résultats historiques
  const historicalResults = [
    { date: "2024-01-15", type: "Complet", score: 82, duration: 180, status: "Réussi" },
    { date: "2024-01-12", type: "Entraînement", score: 76, duration: 45, status: "Réussi" },
    { date: "2024-01-10", type: "Quiz", score: 68, duration: 20, status: "Échec" },
    { date: "2024-01-08", type: "Domaine", score: 85, duration: 35, status: "Réussi" },
    { date: "2024-01-05", type: "Entraînement", score: 72, duration: 50, status: "Réussi" },
    { date: "2024-01-03", type: "Quiz", score: 64, duration: 18, status: "Réussi" },
    { date: "2024-01-01", type: "Complet", score: 58, duration: 175, status: "Échec" },
  ]

  // Données pour le graphique de progression
  const progressData = historicalResults.reverse().map((result, index) => ({
    test: index + 1,
    score: result.score,
    date: result.date,
    type: result.type,
  }))

  // Données par domaine
  const domainData = [
    { domain: "Personnes", score: 78, tests: 12 },
    { domain: "Processus", score: 82, tests: 15 },
    { domain: "Environnement", score: 75, tests: 10 },
  ]

  // Statistiques globales
  const totalTests = historicalResults.length
  const passedTests = historicalResults.filter((r) => r.status === "Réussi").length
  const averageScore = Math.round(historicalResults.reduce((sum, r) => sum + r.score, 0) / totalTests)
  const bestScore = Math.max(...historicalResults.map((r) => r.score))
  const totalTime = historicalResults.reduce((sum, r) => sum + r.duration, 0)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 61) return "text-orange-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    return status === "Réussi" ? (
      <Badge className="bg-green-600">Réussi</Badge>
    ) : (
      <Badge variant="destructive">Échec</Badge>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historique des résultats</h1>
            <p className="text-gray-600 mt-2">Suivez votre progression et analysez vos performances</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tests réalisés</p>
                  <p className="text-2xl font-bold">{totalTests}</p>
                </div>
                <Target className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                  <p className="text-2xl font-bold text-green-600">{Math.round((passedTests / totalTests) * 100)}%</p>
                </div>
                <Award className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Score moyen</p>
                  <p className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Meilleur score</p>
                  <p className="text-2xl font-bold text-purple-600">{bestScore}%</p>
                </div>
                <Award className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps total</p>
                  <p className="text-2xl font-bold">{Math.round(totalTime / 60)}h</p>
                </div>
                <Clock className="w-8 h-8 text-amber-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique de progression */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des scores</CardTitle>
              <CardDescription>Votre progression au fil des tests</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Score",
                    color: "hsl(45, 93%, 47%)", // Couleur ambre
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="test" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-score)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-score)", strokeWidth: 2, r: 4 }}
                    />
                    <Line y={61} stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">Ligne rouge : seuil de réussite (61%)</p>
              </div>
            </CardContent>
          </Card>

          {/* Performance par domaine */}
          <Card>
            <CardHeader>
              <CardTitle>Performance par domaine</CardTitle>
              <CardDescription>Scores moyens selon les domaines PMP</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Score moyen",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={domainData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="domain" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" fill="var(--color-score)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Historique détaillé */}
        <Card>
          <CardHeader>
            <CardTitle>Historique détaillé</CardTitle>
            <CardDescription>Tous vos tests avec résultats complets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicalResults.reverse().map((result, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${result.status === "Réussi" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div>
                      <p className="font-medium">{result.type}</p>
                      <p className="text-sm text-gray-500">{result.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getScoreColor(result.score)}`}>{result.score}%</p>
                      <p className="text-sm text-gray-500">{result.duration} min</p>
                    </div>
                    {getStatusBadge(result.status)}
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/dashboard/pmp-simulator">
                <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0">
                  Faire un nouveau test
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Conseils d'amélioration */}
        <Card className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-amber-900">📈 Conseils pour progresser</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-amber-900 mb-3">Points forts identifiés :</h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• Excellente performance en "Processus" (82%)</li>
                  <li>• Progression constante sur les derniers tests</li>
                  <li>• Bonne gestion du temps d'examen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-amber-900 mb-3">Axes d'amélioration :</h4>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• Renforcer le domaine "Environnement" (75%)</li>
                  <li>• Pratiquer plus de tests complets</li>
                  <li>• Réviser les concepts de leadership</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
