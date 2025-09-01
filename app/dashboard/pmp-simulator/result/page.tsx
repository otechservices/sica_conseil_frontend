"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Target, TrendingUp, RotateCcw, BookOpen, Download, Share2 } from "lucide-react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ExamResult {
  score: number
  correct: number
  total: number
  domainScores: { [key: string]: { correct: number; total: number } }
  timeUsed: number
  mode: string
}

export default function ResultPage() {
  const [result, setResult] = useState<ExamResult | null>(null)
  const router = useRouter()

  useEffect(() => {
    const savedResult = localStorage.getItem("examResult")
    if (savedResult) {
      setResult(JSON.parse(savedResult))
    } else {
      router.push("/dashboard/pmp-simulator")
    }
  }, [router])

  if (!result) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Chargement des résultats...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-amber-600"
    if (score >= 61) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200"
    if (score >= 61) return "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200"
    return "bg-red-50 border-red-200"
  }

  const isPassed = result.score >= 61
  const isExcellent = result.score >= 80

  const recommendations = [
    {
      condition: result.score < 61,
      title: "Continuez vos efforts !",
      message: "Votre score indique qu'il faut encore travailler. Concentrez-vous sur vos points faibles.",
      actions: ["Revoir les modules de formation", "Pratiquer avec des quiz ciblés", "Analyser vos erreurs"],
    },
    {
      condition: result.score >= 61 && result.score < 80,
      title: "Bon travail !",
      message: "Vous êtes sur la bonne voie. Quelques améliorations vous mèneront à l'excellence.",
      actions: ["Approfondir les domaines faibles", "Pratiquer des examens complets", "Réviser les concepts avancés"],
    },
    {
      condition: result.score >= 80,
      title: "Excellent !",
      message: "Félicitations ! Vous maîtrisez bien les concepts PMP. Maintenez ce niveau.",
      actions: ["Pratiquer régulièrement", "Aider d'autres candidats", "Préparer l'examen officiel"],
    },
  ]

  const currentRecommendation = recommendations.find((r) => r.condition) || recommendations[0]

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header avec score principal */}
        <Card className={`${getScoreBackground(result.score)} border-2`}>
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              {isPassed ? (
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Award className="w-10 h-10 text-white" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
              )}
              <h1 className="text-4xl font-bold mb-2">
                <span className={getScoreColor(result.score)}>{result.score}%</span>
              </h1>
              <p className="text-xl text-gray-600">
                {result.correct} bonnes réponses sur {result.total}
              </p>
            </div>

            <div className="flex justify-center mb-6">
              <Badge
                className={`text-lg px-4 py-2 ${
                  isPassed
                    ? isExcellent
                      ? "bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 shadow-lg"
                      : "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-lg"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isPassed ? (isExcellent ? "🏆 Excellent" : "✅ Réussi") : "❌ Échec"}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">{formatTime(result.timeUsed)}</div>
                <div className="text-sm text-gray-600">Temps utilisé</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round((result.correct / result.total) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Taux de réussite</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {result.mode === "full" ? "Complet" : result.mode === "practice" ? "Entraînement" : "Quiz"}
                </div>
                <div className="text-sm text-gray-600">Type d'examen</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance par domaine */}
          <Card>
            <CardHeader>
              <CardTitle>Performance par domaine</CardTitle>
              <CardDescription>Vos scores détaillés selon les domaines PMP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(result.domainScores).map(([domain, scores]) => {
                const percentage = Math.round((scores.correct / scores.total) * 100)
                return (
                  <div key={domain}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{domain}</span>
                      <div className="text-right">
                        <span className={`font-bold text-lg ${getScoreColor(percentage)}`}>{percentage}%</span>
                        <span className="text-sm text-gray-500 ml-2">
                          ({scores.correct}/{scores.total})
                        </span>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Seuil: 61%</span>
                      <span className={percentage >= 61 ? "text-green-600" : "text-red-600"}>
                        {percentage >= 61 ? "✓ Réussi" : "✗ À améliorer"}
                      </span>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card>
            <CardHeader>
              <CardTitle>{currentRecommendation.title}</CardTitle>
              <CardDescription>{currentRecommendation.message}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Actions recommandées :</h4>
                <ul className="space-y-2">
                  {currentRecommendation.actions.map((action, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 space-y-3">
                  <Link href="/dashboard/pmp-training">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-xl border-0">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Accéder à la formation
                    </Button>
                  </Link>
                  <Link href="/dashboard/pmp-simulator">
                    <Button variant="outline" className="w-full bg-transparent">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Refaire un test
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistiques détaillées */}
        <Card>
          <CardHeader>
            <CardTitle>Analyse détaillée</CardTitle>
            <CardDescription>Comparaison avec les standards PMP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{result.score}%</div>
                <div className="text-sm text-gray-600">Votre score</div>
                <div className="text-xs text-gray-500 mt-1">
                  {isPassed ? "Au-dessus du seuil" : "En dessous du seuil"}
                </div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-600 mb-2">61%</div>
                <div className="text-sm text-gray-600">Seuil de réussite</div>
                <div className="text-xs text-gray-500 mt-1">Standard PMP</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                <div className="text-sm text-gray-600">Score moyen</div>
                <div className="text-xs text-gray-500 mt-1">Utilisateurs SICA</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Score excellent</div>
                <div className="text-xs text-gray-500 mt-1">Top 20%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Que faire maintenant ?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Download className="w-6 h-6" />
                <span>Télécharger le rapport</span>
              </Button>

              <Button
                variant="outline"
                className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
              >
                <Share2 className="w-6 h-6" />
                <span>Partager le résultat</span>
              </Button>

              <Link href="/dashboard/pmp-simulator/results">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                >
                  <TrendingUp className="w-6 h-6" />
                  <span>Voir l'historique</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
