"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Clock, Target, TrendingUp, Play, BookOpen } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"

export default function PMPSimulatorPage() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)

  const examModes = [
    {
      id: "full",
      title: "Examen complet PMP",
      description: "180 questions - 230 minutes (timing officiel)",
      questions: 180,
      duration: 230,
      difficulty: "Réel",
      color: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      id: "practice",
      title: "Test d'entraînement",
      description: "50 questions - 90 minutes (confortable)",
      questions: 50,
      duration: 90,
      difficulty: "Moyen",
      color: "bg-gradient-to-r from-amber-500 to-yellow-500",
    },
    {
      id: "quick",
      title: "Quiz rapide",
      description: "20 questions - 35 minutes (détendu)",
      questions: 20,
      duration: 35,
      difficulty: "Facile",
      color: "bg-gradient-to-r from-amber-400 to-yellow-400",
    },
    {
      id: "domain",
      title: "Par domaine",
      description: "30 questions - 55 minutes (approfondi)",
      questions: 30,
      duration: 55,
      difficulty: "Variable",
      color: "bg-gradient-to-r from-amber-600 to-yellow-600",
    },
  ]

  const recentScores = [
    { date: "2024-01-15", type: "Test complet", score: 82, status: "Réussi" },
    { date: "2024-01-12", type: "Entraînement", score: 76, status: "Réussi" },
    { date: "2024-01-10", type: "Quiz rapide", score: 68, status: "Échec" },
    { date: "2024-01-08", type: "Par domaine", score: 85, status: "Réussi" },
  ]

  const domainStats = [
    { domain: "Personnes", score: 78, total: 42, color: "bg-gradient-to-r from-amber-500 to-yellow-500" },
    { domain: "Processus", score: 82, total: 50, color: "bg-gradient-to-r from-amber-400 to-yellow-400" },
    { domain: "Environnement", score: 75, total: 88, color: "bg-gradient-to-r from-orange-500 to-amber-500" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Simulateur d'examen PMP</h1>
            <p className="text-gray-600 mt-2">
              Préparez-vous efficacement avec des questions authentiques du PMI Institute
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/pmp-simulator/results">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Mes résultats
              </Button>
            </Link>
            <Link href="/dashboard/pmp-training">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Formation
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tests réalisés</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Target className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Score moyen</p>
                  <p className="text-2xl font-bold text-green-600">78%</p>
                </div>
                <Award className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Meilleur score</p>
                  <p className="text-2xl font-bold text-purple-600">92%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps total</p>
                  <p className="text-2xl font-bold">18h</p>
                </div>
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Exam Modes */}
          <Card>
            <CardHeader>
              <CardTitle>Choisir un mode d'examen</CardTitle>
              <CardDescription>Sélectionnez le type de test qui correspond à vos objectifs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {examModes.map((mode) => (
                <div
                  key={mode.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedMode === mode.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{mode.title}</h3>
                    <Badge className={`${mode.color} text-white`}>{mode.difficulty}</Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{mode.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {mode.questions} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {mode.duration} min
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <Link href={selectedMode ? `/dashboard/pmp-simulator/exam?mode=${selectedMode}` : "#"}>
                  <Button
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0"
                    disabled={!selectedMode}
                    size="lg"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Commencer l'examen
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Performance by Domain */}
          <Card>
            <CardHeader>
              <CardTitle>Performance par domaine</CardTitle>
              <CardDescription>Vos scores selon les 3 domaines du PMP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {domainStats.map((domain) => (
                <div key={domain.domain}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{domain.domain}</span>
                    <div className="text-right">
                      <span className="font-bold text-lg">{domain.score}%</span>
                      <span className="text-sm text-gray-500 ml-2">({domain.total} questions)</span>
                    </div>
                  </div>
                  <Progress value={domain.score} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Seuil de réussite: 61%</span>
                    <span className={domain.score >= 61 ? "text-green-600" : "text-red-600"}>
                      {domain.score >= 61 ? "✓ Réussi" : "✗ À améliorer"}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t">
                <Link href="/dashboard/pmp-simulator/domain-practice">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Target className="w-4 h-4 mr-2" />
                    Entraînement par domaine
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle>Résultats récents</CardTitle>
            <CardDescription>Vos derniers tests et performances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScores.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-3 h-3 rounded-full ${result.status === "Réussi" ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <div>
                      <p className="font-medium">{result.type}</p>
                      <p className="text-sm text-gray-500">{result.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${result.status === "Réussi" ? "text-green-600" : "text-red-600"}`}
                    >
                      {result.score}%
                    </p>
                    <Badge variant={result.status === "Réussi" ? "default" : "destructive"} className="text-xs">
                      {result.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/dashboard/pmp-simulator/results">
                <Button variant="outline" className="bg-transparent">
                  Voir tous les résultats
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-amber-900">💡 Conseils pour réussir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-800">
              <ul className="space-y-2">
                <li>• Visez un score minimum de 61% dans chaque domaine</li>
                <li>• Pratiquez régulièrement avec des tests courts</li>
                <li>• Analysez vos erreurs après chaque test</li>
              </ul>
              <ul className="space-y-2">
                <li>• Gérez votre temps : ~1.3 min par question</li>
                <li>• Lisez attentivement chaque question</li>
                <li>• Utilisez la méthode d'élimination</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
